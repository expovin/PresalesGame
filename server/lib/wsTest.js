wsClass = require('./wsMessages');

wsM = new wsClass;


setInterval( function() {wsM.sendTextMessage(JSON.stringify({type:'info',msg:"Ciao dal Server!"}))}, 10000)

//wsM.printWsServer();