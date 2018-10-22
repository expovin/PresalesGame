var express = require('express');
var Company = require('../lib/ClassCompany');
var router = express.Router();

var CompanyList=[];

/* get all presales */
router.route('/')
.get( function(req, res, next) {
    var AllComp=[];
    CompanyList.forEach( c => AllComp.push(c.getValues()));
    res.status(200).json({result:'OK', data: AllComp});
})
.post( function (req, res, next){
    CompanyList.push(new Company(req.body.name))
    res.status(200).json({result:'OK', message:'Added company '+req.body.name, seq : CompanyList.length-1});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    OpportunitiesList=[];
    res.status(200).json({result:'OK', message:'Companies have been deleted'});
})

router.route('/:companyID')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: CompanyList[req.params.companyID].getValues()});
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

module.exports = router;
