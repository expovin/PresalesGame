var express = require('express');
var Verify = require('../lib/verify');
var QRSClass = require('../lib/QRSClass');

//var db = require('../utils/dbConnection');
var o365 = require('../lib/o365.js');
var router = express.Router();

qrs = new QRSClass();


router.route('/auth/o365')
.get(function(req, res, next){  
  var url = o365.processLogin(req, res);
  res.json({status:'OK', url:url});
});

router.route('/auth/return')
.get(function(req, res, next){  
  var trigram;
  o365.processAuthorize(req, res)
  .then( userDet => {
    var email = userDet.userPrincipalName
    trigram = email.substr(0,email.indexOf('@'));
    
    /** GET QS Token */
    return (qrs.getToken(trigram))
  })
  .then( qsToken =>{
    var token = Verify.getToken({username:trigram,qsToken:qsToken});

   res.redirect("/landing?token="+token+"&trigram="+trigram+"&qsToken="+qsToken.Ticket);
  })
})
.post(function(req, res, next){  
  res.status(200).json({message: 'Post Test'});
});




module.exports = router;
