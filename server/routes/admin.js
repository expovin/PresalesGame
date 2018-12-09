const express = require('express');
const m = require('../lib/Game');

var router = express.Router();


router.route('/')
.get( function(req, res, next) {
    res.status(200).json({result:'WARNIN', message: 'This function has not been implemented yet'});
})


router.route('/wsMessage')
.put( function (req, res, next){
    m.ws.sendBroadcastMessage(JSON.stringify(req.body.wsMessage))
    res.status(209).json({result:'OK', message:'Broadcast message sent via webSocket'});
})

router.route('/wsMessage/:companyId')
.put( function (req, res, next){
    m.ws.sendTextMessage(req.params.companyId, JSON.stringify(req.body.wsMessage))
    res.status(209).json({result:'OK', message:'Message sent via webSocket sent to '+req.params.companyId});
})


module.exports = router;
