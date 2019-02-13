var express = require('express');
var passport = require('passport');
var Verify = require('../lib/verify');

var router = express.Router();




/** Local Authentication */
router.route('/local')
// Return some information on the use
.get(Verify.verifyOrdinaryUser, (req, res, next) => {

    res.status(200).json({success: true, user : 'You are correctly logged in as Ordinary user',decoded:req.decoded});
})
// Actual Local implementation
.post( (req, res, next) => {

    console.log("Request local authentication, user : ",req.body.username);
    passport.authenticate('local', function(err, result) {
        console.log("Auth passport return result : ",result);
        // Need to manage the error handling
        if (err){
            console.log("Error authentication module local policy: ",err);
            return res.status(401).json({msg: "Authentication error"});
        }  

        if(!result.user) {
            // Return authentication error. Trace on log
            console.log("Authentication error for user ",result.user);
            return res.status(401).json({err: "info"});
        }

        var token = Verify.getToken({"username":result.user,"role":result.role, "QSTicket":result.QSToken.Ticket});

        res.status(200).json({ success : true, token : token, QSTicket: result.QSToken.Ticket});
    })(req,res,next);
})


/** Offie 365 Authentication */
router.route('/o365')
// Return some information on the use
.get( (req, res, next) => {
    res.status(200).json({Return : 'Info to O365 Authentication policy'});
})
// Actual Local implementation
.post( (req, res, next) => {
    console.log("Called o365 Strategy!");
    res.status(200).json({Return : 'Info to Local Authentication policy'});
})

// Callback from o365
router.route('/o365/AuthToken')
.get(function(req, res, next){ 

})

