wsClass = require('./wsMessages');

const wsM = new wsClass;


wsM.sendBroadcastMessage(JSON.stringify({type:'start',msg:"Starting opportunities calculation from 2019 Q1 to 2019 Q2"}))


//setInterval( function() {wsM.sendTextMessage(JSON.stringify({type:'info',msg:"Ciao dal Server!"}))}, 10000)

//wsM.printWsServer();