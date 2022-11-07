var process = require(`process`);
console.log("🚀 ~ file: async.js ~ line 11 ~ process.on ~ child_process_id: ", process.pid)

process.on(`message`, (message) => {
   // --- giả lập một tác vụ tính toán sau khi nhận được tham số
   // --- thời gian thực hiện khoảng 10 giây sau đó trả về kết quả
   var delay = 10 * 1000;
   setTimeout((_) => {
      process.send({ result: message.parameter - 900 });
   }, delay);
});
