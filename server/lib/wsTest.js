const QRSClass = require('./QRSClass');
const ClassQIX = require('./ClassQIX');
const Config = require('./settings');
const settings = new Config();
const testFolder = '/opt/Dev/PresalesGame/dist/CAP/';
const fs = require('fs');
const wsMessage = require('./wsMessages');



const qrs = new QRSClass();
const ws = new wsMessage();


setInterval( function(){ws.sendBroadcastMessage("Ciao!");}, 1500)




/*
qrs.getUser('e6ff2e60-78cc-43f2-afd7-8f01a1a79f61')
.then( result => console.log(result));
*/
/*
qrs.getUserId('ves','QT')
.then( users =>{
    console.log(users);
})
.catch(error =>{
    console.log(error);
})
*/
/*
qrs.runTask(settings.QIX.POT)
.then( session =>{
    pull(session)
    .then( fine =>{
        console.log(fine);
    })
})


function pull(id){
    return new Promise( (fulfill, reject) =>{
        qrs.pullTask(id)
        .then( res =>{
            console.log(res);
            setTimeout(function(){pull(id)}, 1000);
        })
        .catch( error =>{    
            fulfill(error);
        })
    })

}
*/
/*
qrs.removeCustomProp('1b08b5b9-cd2e-4113-b02e-1658ef9123c9','MAB')
.then( result =>{
    console.log(result.toString('utf8'));
})
*/
/*
qrs.addCustomProp('1b08b5b9-cd2e-4113-b02e-1658ef9123c9','MAB')
.then( result =>{
    console.log(result.toString('utf8'));
})
*/