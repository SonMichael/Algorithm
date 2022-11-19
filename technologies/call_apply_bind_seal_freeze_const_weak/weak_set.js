let weak = new WeakSet();
 
// Danh sách key 
let key1 = {
    name : "thắng"
};
let key2 = {
    gender: "male"
};
 
weak.add(key1);
weak.add(key2);
console.log("🚀 ~ file: weak_set.js ~ line 14 ~ weak", weak)
//WeakSet {{…}, {…}}
