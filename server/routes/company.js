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

router.route('/:companyID/flush')
.post( function(req, res, next) {
    if(m[req.headers.gameid].getCompany(req.params.companyID).saveQuarterResultToFile(req.body.quarter))
        res.status(200).json({result:'OK', message:'Quarter logs suffesfully saved'});
    else
        res.status(200).json({result:'WARNING', message:'Error while save quarter logs'});
})

router.route('/:companyID/Campain')
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
    m[req.headers.gameid].getCompany(req.params.companyID).deleteMarketCampain(req.body.idx);
    res.status(209).json({result:'OK', message:'Campain removed'});
})
.delete( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).deleteMarketCampain(req.body.idx);
    res.status(209).json({result:'OK', message:'Campain removed'});
})

router.route('/:companyID/ProductFeature')
.get( function(req, res, next) {
    res.status(209).json({result:'OK', data:m[req.headers.gameid].getCompany(req.params.companyID).getProductFeatures()});
})
.post( function (req, res, next){
    if(m[req.headers.gameid].getCompany(req.params.companyID).improveFeature(req.body.feature, req.body.money))
        res.status(200).json({result:'OK', message:'Product features has been improved'});
    else
        res.status(200).json({result:'WARNING', message:'Sorry, you have no enought money'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})

router.route('/:companyID/filter')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompany(req.params.companyID).getAllFilters()});
})

router.route('/:companyID/filter/value')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompany(req.params.companyID).getOppyValue()});
})
.post( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).setOppyValue(req.body.oppyValues);
    res.status(200).json({result:'OK', message:'Values has been set'});
})
.put( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).toggleValue();
    res.status(209).json({result:'OK', message:'OppyValue flag has been changed'});
})

router.route('/:companyID/filter/qualification')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompany(req.params.companyID).getOppyQualification()});
})
.post( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).setOppyQualification(req.body.oppyQualifications);
    res.status(200).json({result:'OK', message:'Values has been set'});
})
.put( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).toggleQualification();
    res.status(209).json({result:'OK', message:'OppyValue flag has been changed'});
})

router.route('/:companyID/filter/trend')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompany(req.params.companyID).getOppyTrend()});
})
.post( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).setOppyTrends(req.body.oppyTrends);
    res.status(200).json({result:'OK', message:'Values has been set'});
})
.put( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).toggleTrends();
    res.status(209).json({result:'OK', message:'OppyValue flag has been changed'});
})

router.route('/:companyID/filter/feature')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompany(req.params.companyID).getOppyFeature()});
})
.post( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).setOppyFeature(req.body.oppyFeatures);
    res.status(200).json({result:'OK', message:'Values has been set'});
})
.put( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).toggleFeature();
    res.status(209).json({result:'OK', message:'OppyValue flag has been changed'});
})

router.route('/:companyID/filter/worker')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompany(req.params.companyID).getOppyWorkers()});
})
.post( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).setOppyWorkers(req.body.oppyWorkers);
    res.status(200).json({result:'OK', message:'Values has been set'});
})
.put( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).toggleWorkers();
    res.status(209).json({result:'OK', message:'OppyValue flag has been changed'});
})

router.route('/:companyID/filter/industry')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getCompany(req.params.companyID).getOppyIndustry()});
})
.post( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).setOppyIndustry(req.body.oppyIndustries);
    res.status(200).json({result:'OK', message:'Values has been set'});
})
.put( function (req, res, next){
    m[req.headers.gameid].getCompany(req.params.companyID).toggleIndustry();
    res.status(209).json({result:'OK', message:'OppyValue flag has been changed'});
})

module.exports = router;
