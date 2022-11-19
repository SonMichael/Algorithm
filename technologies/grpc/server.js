const grpc = require('grpc')
const notesProto = grpc.load('notes.proto')
const { v4: uuidv4 } = require('uuid');
const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1'},
    { id: '2', title: 'Note 2', content: 'Content 2'}
]
const server = new grpc.Server()
server.addService(notesProto.NoteService.service, {
    list: (call, callback) => {
        const authorization = call.metadata.get("authorization")
        if (!authorization || !authorization[0]) {
            return callback({
                code: 400,
                message: "Invalid Bear Token",
                status: grpc.status.INTERNAL
            })
        }
        console.log("🚀 ~ file: server.js ~ line 11 ~ call", authorization, authorization[0])
        callback(null, notes)
    },
    insert: (call, callback) => {
        let note = call.request
        note.id = uuidv4()
        notes.push(note)
        callback(null, note)
    }
})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()
