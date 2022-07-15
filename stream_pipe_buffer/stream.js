const fs = require('fs');

var readable = fs.createReadStream(__dirname + '/README.txt', {
    encoding: 'utf8',
    highWaterMark: 32 * 1024
});

var writeable = fs.createWriteStream(__dirname + '/README_COPY.txt');

readable.on('data', (chunk) => {
    console.log(chunk.length);
    writeable.write(chunk);
});



const buffer = new Buffer.from('Xin chàooo', 'utf8');
buffer.write('Hello world');
console.log(buffer.toString());


/// Other example
var zlib = require('zlib');

var readable = fs.createReadStream(__dirname + "/README.txt", {
    encoding: "utf8",
    highWaterMark: 2 * 1024
});

// var writable = fs.createWriteStream(__dirname + "/readmeCopy.txt");
var compress = fs.createWriteStream(__dirname + "/readme.txt.gz");

var gzip = zlib.createGzip();

// sao chép file
 // readable.pipe(writable);

// nén file
readable.pipe(gzip).pipe(compress);