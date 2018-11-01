'use strict'

const enigmaConfig = require('./enigma-config.js');
const enigma = require('enigma.js');
const Halyard = require('halyard.js');
const enigmaMixin = require('halyard.js/dist/halyard-enigma-mixin.js');

enigmaConfig.mixins = enigmaMixin;


class QIX {

    constructor(appName) {
        this.appObj=null;
        this.appName=appName;
        this.qix=null;
        this.sessionAppName=null;
        
        this.halyard = new Halyard();
        this.openQixEngine();
       
    }
    
    getSessionAppName(){ return this.appName}

    openQixEngine(){
        return new Promise ( (fulfill, reject) => {
            enigma.create(enigmaConfig)
            .open()
            .then((qix) => {
                this.qix=qix;
                fulfill(qix);
            }, error => reject("Error connecting QIX engine ",error) )
            .catch(error => reject("Error connecting QIX engine ",error));
        })
    }

    closeEngine(){
        return new Promise( (fulfill, reject) => {
            enigma.create(enigmaConfig).close()
            .then( res =>{
                fulfill (res);
            }, error => {
                reject(error);
            })
        })
    }


    getEngineVersion() {
        return new Promise( (fulfill, reject) =>{
            this.qix.engineVersion()
            .then( ver => fulfill(ver))
        })

    }

    getDocList() {  
        return new Promise ( (fulfill, reject) =>{
            this.qix.getDocList()
            .then(apps => {
                fulfill(apps);
            })
        })
    }

    openDoc(appID){
        return new Promise( (fulfill, reject) =>{
            this.qix.openDoc({qDocName:appID})
            .then(qdoc => {
                this.appObj=qdoc;
                fulfill({data:"Doc Opened"});
            }, err => {
                reject(err);
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    getScript(){
        return new Promise ( (fulfill, reject) =>{
            this.appName.getScript()
            .then( script => { fulfill (script)})
        })
    }

    createApp() {
        return new Promise ( (fulfill, reject) =>{
            this.qix.createApp({qAppName:this.appName})
            .then( result =>{
                this.appObj=result;
                fulfill(result);
            }, error =>{
                reject(error);
            })
        })
    }

    getAppLayout(){
        return new Promise ( (fulfill, reject) =>{
            this.appObj.getAppLayout()
            .then( appLayout =>{
                fulfill(appLayout)
            }, error =>{
                reject(error);
            })
        })

    }

    deleteApp(appId) {
        return new Promise ( (fulfill, reject) =>{
            this.qix.deleteApp({qAppId:appId})
            .then( result =>{
                this.appObj=null;
                fulfill(result);
            }, error =>{
                reject(error);
            })
        })
    }

    addTable(data,table){ 
        let myTable = new Halyard.Table(data,table)
        this.halyard.addTable(myTable);
    }

    getScript() { 
        return new Promise ( (fulfill, reject) =>{
            this.appObj.getScript()
            .then( script => {
                fulfill(script);
            }, error => {
                reject(error);
            })
        })
    }

    setScript(script) { 
        return new Promise ( (fulfill, reject) =>{
            this.appObj.setScript({qScript: script})
            .then( script => {
                fulfill({data : "Script set"});
            }, error => {
                reject(error);
            })
        })
    }    

    createAppHalyard(){
        this.qix.createAppUsingHalyard(this.appName, this.halyard)
        .then((result) => {
            console.log(`App created and reloaded - ${appName}.qvf`);
            console.log(result);
          }, (error) => {
            console.log(error);
          })
        .catch(error => console.log("Error creating App ",error));
    }

    createSessionApp(){
        this.qix.createSessionAppUsingHalyard(this.halyard)
        .then((app) => {
            this.appObj=app;
            console.log(`Session App created and reloaded`);
            app.getAppLayout().then((res) => {
                console.log("Successfull :", res);
                this.sessionAppName=res.qTitle;
              });
          }, (error) => {
            console.log(error);
          }); 
    }

    reloadApp(){
        return new Promise( ( fulfill, reject) =>{
            this.qix.setScriptAndReloadWithHalyard(this.appObj, this.halyard, true)
            .then((result) => {
                fulfill (true);
              }, (error) => {
                reject(error);
              })
            .catch(error => {
                reject(error);
            });
        })

    }



}

module.exports = QIX;