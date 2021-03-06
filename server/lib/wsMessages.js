'use strict';

const WebSocketServer = require('websocket').server;
const http = require('http');
//const fs = require('fs');
//const path=require('path');

const Config = require('./settings');
const settings = new Config();

class wsMessages {

    constructor(){

        this.wsServer;
        this.index=[];
        this.clients={};

        var httpServer = http.createServer(function(request, response) {
            // Qui possiamo processare la richiesta HTTP
            // Dal momento che ci interessano solo le WebSocket, non dobbiamo implementare nulla
            console.log("http server opened");
        });

        httpServer.listen(settings.wsPort, function() { 
            console.log("wsServer listening on port : ",settings.wsPort);
        });
        // Creazione del server
        this.wsServer = new WebSocketServer({
            httpServer : httpServer
        });

        // Gestione degli eventi
        var _this=this;
        this.wsServer.on('request', function(request) {
            console.log("request triggered");
             var connection = request.accept(null, request.origin);
            
             connection.on('message', function(message) {
                 console.log(message);
                // Metodo eseguito alla ricezione di un messaggio
                /** Primo messaggio memorizzo il client id */
                let msg=JSON.parse(message.utf8Data)
                if((connection.companyId === undefined) && (msg.type === "control")) {
                    connection['companyId']=msg.message;
                    _this.clients[msg.message] = connection;
                    console.log("Getting a new connection from : "+msg.message);
                    console.log("Number of client connected : "+Object.keys(_this.clients).length);
                }


                if (message.type === 'utf8') {
                    // Se il messaggio è una stringa, possiamo leggerlo come segue:
                    console.log('Il messaggio ricevuto da : '+connection.socket._peername.address+' : '+msg.message);
                }
            });
            connection.on('error', function(error){
                console.log("Error : "+error);
            })            
            connection.on('close', function(connection) {
                // Metodo eseguito alla chiusura della connessione
                console.log("Disconnected "+connection.companyId);
                console.log("Number of client connected : "+Object.keys(_this.clients).length);
                delete _this.clients[connection.companyId];
            });
        });        
    }

    sendTextMessage(companyId, msg){
        if(this.clients[companyId]){
            console.log("Sending message "+msg+" to "+companyId);
            this.clients[companyId].sendUTF(msg);
        }
        else
            console.log("CompanyId "+companyId+" not conected!");
    }

    sendBroadcastMessage(msg){
        console.log("Broadcast message to send ",msg);
        Object.keys(this.clients).forEach ( companyId =>{
            this.sendTextMessage(companyId,msg);
        })
    }
/*
    printConnection(){
        console.log(this.connection);
    }
*/
    printWsServer(){
        console.log(this.wsServer);
    }
/*
    sendBinMessage(msg){
        this.connection.sendBytes(message.binaryData);
    }
*/
}

module.exports = wsMessages;