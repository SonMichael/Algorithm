const child_process = require(`child_process`);

console.log(`Ủy thác tác vụ tính toán phức tạp cho module async... main_process_id: ${process.pid}`);

var subprocess = child_process.fork(`./fork/async`);

subprocess.on(`message`, (message) => {
   console.log(`Kết quả từ module async: ${message.result}`);
   subprocess.kill();   // kết thúc subprocess
});

subprocess.send({ parameter: 1001 });

console.log(`Đây là một tác vụ khác trên main process...`);
