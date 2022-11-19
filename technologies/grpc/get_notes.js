const grpc = require('grpc')
const client = require('./client')
const metadata = new grpc.Metadata();
metadata.add('Authorization', `Bearer sha1-123`);
client.list({}, metadata, (error, notes) => {
    if (!error) {
        console.log('successfully fetch List notes')
        console.log(notes)
    } else {
        console.error(error)
    }
})
