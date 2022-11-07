const child_process = require('child_process');
const path = require('path');
console.log("🚀 ~ file: nodejs-print.js ~ line 7 ~ main_process_id: ", process.pid)

var add = path.join(__dirname, 'nodejs-add.js');
// var add = path.join(__dirname, 'python-add.py');
var subprocess = child_process.spawn('node', [add, '1', '9']);

subprocess.stdout.on('data', (chunk) => {
   console.log('Result: ' + chunk.toString());
});
