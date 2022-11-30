async function getOrSet<T>(key: string, getData: () => Promise<T>, ttl: number): Promise<T> {
  let value: T = (await redisClient.get(key)) as T;
  if (value === null) {
      value = await getData();
      if (ttl > 0) {
          await redisClient.set(key, value, 'EX', ttl);
      } else {
          await redisClient.set(key, value);
      }
  }
  return value;
}

const burstCache = new NodeCache({
  // prevent copy to another promise, we can save memory and re-used the same promise
  useClones: false,
});
async function burstGetOrSet<T>(key: string, getData: () => Promise<T>, ttl: number, burstTtl: number): Promise<T> {
  if (burstTtl === 0) {
      return getOrSet<T>(key, getData, ttl);
  }
  // .get is handle cpu so when we have high ccu later request must wait before request complete
  let value = burstCache.get<Promise<T>>(key);
  if (value === undefined) {
      // don't await, we want to get promise to cache
      value = getOrSet<T>(key, getData, ttl);
      burstCache.set(key, value, burstTtl);
  }
  return value;
}

////////////////////////////////////////////////////////////////////////////////////////////////
async function getItemFromMemory(req: FastifyRequest, res: FastifyReply): Promise<void> {
  const { id } = req.params as { id: number };
  const itemResponse = await burstGetOrSet<IItemResponse>(
      `items:${id}`,
      async () => {
          // This will load item directly from database
          const item = await ItemService.getItemById(id);
          return item.transform();
      },
      30, // Redis cache TTL
      5   // Memory cache TTL
  );
  return res.sendJson({
      data: itemResponse,
  });
}
