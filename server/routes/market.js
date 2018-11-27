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
    /*
    m[req.headers.gameid].initQIX(m)
    .then( result => {
        res.status(200).json({result:'OK', message:'Market initialized'});
    }, error =>{
        res.status(200).json({result:'ERROR', error});
    })
    .catch(error =>{
        res.status(200).json({result:'ERROR', error});
    })
    */
   res.status(200).json({result:'OK', message:'Market initialized'});
})
.put( function (req, res, next){
    m[req.headers.gameid].preNextPeriod()
    res.status(200).json({result:'OK', message:'Test scenario is ready'});
})
.delete( function (req, res, next){
    
    res.status(200).json({result:'OK', message:'Market trends have been deleted'});
})


/* get all presales */
router.route('/nextPeriod')
.get( function(req, res, next) {
    m[req.headers.gameid].nextPeriod();
    res.status(200).json({result:'OK', message:'Ready to fight for the net Quarter'});
})

router.route('/rank')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data:m[req.headers.gameid].getQCompanyRank()});
})

router.route('/oppy/flush')
.post( function(req, res, next) {
    m[req.headers.gameid].saveQuarterResultToFile(req.body.quarter, m[req.headers.gameid].getOpportunities())
    res.status(200).json({result:'OK', message:"Statistics exported to file"});
})


router.route('/BRShare')
.get( function(req, res, next) {
    res.status(200).json({result:'OK', data:m[req.headers.gameid].getBRShare()});
})
.post( function(req, res, next) {
    m[req.headers.gameid].assignBrendRecognition();
    res.status(200).json({result:'OK', message:"Brend recognition assigned"});
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
                .sendMessage({type:'success', msg:'Congratulation, you hired'+
            m[req.headers.gameid]
                .getPerson(personID)
                .getName()});
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
                .sendMessage({type:'error',msg:"Dears, please accept my resignations, Sincerely "+
            m[req.headers.gameid]
                .getPerson(personID)
                .getName()});

            m[req.headers.gameid]
                .getCompany(resigned)                
                .dismissPerson(  
            m[req.headers.gameid]
                .getPerson(personID));
        }
      });


      Object.keys(Deals).forEach(companyID => {
          Deals[companyID].forEach( personID =>{
            // Add this person to the list of people to confirm
            m[req.headers.gameid].getCompany(companyID).addPeopleToConfirm(m[req.headers.gameid].getPerson(personID));
          })
      });

    res.status(200).json({result:'OK', data: Deals, resigned : resignedPeople});
})
.post( function (req, res, next){

    if(!m[req.headers.gameid]
        .getCompany(req.body.companyID)
        .hirePerson(m[req.headers.gameid].getPerson(req.body.personID))){
              m[req.headers.gameid]
                  .getPerson(req.body.personID)
                  .dismiss();
              m[req.headers.gameid]
                  .getCompany(req.body.companyID)
                  .sendMessage({type:'warning', msg:"Sorry, you did not hired "+m[req.headers.gameid].getPerson(req.body.personID).getName()+" because you run out of budget"});
    } else {
        m[req.headers.gameid].getCompany(req.body.companyID).acceptProposal(req.body.personID);
    }

    res.status(209).json({result:'OK', message:'Person Hired!'});
})
.put( function (req, res, next){
    m[req.headers.gameid].getPerson(req.body.personID).dismiss();
    m[req.headers.gameid].getCompany(req.body.companyID).declineProposal(req.body.personID);

    res.status(209).json({result:'OK', message:'Person discarded'});
})

router.route('/avgSatisfaction/:companyID/')
.get( function(req, res, next) {
    res.status(209).json({result:'OK', data:m[req.headers.gameid].getAvgSatisfactionalLevel(req.params.companyID)});
});

router.route('/avgTeamWork/:companyID/')
.get( function(req, res, next) {
    res.status(209).json({result:'OK', data:m[req.headers.gameid].getAvgTeamWorkLevel(req.params.companyID)});
});

router.route('/proposal/:companyID/:presalesID')
.get( function(req, res, next) {
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.post( function (req, res, next){
    var p = m[req.headers.gameid].getPerson(req.params.presalesID);
    var c = m[req.headers.gameid].getCompany(req.params.companyID);

    if(!c.makeProposal(p.getID(), p.getCost()))
        res.status(209).json({result:'WARNING', message:'Sorry, You have not enought budget to make this proposal'});
    else {
        p.evalProposal( c.getID(), req.body.value);
        res.status(200).json({result:'OK', message:'Proposal from company '+c.getName()+' has been sent to '+p.getName()});
    }
})
.delete( function (req, res, next){
    var p = m[req.headers.gameid].getPerson(req.params.presalesID);
    var c = m[req.headers.gameid].getCompany(req.params.companyID);

    p.removeProposal( c.getID());
    c.deleteProposal( p.getID());
    res.status(209).json({result:'OK', message:'Proposal to '+c.getName()+' has been removed!'});
})

router.route('/course/:companyID/:presalesID')
.get( function(req, res, next) {
    res.status(209).json({result:'OK', data:m[req.headers.gameid].getPerson(req.params.presalesID).getCourse()});
})
.post( function (req, res, next){
    if(m[req.headers.gameid].getCourse(req.params.companyID, 
        req.params.presalesID, 
        req.body.marketTrend, 
        req.body.feature,
        req.body.money,
        req.body.hours,
        req.body.quantity))
        res.status(200).json({result:'OK', message:'Presales '+m[req.headers.gameid].getPerson(req.params.presalesID).getName()+' has succesfully get the course'});
    else
        res.status(209).json({result:'WARNING', message:'Sorry, you have not enought budget nor hours to afford this sourse'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    MarketTrends=[];
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})

router.route('/retentionBonus/:companyID/:presalesID')
.get( function(req, res, next) {
    res.status(209).json({result:'OK', data:m[req.headers.gameid].getPerson(req.params.presalesID).getRetentionBonus()});
})
.post( function (req, res, next){
    if(m[req.headers.gameid]
        .getCompany(req.params.companyID)
        .retentionBonus(req.body.money)) {
            m[req.headers.gameid].getPerson(req.params.presalesID).retentionBonus(req.body.money, m[req.headers.gameid].getCurrentQuarter());
            res.status(200).json({result:'OK', message:'Retention bonus has been sent to '+m[req.headers.gameid].getPerson(req.params.presalesID).getName()});
        }
    else
        res.status(209).json({result:'WARNING', message:'Sorry, you have not enought budget for the retention bonus'});
})
.put( function (req, res, next){
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})
.delete( function (req, res, next){
    MarketTrends=[];
    res.status(209).json({result:'WARNING', message:'This function has not been implemented yet'});
})

module.exports = router;
