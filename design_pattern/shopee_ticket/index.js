const isGiamGia = async({userId}) => {
  const record = await phieuGiamGia.findOneAndUpdate({
      userId
  }),{
      $setOnInsert: {
          userId,
      },
  }, {
      new: false,
      upsert: true,
  });
  if (!record) {
      this.isGiamGia();
  }
}

const isGiamGia = async({userId}) => {
  const result = await this.redis.setnx(userId, 'true');
  if (result === 1) {
    this.isGiamGia();
  }
}