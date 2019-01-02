const https = require('https');
const fs = require('fs');
const randomstring = require("randomstring");
const settings = require('./settings');
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
                fulfill(userDetails.toString('utf8'))
            })
            .catch( err => {
                reject(err);
            })
        })
    }

    addCustomProp(id, CustProp){
        return new Promise( (fulfill, reject) => {
            this.getUser(id)
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
                    userDetails.customProperties.push(settings[CustProp]);
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
        return new Promise( (fulfill, reject) =>{
            this.getUser(id)
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
                    fulfill("Custom Property not found!");
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

}

module.exports = QRS;