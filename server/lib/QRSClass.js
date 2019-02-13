const https = require('https');
const fs = require('fs');
const randomstring = require("randomstring");
const Config = require('./settings');
const settings = new Config();

const path = require("path");



class QRS {

    constructor(){

        this.options = {
            hostname : settings.QIX.host,
            port : settings.QIX.QRSPort,
            rejectUnauthorized: false, 
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'X-Qlik-User' : 'UserDirectory=EC2AMAZ-L9N9VC9;UserId=ves'
            },   
            cert: fs.readFileSync(path.resolve(__dirname, "../certs/client.pem")),
            key : fs.readFileSync(path.resolve(__dirname, "../certs/client_key.pem"))         
        }        
    }

    genXrfkey() { return randomstring.generate(16)}

    makeRequest(bodyData={}){
        return new Promise ( (fulfill, reject) =>{
            const req = https.request(this.options, function(res) {
            
                res.on('data', function (body) {
                    fulfill(body);
                });
              });
            
              req.on('error', function(e) {
                reject(e.message);
              });
            
              req.write(JSON.stringify(bodyData));
              req.end();  
        })
      
    }

    getUser(id){
        let key = this.genXrfkey();
        this.options.path = '/qrs/user/'+id+'?xrfkey='+ key;
        this.options.headers['x-qlik-xrfkey'] = key;
        this.options.method = 'GET';
        return new Promise( (fulfill, reject) =>{
            this.makeRequest()
            .then( userDetails => {
                fulfill(userDetails.toString('utf8'));
            })
            .catch( err => {
                reject(err);
            })
        })
    }


    getUserId(trigram, userDir){
        let key = this.genXrfkey();
        this.options.path = "/qrs/user?filter=userId%20eq%20'"+trigram+"'&xrfkey="+ key;
        this.options.headers['x-qlik-xrfkey'] = key;
        this.options.method = 'GET';
        return new Promise( (fulfill, reject) =>{
            this.makeRequest()
            .then( userDetails => {
                var user=JSON.parse(userDetails.toString('utf8'))
                var rightUser = user.filter( (e) =>{
                    return (e.userDirectory === userDir)
                })

                fulfill(rightUser[0].id);
            })
            .catch( err => {
                reject(err);
            })
        })        
    }

    runTask(id){
        let key = this.genXrfkey();
        this.options.path = '/qrs/task/'+id+'/start/synchronous?xrfkey='+ key;
        this.options.headers['x-qlik-xrfkey'] = key;
        this.options.method = 'POST';   

        return new Promise( (fulfill, reject) =>{
            this.makeRequest()
            .then( result => {
                let session= JSON.parse(result.toString('utf8'));
                console.log(session.value);
                fulfill(session.value);
            })
            .catch( err => {
                reject(err);
            })
        })
    }

    pullTask(id){
        let key = this.genXrfkey();
        this.options.path = '/qrs/executionsession/'+id+'?xrfkey='+ key;
        this.options.headers['x-qlik-xrfkey'] = key;
        this.options.method = 'GET';   

        return new Promise( (fulfill, reject) =>{
            this.makeRequest()
            .then( result => {
                var json = JSON.parse(result.toString('utf8'));
                fulfill(json.executionResult.status);
            })
            .catch( err => {
                reject(err);
            })
        })        
    }    

    getCustomProperty(){
        let key = this.genXrfkey();
        this.options.path = '/qrs/custompropertydefinition/full?xrfkey='+ key;
        this.options.headers['x-qlik-xrfkey'] = key;
        this.options.method = 'GET';       

        return new Promise ( (fulfill, reject) =>{
            this.makeRequest()
            .then( result =>{
                console.log(result.toString('utf8'))
            }) 
        })
       
    }

    getCustomPropertybyId(id){
        let key = this.genXrfkey();
        this.options.path = '/qrs/custompropertydefinition/'+id+'?xrfkey='+ key;
        this.options.headers['x-qlik-xrfkey'] = key;
        this.options.method = 'GET';       

        return new Promise ( (fulfill, reject) =>{
            this.makeRequest()
            .then( result =>{
                console.log(result.toString('utf8'))
            }) 
        })
       
    }    

    getMabPotDefinition(){
        return new Promise ( (fulfill, reject) =>{
            this.getUser(settings.QIX.UserIdDef)
            .then( user =>{
                var json = JSON.parse(user);
                var MAB = json.customProperties.filter( cst =>{
                    return (cst.value === 'MAB')
                })
            
                var POT = json.customProperties.filter( cst =>{
                    return (cst.value === 'POT')
                })    
            
                var MabPotDef={};
                MabPotDef['MAB']=MAB[0];
                MabPotDef['POT']=POT[0];
            
                fulfill(MabPotDef);
            })            
        })
    }

    addCustomProp(id, CustProp){
        var MabPotDef;
        return new Promise( (fulfill, reject) => {
            this.getMabPotDefinition()
            .then( definition =>{
                MabPotDef=definition;
                return (this.getUser(id));
            })
            
            .then( userDetails =>{
                userDetails = JSON.parse(userDetails);
    
                let key = this.genXrfkey();
                this.options.path = '/qrs/user/'+id+'?xrfkey='+ key;
                this.options.headers['x-qlik-xrfkey'] = key;
                this.options.method = 'PUT';   
    
                let found=false;
    
                userDetails.customProperties.forEach( properties => {
                    console.log("Properties found : "+properties.value);
                    if(properties.value === CustProp)
                        found=true;
                })
                
                if(found){
                    fulfill("Custom Properties "+CustProp+" already present!");
                }
                else {
                    delete MabPotDef[CustProp].id;
                    userDetails.customProperties.push(MabPotDef[CustProp]);
                    return (this.makeRequest(userDetails))
                }                 
            })
            .then( userDetails =>{                
                fulfill(userDetails);
            })
            .catch(error => {
                reject("Error while adding "+CustProp+" properties to id: "+id);
            })
        })
    }

    removeCustomProp(id, CustProp){
        var MabPotDef;
        return new Promise( (fulfill, reject) =>{
            this.getMabPotDefinition()
            .then( definition =>{
                MabPotDef=definition;
                return (this.getUser(id));
            })
            .then( userDetails =>{
                userDetails = JSON.parse(userDetails);
    
                let key = this.genXrfkey();
                this.options.path = '/qrs/user/'+id+'?xrfkey='+ key;
                this.options.headers['x-qlik-xrfkey'] = key;
                this.options.method = 'PUT';   
    
                let index=-1;
                userDetails.customProperties.forEach( (properties,idx) => {
                    if(properties.value === CustProp)
                        index=idx;
                })
                
                if (index > -1) {
                    userDetails.customProperties.splice(index, 1);
                    return (this.makeRequest(userDetails));
                }
                else{
                    fulfill("Custom Property "+CustProp+" not found!");
                }
                                
            })
            .then( userDetails =>{
                fulfill(userDetails);
            })
            .catch(error => {
                reject("Error while removing "+CustProp+" properties to id: "+id);
            })   
        })     
    }

    getToken(trigram){
        let xrfkey=randomstring.generate(16);

        var options = {
            hostname: settings.QIX.host,
            port: settings.QIX.ProxyPort,
            path: settings.QIX.proxyTketPath+xrfkey,
            method: 'POST',
            rejectUnauthorized: false, 
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'x-qlik-xrfkey' : xrfkey
            },
            cert: fs.readFileSync(path.resolve(__dirname, "../certs/client.pem")),
            key : fs.readFileSync(path.resolve(__dirname, "../certs/client_key.pem"))  
          };       
          
          var bodyData = {
            UserDirectory : settings.QIX.userDir,
            UserId : trigram
          };       
          
          return new Promise ( (fulfill, reject) =>{
            var req = https.request(options, function(res) {        
                res.on('data', function (body) {
                    console.log(' --------->> Body: ' + body);
                    fulfill(JSON.parse(body));
                });
            });
        
            req.on('error', function(e) {
              reject(e.message);
            });
        
            req.write(JSON.stringify(bodyData));
            req.end();
          })          
    }

}

module.exports = QRS;