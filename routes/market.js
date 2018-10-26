var express = require('express');
var Market = require('../lib/ClassMarket');
var m = require('../lib/Game');
var router = express.Router();

var MarketTrends=[];

function initDeals(CompanyList){
    var deals={};
    Object.keys(CompanyList).forEach(companyID => deals[companyID]=[]);
    return deals;
  }

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


/* get all presales */
router.route('/evaluate')
.get( function(req, res, next) {
    var Deals=initDeals(m[req.headers.gameid].getCompanies());
    var people = m[req.headers.gameid].getPeople("false");


    /** Loop over unemployed people*/
    Object.keys(people).forEach(function(personID) {
        companyID=m[req.headers.gameid].getPerson(personID).acceptProposal();

        if(companyID !== null){
            Deals[companyID].push(personID);

            m[req.headers.gameid]
                .getCompany(companyID)
                .sendMessage("Congratulation, you hired "+
            m[req.headers.gameid]
                .getPerson(personID)
                .getName());
        }
      });

    /** Loop over employed people */
    var people = m[req.headers.gameid].getPeople("true");
    var resignedPeople=[];
    Object.keys(people).forEach(function(personID) {
        const resigned=m[req.headers.gameid].getPerson(personID).resign();
        if(resigned){
            resignedPeople.push(personID);
            m[req.headers.gameid]
                .getCompany(resigned)
                .sendMessage("Dears, please accept my resignations, Sincerely "+
            m[req.headers.gameid]
                .getPerson(personID)
                .getName());

            m[req.headers.gameid]
                .getCompany(resigned)                
                .dismissPerson(  
            m[req.headers.gameid]
                .getPerson(personID));
        }
      });


      Object.keys(Deals).forEach(companyID => {
          Deals[companyID].forEach( personID =>{
              m[req.headers.gameid]
              .getCompany(companyID)
              .hirePerson(m[req.headers.gameid].getPerson(personID));
          })
      });

    res.status(200).json({result:'OK', data: Deals, resigned : resignedPeople});
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



router.route('/proposal/:companyID/:presalesID')
.get( function(req, res, next) {
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.post( function (req, res, next){
    var p = m[req.headers.gameid].getPerson(req.params.presalesID);
    var c = m[req.headers.gameid].getCompany(req.params.companyID);
    p.evalProposal( c.getID(), req.body.value);
    c.makeProposal(p.getID());
    res.status(200).json({result:'OK', message:'Proposal from company '+c.getName()+' has been sent to '+p.getName()});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    MarketTrends=[];
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})

module.exports = router;
