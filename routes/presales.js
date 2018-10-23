var express = require('express');
var Presales = require('../lib/ClassPresales');
var m = require('../lib/Game');

var router = express.Router();

//var PresalesPeople={};

/* get all presales */
router.route('/')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getPeople()});
})
.post( function (req, res, next){
    for(var i=0; i<req.body.num; i++){
        var p = new Presales(m[req.headers.gameid].getMarketTrends());
        m['m'].addPerson(p);
    }
    res.status(200).json({result:'OK', message:'Generated '+req.body.num+' presales person'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    m['m'].deletePeople()
    res.status(200).json({result:'OK', message:'Presales people have been deleted'});
})

router.route('/:presalesID')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getPerson(req.params.presalesID)});
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
