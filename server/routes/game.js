var express = require('express');
var Presales = require('../lib/Game');
var router = express.Router();

var games={};

/* get all presales */
router.route('/')
.get( function(req, res, next) {
    //PresalesPeople.forEach( p => people.push(p.getValues()));
    res.status(200).json({result:'OK', data: PresalesPeople});
})
.post( function (req, res, next){
    for(var i=0; i<req.body.num; i++){
        var p = new Presales();
        PresalesPeople[p.getID()]=p;
    }
    res.status(200).json({result:'OK', message:'Generated '+req.body.num+' presales person'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    PresalesPeople={};
    res.status(200).json({result:'OK', message:'Presales people have been deleted'});
})

router.route('/:presalesID')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data: PresalesPeople[req.params.presalesID].getValues()});
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
