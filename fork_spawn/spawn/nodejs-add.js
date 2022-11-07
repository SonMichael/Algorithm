const process = require('process');
console.log("🚀 ~ file: nodejs-add.js ~ line 5 ~ child_process_id: ", process.pid)

var [nodeCommand, thisFilePath, a, b] = process.argv;
var result = Number(a) + Number(b);

process.stdout.write(String(result));
