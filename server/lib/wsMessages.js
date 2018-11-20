'use strict';

var WebSocketServer = require('websocket').server;
var http = require('http');
const CircularJSON = require('circular-json')

var settings = require("./settings");

class wsMessages {

    constructor(){

        console.log("You're instantiating the wsClass");

        this.wsServer;
        this.index=[];
        this.clients=[];

        var server = http.createServer(function(request, response) {
            // Qui possiamo processare la richiesta HTTP
            // Dal momento che ci interessano solo le WebSocket, non dobbiamo implementare nulla
            console.log("http server opened");
        });

        server.listen(settings.wsPort, function() { 
            console.log("wsServer listening on port : ",settings.wsPort);
        });
        // Creazione del server
        this.wsServer = new WebSocketServer({
            httpServer: server
        });

        // Gestione degli eventi
        var _this=this;
        this.wsServer.on('request', function(request) {
            _this.connection = request.accept(null, request.origin);
            _this.index = _this.clients.push(_this.connection) - 1;
            console.log(_this.connection.remoteAddress);
            console.log("Connection from : "+_this.connection.socket._peername.address+":"+_this.connection.socket._peername.port)
            
            _this.connection.on('message', function(message) {
                // Metodo eseguito alla ricezione di un messaggio
                if (message.type === 'utf8') {
                    // Se il messaggio è una stringa, possiamo leggerlo come segue:
                    console.log('Il messaggio ricevuto è: ' + message.utf8Data);
                }
            });
            _this.connection.on('close', function(connection) {
                console.log(connection.remoteAddress + " disconnected!");
                _this.clients.splice(_this.index, 1);
                // Metodo eseguito alla chiusura della connessione
            });
        });        
    }

    sendTextMessage(msg){
        if(this.clients.length > 0){
            console.log("Number of clients connected : "+this.clients.length);
            this.clients.forEach( (c,idx )=> {
                console.log("Sending message --> "+msg+" to Client "+idx);
                c.sendUTF(msg); 
            })     
        }
            
        else
            console.log("No client conected yet!");
    }

    printConnection(){
        console.log(this.connection);
    }

    printWsServer(){
        console.log(this.wsServer);
    }

    sendBinMessage(msg){
        this.connection.sendBytes(message.binaryData);
    }
}

module.exports = wsMessages;