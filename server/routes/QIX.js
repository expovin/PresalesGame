const express = require('express');
const router = express.Router();
const QIX = require('../lib/ClassQIX');
const QRSClass = require('../lib/QRSClass');
const customers = require('../lib/dictionary').companies;
const Config = require('../lib/settings');
const settings = new Config();
const qix= new QIX();
const qrs = new QRSClass();

/* get all presales */
router.route('/')
.get( function(req, res, next) {
    qix.getEngineVersion()
    .then( version =>{
        res.status(200).json({result:'OK', data:version});
    }, error => {
        res.status(503).json({result:'ERROR', error:error});
    })
    
})
.post( function (req, res, next){
    qix=new QIX(req.body.appName);
    res.status(200).json({result:'OK', message:'Connected to the Engine ',data:qix});
    
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    qix.closeEngine()
    .then( res => {
        res.status(200).json({result:'OK', message:'Engine connection closed'});
    }, error => {
        res.status(501).json({result:'ERROR', error:error});
    })
    
})

router.route('/token/:trigram')
.get( function(req, res, next) {
    qrs.getToken(req.params.trigram)
    .then( token =>{
        res.status(200).json({result:'OK', data:token});
    }, error => {
        res.status(503).json({result:'ERROR', error:error});
    })
    
})

router.route('/userId/:trigram')
.get( function(req, res, next) {
    qrs.getUserId(req.params.trigram, req.headers.userdir)
    .then( UserId =>{
        res.status(200).json({result:'OK', data:UserId});
    }, error => {
        res.status(503).json({result:'ERROR', error:error});
    })
    
})

/* get all presales */
router.route('/app')
.get( function(req, res, next) {
    qix.getDocList()
    .then( docs =>{
        res.status(200).json({result:'OK', data: docs});
    }, error =>{
        res.status(504).json({result:'ERROR', error: error});
    })

})
.post( function (req, res, next){    
    qix.createApp(req.body.appName)
    .then( delRes =>{
        res.status(200).json({result:'OK', message:'App '+req.body.appName+' created', data:delRes});
    }, error => {
        res.status(505).json({result:'ERROR', error:error});
    })
})
.put( function (req, res, next){
    qix.openDoc(req.body.appID)
    .then( result =>{
        res.status(200).json({result:'OK', message:'App opened', data:result});
    }, error => {
        res.status(506).json({result:'ERROR', error:error});
    })
    .catch(err =>{
        res.status(506).json({result:'ERROR', error:err});
    })
    
})
.delete( function (req, res, next){
    qix.deleteApp(req.body.appID)
    .then( result =>{
        res.status(200).json({result:'OK', message:'App '+req.body.appID+' has been deleted', data:result});
    }, error => {
        res.status(507).json({result:'ERROR', error:error});
    })
    
})

router.route('/app/close')
.get( function(req, res, next) {
    qix.closeDoc()
    .then( result =>{
        res.status(200).json({result:'OK '+  result});
    }, error =>{
        res.status(508).json({result:'ERROR: '+ error});
    })
})


/* get all presales */
router.route('/app/layout')
.get( function(req, res, next) {
    qix.getAppLayout()
    .then( appLayout =>{

        res.status(200).json({result:'OK ',  message:appLayout});
    }, error =>{
        res.status(508).json({result:'ERROR: '+ error});
    })
})

/* get all presales */
router.route('/app/createSessionObject')
.get( function(req, res, next) {
    qix.createSessionObject()
    .then( hypercube =>{
        res.status(200).json({result:'OK '+ hypercube});
    }, error =>{
        res.status(508).json({result:'ERROR: '+  error});
    })
})


/* get all presales */
router.route('/app/script')
.get( function(req, res, next) {
    qix.getScript()
    .then( script =>{
        res.status(200).json({result:'OK '+ script});
    }, error =>{
        res.status(508).json({result:'ERROR: '+  error});
    })
})
.post( function(req, res, next) {
    qix.setScript(req.body.script)
    .then( script =>{
        res.status(200).json({result:'OK '+ script});
    }, error =>{
        res.status(508).json({result:'ERROR'+  error});
    })
})

router.route('/app/MAB/reload')
.get( function(req, res, next) {
    qix.openDoc(settings.QIX.MABAppId)
    .then( appObj =>{
        return (appObj.appObj.doReloadEx({
                    "qMode": 0,
                    "qPartial": false,
                    "qDebug": false
                }));
    }, error => {
        console.log("Error opening the app --> "+error);
        res.status(506).json({result:'ERROR', error:error});
    })
    .then( result =>{
        console.log("Reload lunched succesfully ");
        res.status(200).json({result:'OK', message:"Reoad lunched succesfully", data: result});
    }, err => { 
        console.log("Error whie loading MAB "+err);
        res.status(507).json({result:'ERROR', error:err});
    })
    .catch(error =>{
        console.log("Something went wrong!");
        res.status(506).json({result:'ERROR', error:error});
    })    
})

router.route('/app/MAB/layout')
.get( function(req, res, next) {
    qix.MABReload()
    .then( result =>{
        res.status(200).json({result:'OK', data:res});
    }, error =>{
        res.status(507).json({result:'ERROR', error:error});
    })
    .catch(error =>{
        res.status(506).json({result:'ERROR', error:error});
    })      
})

router.route('/user/:id/custProp')
.get( function(req, res, next) {
    qrs.getUser(req.params.id)
    .then( custProp =>{
        res.status(200).json({result:'OK', data:custProp});
    })
})
.put( function(req, res, next) {
    qrs.addCustomProp(req.params.id,req.body.custProp)
    .then( result =>{
        res.status(200).json({result:'OK', data:result});
    })
})
.delete( function(req, res, next) {
    qrs.removeCustomProp(req.params.id,req.headers.custprop)
    .then( result =>{
        res.status(200).json({result:'OK', data:result.toString('utf8')});
    })
})


router.route('/app/halyard')
.get( function(req, res, next) {

})
.post( function(req, res, next) {
    qix.reloadApp()
    .then( result =>{
        res.status(200).json({result:'OK: '+ result});
    },error => {
        res.status(530).json({result:'ERROR: '+ error});
    })
    .catch( error =>{
        res.status(530).json({result:'ERROR: '+ error});
    })
})
.put( function(req, res, next) {
    qix.addTable(customers,"Customers");   
    res.status(200).json({result:'OK', message: "Table added"});
})
module.exports = router;
