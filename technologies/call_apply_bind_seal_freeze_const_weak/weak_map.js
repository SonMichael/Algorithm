let weak = new WeakMap();
 

let key1 = {"1": "2"};
let key2 = {"3": "4"};
 
weak.set(key1, "Giá trị 01");
weak.set(key2, "Giá trị 02");
console.log("🚀 ~ file: weak_map.js ~ line 10 ~ weak", weak.get(key1))
// key1 và key2 đều là object rỗng nhưng vẫn được coi là 2 key khác nhau, có vẻ WeakMap không so sánh giá trị mà so sánh địa chỉ ô nhớ
