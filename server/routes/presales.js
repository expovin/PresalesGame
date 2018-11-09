var express = require('express');
var Presales = require('../lib/ClassPresales');
var m = require('../lib/Game');

var router = express.Router();



/* get all presales */
router.route('/')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getPeople(req.headers.employed)});
})
.post( function (req, res, next){
    for(var i=0; i<req.body.num; i++){
        var p = new Presales(m[req.headers.gameid].getMarketTrends());
        m[req.headers.gameid].addPerson(p);
        m[req.headers.gameid].addPeopleToArray(p);
    }
    res.status(200).json({result:'OK', message:'Generated '+req.body.num+' presales person'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    m[req.headers.gameid].deletePeople()
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

router.route('/:presalesID/meritIncrease')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: m[req.headers.gameid].getPerson(req.params.presalesID).getMeritIncreases()});
})
.post( function (req, res, next){
    m[req.headers.gameid]
        .getPerson(req.params.presalesID)
        .meritIncrease(req.body.percentage, m[req.headers.gameid].getCurrentQuarter())

    res.status(209).json({result:'OK', message:'Merit increase added to '+m[req.headers.gameid].getPerson(req.params.presalesID).getName()});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})


router.route('/:presalesID/satisfaction')
.get( function(req, res, next) {
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.post( function (req, res, next){
    res.status(200).json({result:'OK', data: m[req.headers.gameid]
                        .getPerson(req.params.presalesID)
                        .changeSatisfactionalLevel( parseInt(req.body.percentage,10), 
                                                    parseInt(req.body.absolute,10))});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})


module.exports = router;
