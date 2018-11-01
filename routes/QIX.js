var express = require('express');
var router = express.Router();
const QIX = require('../lib/ClassQIX');
const customers = require('../lib/dictionary').companies;

var qix=null;

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
    
})
.delete( function (req, res, next){
    qix.deleteApp(req.body.appID)
    .then( result =>{
        res.status(200).json({result:'OK', message:'App '+req.body.appID+' has been deleted', data:result});
    }, error => {
        res.status(507).json({result:'ERROR', error:error});
    })
    
})


/* get all presales */
router.route('/app/layout')
.get( function(req, res, next) {
    qix.getAppLayout()
    .then( appLayout =>{
        res.status(200).json({result:'OK', data: appLayout});
    }, error =>{
        res.status(508).json({result:'ERROR', error: error});
    })
})

/* get all presales */
router.route('/app/script')
.get( function(req, res, next) {
    qix.getScript()
    .then( script =>{
        res.status(200).json({result:'OK', data: script});
    }, error =>{
        res.status(508).json({result:'ERROR', error: error});
    })
})
.post( function(req, res, next) {
    qix.setScript(req.body.script)
    .then( script =>{
        res.status(200).json({result:'OK', data: script});
    }, error =>{
        res.status(508).json({result:'ERROR', error: error});
    })
})


router.route('/app/halyard')
.get( function(req, res, next) {

})
.post( function(req, res, next) {
    qix.reloadApp()
    .then( result =>{
        res.status(200).json({result:'OK', data: result});
    },error => {
        res.status(530).json({result:'ERROR', error: error});
    })
    .catch( error =>{
        res.status(530).json({result:'ERROR', error: error});
    })
})
.put( function(req, res, next) {
    qix.addTable(customers,"Customers");   
    res.status(200).json({result:'OK', message: "Table added"});
})
module.exports = router;
