import http from 'http'
import WebSocket, {WebSocketServer} from 'ws'
const server = http.createServer((req, res) => {
    console.log("Hi there is a request ")
    res.end("Hello World")

})

const wss = new WebSocketServer({server});

wss.on("connection", (socket) => {


    socket.on('error', console.error);
    
    socket.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN){
                client.send(data, {binary : isBinary})
            }

        })

    })

        socket.send("Hello! Connection message from ws server")


})

server.listen(8080, () =>{
    console.log("SErver is listening at port ", 8080);
})