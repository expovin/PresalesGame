const QRSClass = require('./QRSClass');
const Config = require('./settings');
const settings = new Config();

 var qrs = new QRSClass();


function getTaskStatus(id){
    var _this=this;
    return new Promise( (fulfill, reject) =>{
        qrs.pullTask(id)
        .then( res =>{
            console.log(res);
            setTimeout(function(){getTaskStatus(id)}, 1000);
        })
        .catch( error =>{    
            fulfill("Fine!");
        })
    })    
}        



qrs.runTask(settings.QIX.MAB)
.then( session =>{
    console.log("Session id :" +session);
    return ( getTaskStatus("9f33a987-a12a-4a52-9679-f4ebcbb1b477") );           
})
.then( message =>{
    console.log(message);
})
.catch( error =>{
    console.log("Error :"+error);
})



