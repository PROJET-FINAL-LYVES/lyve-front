import io from 'socket.io-client';
const socket = io("http://127.0.0.1:3001");
socket.on("connect_error", (err) => {
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
    console.log(err.data); // { content: "Please retry later" }
});
export default socket;
