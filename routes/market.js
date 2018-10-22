var express = require('express');
var Market = require('../lib/ClassMarket');
var router = express.Router();

var MarketTrends=[];

/* get all presales */
router.route('/')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: MarketTrends.getMarketTrends()});
})
.post( function (req, res, next){
    MarketTrends = new Market();
    res.status(200).json({result:'OK', message:'Market trends have been generated'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    MarketTrends=[];
    res.status(200).json({result:'OK', message:'Market trends have been deleted'});
})


module.exports = router;
