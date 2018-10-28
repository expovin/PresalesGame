var express = require('express');
var Company = require('../lib/ClassCompany');
var m = require('../lib/Game');
var router = express.Router();


/* get all presales */
router.route('/')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompanies()});
})
.post( function (req, res, next){
    var c = new Company(req.body.name, m[req.headers.gameid].getBaseProductFeatures());
    m[req.headers.gameid].addCompany(c);
    res.status(200).json({result:'OK', message:'Added company '+req.body.name, id : c.getID()});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    m[req.headers.gameid].deleteCompanies();
    res.status(200).json({result:'OK', message:'Companies have been deleted'});
})

router.route('/:companyID')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompany(req.params.companyID)});
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
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompany(req.params.companyID).getMessage()});
})
.post( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).sendMessage(req.body.message);
    res.status(200).json({result:'OK', message:'Message sent'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).deleteMessages();
    res.status(200).json({result:'OK', message:'All messages have been deleted!'});
})

router.route('/:companyID/BAM')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', 
                    data: m[req.headers.gameid].getCompany(req.params.companyID).getBAMStatus()});
})
.post( function (req, res, next){
    if(m[req.headers.gameid].getCompany(req.params.companyID).enableBAM())
        res.status(200).json({result:'OK', message:'BAM has been enabled'});
    else
        res.status(200).json({result:'WARNING', message:'Sorry, you have not enought hours to implement BAM'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).disableBAM();
    res.status(200).json({result:'OK', message:'BAM has been disabled'});
})

router.route('/:companyID/TOP')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompany(req.params.companyID).getTOPStatus()});
})
.post( function (req, res, next){
    if(m[req.headers.gameid].getCompany(req.params.companyID).enableTOP())
        res.status(200).json({result:'OK', message:'TOP has been enabled'});
    else
    res.status(200).json({result:'WARNING', message:'Sorry, you have not enought hours to implement TOP'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).disableTOP();
    res.status(200).json({result:'OK', message:'TOP has been disabled'});
})

router.route('/:companyID/Compain')
.get( function(req, res, next) {
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.post( function (req, res, next){
    if(m[req.headers.gameid].getCompany(req.params.companyID).marketingCampain(req.body.cost, req.body.hours))
        res.status(200).json({result:'OK', message:'Campain has been acquired'})
    else
        res.status(200).json({result:'WARNING', message:'Sorry, you have not enought budget nor hours for this campain'})
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})

router.route('/:companyID/ProductFeature')
.get( function(req, res, next) {
    res.status(209).json({result:'OK', data:m[req.headers.gameid].getCompany(req.params.companyID).getProductFeatures()});
})
.post( function (req, res, next){
    if(m[req.headers.gameid].getCompany(req.params.companyID).improveFeature(req.body.feature, req.body.points))
        res.status(200).json({result:'OK', message:'Product features has been improved'});
    else
        res.status(200).json({result:'WARNING', message:'Sorry, you have no enought points'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})

module.exports = router;
