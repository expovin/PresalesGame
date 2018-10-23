var express = require('express');
var Company = require('../lib/ClassCompany');
var m = require('../lib/Game');
var router = express.Router();

//var m= new Market();

/* get all presales */
router.route('/')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m['m'].getCompanies()});
})
.post( function (req, res, next){
    var c = new Company(req.body.name);
    m['m'].addCompany(c);
    res.status(200).json({result:'OK', message:'Added company '+req.body.name, id : c.getID()});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    m['m'].deleteCompanies();
    res.status(200).json({result:'OK', message:'Companies have been deleted'});
})

router.route('/:companyID')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m['m'].getCompany(req.params.companyID)});
})
.post( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})

router.route('/:companyID/message')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m['m'].getCompany(req.params.companyID).getMessage()});
})
.post( function (req, res, next){
    m['m'].getCompany(req.params.companyID).sendMessage(req.body.message);
    res.status(200).json({result:'OK', message:'Message sent'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    m['m'].getCompany(req.params.companyID).deleteMessages();
    res.status(200).json({result:'OK', message:'All messages have been deleted!'});
})

module.exports = router;
