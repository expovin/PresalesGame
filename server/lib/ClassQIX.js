'use strict'

const enigmaConfig = require('./enigma-config.js');
const enigma = require('enigma.js');
const Config = require('./settings');
const settings = new Config();
//const Halyard = require('halyard.js');
//const enigmaMixin = require('halyard.js/dist/halyard-enigma-mixin.js');


//enigmaConfig.mixins = enigmaMixin;

let scatterplotObject = null;
const scatterplotProperties = {
    qInfo: {
      qType: 'visualization',
      qId: '',
    },
    type: 'my-picasso-scatterplot',
    labels: true,
    qHyperCubeDef: {
      qDimensions: [{
        qDef: {
          qFieldDefs: ['trendName'],
          qSortCriterias: [{
            qSortByAscii: 1,
          }],
        },
      }],
      qMeasures: [{
        qDef: {
          qDef: '[Sum(oppyTeoricalValue)]',
          qLabel: 'Oppy Value (€)',
        },
        qSortBy: {
          qSortByNumeric: -1,
        },
      },
      {
        qDef: {
          qDef: '[Count(idOpportunity)]',
          qLabel: '# Oppy',
        },
      }],
      qInitialDataFetch: [{
        qTop: 0, qHeight: 50, qLeft: 0, qWidth: 3,
      }],
      qSuppressZero: false,
      qSuppressMissing: true,
    },
  };


class QIX {

    constructor(appName) {
        this.appObj=null;
        this.appName=null;
        this.qix=null;
        this.sessionAppName=null;
        
        //this.halyard = new Halyard();
        this.openQixEngine()
        .catch( error =>{
            console.log("General error connecting to QIX engine ",error)
        })
       
    }
    
    getSessionAppName(){ return this.appName}

    openQixEngine(){
        return new Promise ( (fulfill, reject) => {
            enigma.create(enigmaConfig)
            .open()
            .then((qix) => {
                this.qix=qix;
                console.log("QIX Engine correctly opened");
                fulfill(qix);
            }, error => reject(error) );
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
            .catch( error => {reject(error)})
        })

    }

    getDocList() {  
        return new Promise ( (fulfill, reject) =>{
            this.qix.getDocList()
            .then(apps => {
                fulfill(apps);
            })
            .catch( error => {reject(error)})
        })
    }

    openDoc(appID){
        return new Promise( (fulfill, reject) =>{
            this.qix.openDoc({qDocName:appID})
            .then(qdoc => {
                this.appObj=qdoc;
                fulfill({data:"Doc Opened",appObj:this.appObj});
            }, err => {
                reject(err);
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    closeDoc(){
        return new Promise ( (fulfill, reject) => {
            this.appObj.close()
            .then( (res) =>{
                fulfill({result:"OK", message:"Document succesfully closed"});
            }, err =>{
                reject(err);
            })
        })
    }

    getScript(){
        return new Promise ( (fulfill, reject) =>{
            this.appName.getScript()
            .then( script => { fulfill (script)})
            .catch( error => {reject(error)})
        })
    }

    doReloadEx(){
        return new Promise ( (fulfill, reject) =>{
            this.appObj.doReloadEx({
                "qMode": 0,
                "qPartial": false,
                "qDebug": false
            })
            .then( script => { 
                console.log(script);
                fulfill (script)
            })
            .catch( error => {
                console.log(error);
                reject(error)
            })
        })
    }    

    AppReload(AppName){
        console.log("Start App "+settings.QIX[AppName]);
        return new Promise( (fulfill, reject ) =>{
            this.qix.openDoc({qDocName:settings.QIX[AppName]})
            .then( result =>{
                console.log("MAP App with Id "+settings.QIX[AppName]+" is open");
                console.log(result);
                return (result.getAppLayout());
            }, error => {
                console.log("Error opening the app --> "+error);
                reject({result:'ERROR', error:error});
            })
            .then( ressult =>{
                fulfill({result:'OK', data:ressult});
            }, err => { 
                console.log("Error whie loading MAB "+err);
                reject({result:'ERROR', error:err});
            })
            .catch(error =>{
                reject({result:'ERROR', error:error});
            })    
        })
    }

    getAppLayout(){
        return new Promise ( (fulfill, reject) =>{
            this.appObj.getAppLayout({})
            .then( script => { 
                fulfill (script)
            })
            .catch( error => {
                reject(error)
            })
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

    createSessionObject(){
        return new Promise ( (fulfill, reject) =>{
            this.appObj.createSessionObject(scatterplotProperties)
            .then( model =>{
                scatterplotObject = model;
                const update = () => scatterplotObject.getLayout().then((layout) => {
                    fulfill(layout);
                  });
                            
                  scatterplotObject.on('changed', update);
                  update();
                                    
                
            }, error =>{
                reject(error);
            })
        })

    }

    getHyperCubeData(qPath, qPage){
        return new Promise ( (fulfill, reject) =>{
            this.appObj.getHyperCubeData(qPath, qPage)
            .then( hypercube =>{
                console.log(hypercube);
                fulfill(hypercube);
            }, error => { 
                console.log(error);
                reject(error)
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

    /*
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
    */

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