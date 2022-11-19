// Fix cache breakdown
// Only pattern 
const getData = async get(key) => {
  String value = redis.get(key);
  if (value == null) { // neu cache = null
      // setnx -> insert neeu chua co key ton tai, nen dat 3 phut thoi
      if (redis.setnx(key_mutex, 1, 3 * 60) == 1) {  // Nó có nghĩa là set thanh cong
          value = db.get(key); // lay db
          redis.set(key, value, expiretime); // set cache
          redis.del(key_mutex); // xoa mutex di
      } else {  // Lúc này có nghĩa là các luồng khác cùng lúc đã tải db và đặt lại vào bộ nhớ đệm, lúc này bạn hãy thử lấy lại giá trị trong cache
          sleep(50);
          get(key);  // data
      }
  } else {
      return value;
  }
}