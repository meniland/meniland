const express = require("express");
const expressServer = express();
const jwt_decode = require('jwt-decode');

const http = require("http"); 

const httpServer = http.createServer(expressServer);
const socketIO = require("socket.io")(httpServer, {
    cors:{
        origin: ['http://localhost:3000'],
    },
});


let userIdToSocketsMap = new Map();

socketIO.on("connection", socket => {
    console.log("Connection request");
    var handshakeData = socket.request;
    let token = handshakeData._query.token;
    if(token){
    let decoded = jwt_decode(token);
    let userId = decoded.userId;
    userIdToSocketsMap.set(userId, socket);
    }
  
    console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);

    
    socket.on("disconnect", () => {
        var handshakeData = socket.request;
        let token = handshakeData._query.token;
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
       
        userIdToSocketsMap.delete(userId);
        console.log(userId + " client has been disconnected. Total clients: " +
            userIdToSocketsMap.size);
    });

});

function broadcast(event, updatedVacationData) {
    for (let [userId, socket] of userIdToSocketsMap) {
        socket.emit(event, updatedVacationData);
    }
}


module.exports = {
    broadcast
}

httpServer.listen(8000, () => console.log("Listening..."));


