var express = require('express');
var Oppy = require('../lib/ClassOpportunities');
var router = express.Router();

var OpportunitiesList=[];

/* get all presales */
router.route('/')
.get( function(req, res, next) {
    var oppys=[];
    OpportunitiesList.forEach( o => oppys.push(o.getValues()));
    res.status(200).json({result:'OK', data: oppys});
})
.post( function (req, res, next){
    for(var i=0; i<req.body.num; i++)
        OpportunitiesList.push(new Oppy(req.body.minValue, req.body.maxValue, req.body.minTTC, req.body.maxTTC))

    res.status(200).json({result:'OK', message:'Generated '+req.body.num+' opportunities'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    OpportunitiesList=[];
    res.status(200).json({result:'OK', message:'Opportunities have been deleted'});
})

router.route('/:oppyID')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: OpportunitiesList[req.params.oppyID].getValues()});
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
