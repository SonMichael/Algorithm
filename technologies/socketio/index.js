import io from 'socket.io'
import {jwt} from 'jsonwebtoken'
// client (connect and disconnect)
const {token} = sessionStorage;
const socket = io(server, {
  transports: ['websocket', 'polling', 'flashsocket'],
  auth: {
      token: token
  }
});

socket.on("connect_error", (err) => {
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
  console.log(err.data); // { content: "Please retry later" }
  socket.disconnect()
});


// server (only listen and emit)
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (isValidJwt(token)){
      next();
  }else{
    const err = new Error("not authorized");
    err.data = { content: "Please retry later" }; // additional details
    next(err);
  }
});

async function isValidJwt(token){
  jwt.verify(token, secrets.jwt, function(err, decoded) {
      if (err){
          console.log(err);
          return false;
      }else{
          //console.log(decoded);
          return true;
      }
  });
}

io.on("connection", (socket) => {
    // Connection now authenticated to receive further events

    socket.on('message', function(message) {
      io.emit('message', message);
  });
});