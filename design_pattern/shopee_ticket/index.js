// Pattern 1
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
      this.giamGia();
  }
}

// Pattern 2
const isGiamGia = async({userId}) => {
  const result = await this.redis.setnx(userId, 'true');
  if (result === 1) {
    this.giamGia();
  }
}