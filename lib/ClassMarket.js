'use strict'

/** This is the parent class Market. This class define the heuristic algorithms
 *  used by the child class Presales and Opportunities.
  */
const settings = require("./settings");
const helper = require("./helper");
const trends = require('./dictionary').trends;
const features = require('./dictionary').features;
const periods = require('./dictionary').periods;
const customers = require('./dictionary').companies;

const QIX = require('../lib/ClassQIX');



class Market {
    

    constructor(m) {
        this.qix=new QIX(m);;
        this.periodIndex=0;
        this.MarketTrends=[];
        this.ProductBasicFeatures=[];
        /** Constructor for the parent class. */
        this.setMarketTrends();
        this.generateBaseProductFeatures();

        this.People={};

        this.PeopleArray=[];
        this.PeopleTrends=[];
        this.PeopleSkills=[];

        this.Companies={};
        this.Opportunities=[];
        this.OppyDeserialized=[];
        this.OppyTrendsDeserialized=[],

        this.quarter=periods[this.periodIndex];

    }

    initQIX(m){
        return new Promise ( (fulfill, reject) =>{
            this.qix.createApp()
            .then (appID =>{
                console.log("Document created")
                return (this.qix.openDoc(appID.qAppId))
            })
            .then(result =>{
                console.log("Document opened");
                this.qix.addTable(this.MarketTrends,"MarketTrends");
                this.qix.addTable(this.OppyDeserialized,"Opportunities");
                this.qix.addTable(this.OppyTrendsDeserialized,"OpportunityTrends");
                this.qix.addTable(this.PeopleArray,"People");
                this.qix.addTable(this.PeopleTrends,"Trends");
                this.qix.addTable(this.PeopleSkills,"Skills");
                this.qix.addTable(customers,"customers");      
                return (this.qix.reloadApp())         
            })
            .then( () =>{
                console.log("App reloaded");
                fulfill(true);
            })
            .catch( error =>{
                console.log("Error while loading data to QIX ",error);
                reject(error);
            })
        })
    }

    deserializeOppy(){
        this.Opportunities.forEach (o =>{
            var newOppy={};
            newOppy['idOpportunity']=o.ID;
            newOppy['company']=o.CompanyName;
            newOppy['oppyTeoricalValue']=o.teoricalValue;
            newOppy['oppyQualificationLevel']=o.qualificationLevel;
            this.OppyDeserialized.push(newOppy);

            o.TrendsRequired.forEach (ot =>{
                var otNew = {}
                otNew['idOpportunity']=o.ID;
                otNew['trendName']=ot;
                this.OppyTrendsDeserialized.push(otNew);
            })
        })
    }


    addPeopleToArray(p){
        var person = {
            idPerson : p.person.ID,
            personName : p.person.name,
            personCost : p.person.cost,
            satisfactionLevel : p.person.satisfactionLevel,
            timePerQuarter : p.person.timePerQuarter,
            employedBy : p.person.employedBy,
            isEmployed : p.person.isEmployed,
        };

        this.PeopleArray.push(person);

        console.log(p.person.PersonTrends);
        p.person.PersonTrends.forEach( trend => {
            var newTrend=[];
            newTrend['idPerson']=p.person.ID;
            newTrend['trendName']=trend.name;
            newTrend['trendScore']=trend.score;
            this.PeopleTrends.push(newTrend);
        })

        p.person.skills.forEach( skill => {
            var newSkill=[];
            newSkill['idPerson']=p.person.ID;
            newSkill['skillName']=skill.name;
            newSkill['skill.score']=skill.score;
            this.PeopleSkills.push(newSkill);
        })
    }

    scoreCalculus(companyID,oppy){
        /**  */
        /** Get the Trends weight*/
       
        let trendScore =0;
        oppy.getTrends.forEach( (trend, index) => {
            let maxTrendScore=0;
            this.Companies(companyID).getPresalesTeam().forEach( personID => {
                this.People[personID].getTrends().forEach( t => {
                    if((trend === t.name) && (t.score > maxTrendScore))
                        maxTrendScore=t.score
                })
            })
            trendScore += settings.TrendWeight[index]*maxTrendScore;
            let trendScoreNormalized = trendScore/14 * settings.weighCompetition.Trends;
            console.log("Max Trend score found for Trend : ",trend," and company ",companyID," : ",maxTrendScore," >>> ",trendScore," Normal : ",trendScoreNormalized);

        })

        /** Get the feature weight */
        let featureScore=0;
        oppy.productFeatures.forEach( (feature, index) => {
            let maxFeatureScore=0;
            this.Companies(companyID).getPresalesTeam().forEach( personID => {
                this.People[personID].getFeatures().forEach( f => {
                    if((feature === f.name) && (f.score > maxFeatureScore))
                        maxFeatureScore=f.score
                })
            })
            featureScore += settings.FeatureWeigh[index]*maxFeatureScore;
            let featureScoreNormalized = featureScore/14 * settings.weighCompetition.Features;
            console.log("Max Feature score found for Feature : ",feature," and company ",companyID," : ",maxFeatureScore," >>> ",featureScore," Normal : ",featureScoreNormalized);
        })
        
        /** Get the Business Acumen Average  */
        let summBA=0;
        this.Companies(companyID).getPresalesTeam().forEach( personID => summBA += this.People[personID].getSkillBA())
        let avgBA=summBA/this.Companies(companyID).getPresalesTeam().length;
        let avgBANormalized = avgBA * settings.weighCompetition.BA;
        console.log("Average Business Acumen : ",avgBA, " Normal : ",avgBANormalized);

        /** Get the Brend Recognition */
        let brandRecognition = this.Companies(companyID).getBrendRecognition();
        let brandRecognitionNormalized = brandRecognition * settings.weighCompetition.BR;
        console.log("Brand Recognition : ", brandRecognition, " Normalized: ", brandRecognitionNormalized);

        return ({companyID: companyID, TrendScore: trendScoreNormalized, FeatureScore: featureScoreNormalized, BA: avgBANormalized, BR: brandRecognitionNormalized})

    }

    nextPeriod(){

        /** Start Fight this Quarter */
        // Get out the recursive Quarter cost (People cost, BAM, TOP)
        Object.keys(this.Companies).forEach(function(companyID) {
            let totalPeopleCosts = 0;
            this.Companies(companyID).getPresalesTeam().forEach( personID => totalPeopleCosts += this.People[personID].getCost())
            this.Companies(companyID).payQuarterCosts(totalPeopleCosts);
          });

        // Loop for each opportunity and pass them to the companies.
        Opportunities.forEach( oppy => {
            let winner=null;
            let winnerScore=0;
            Object.keys(this.Companies).forEach(companyID => {  
                /** If the company want to compete */
                if(this.Companies(companyID).competeOnOpportunity(oppy))
                    /** Let's make the calcolation */
                    CompanyRecord = this.scoreCalculus(companyID, oppy);
                    this.Opportunities[oppy].addPretender(CompanyRecord)       // Add the company as pretender
                    CompanyScore = CompanyRecord.TrendScore + CompanyRecord.FeatureScore + CompanyRecord.BA + CompanyRecord.BR;
                    if( CompanyScore > winnerScore) {
                        winnerScore = CompanyScore;
                        winner = companyID;
                    }
            })
            oppy.setWinner(winner);         // Set the Winner on the Company record
            this.Companies(companyID).cashIn(oppy.getRealValue())
        })



        /** Ending Fight, get start with the next Quarter */
        /** Move forward to the next Quarter */
        this.periodIndex++;
        this.quarter=periods[this.periodIndex];

       
        Object.keys(this.Companies).forEach(function(companyID) {
            /** Reset the total hours for each Company */
            this.Companies(companyID).resetTotalHours();
            /** Lower The Teem Mood */
            let decrease=settings.decSatisfactionQuarterPerc;
            if(this.Companies(companyID).getBAMStatus()) decrease += settings.BAMSatisfactionLvlImpactPerc;
            if(this.Companies(companyID).getTOPStatus()) decrease += settings.TOPSatisfactionLvlImpact;
            this.Companies(companyID).getPresalesTeam().forEach( personID =>  this.People[personID].changeSatisfactionalLevel(decrease*(-1)))

            /** Lower the Company brad */
            this.Companies(companyID).decreaseBrendRecognition(settings.decreaseBrandperQuarterPerc);
          });

        /** Slightly change market trends */
        slightlyChangeMarketTrends();
    }

    getCurrentQuarter() { return this.quarter }
    addPerson(person) { this.People[person.getID()]=person}
    setPeople(people){ this.People=people}

    /** Return the list of people. The parameter type should be:
     *  mull : Return all presales people in the array
     *  true : Return only the employed presales person
     *  false: Return only the unenployed presales person
     */
    getPeople(employedStatus) {
        if(employedStatus === undefined)
            return this.People
        else{
            var results={};
            var _this = this;
            var isEmp=false;
            if(employedStatus === "true")
                isEmp=true;
            Object.keys(this.People).forEach(function(PresalesID) {
                var Person = _this.People[PresalesID];
                if( Person.getEmployedStatus() === isEmp )
                    results[PresalesID]=Person;
            });
            return results;
        }
    }

    getPerson(personID) { return this.People[personID]}
    deletePeople(){ this.People={} }

    addCompany(company){ this.Companies[company.id]=company}
    setCompanies(companies){ this.Companies=companies}
    getCompanies(){ return this.Companies }
    getCompany(companyID) {return this.Companies[companyID]}
    deleteCompanies(){ this.Companies={}}

    addOpportunity(oppy) { this.Opportunities.push(oppy)}
    getOpportunities() { return(this.Opportunities)}
    deleteOpportunities() { this.Opportunities={}}

    setMarketTrends(){
        trends.forEach( trend =>{
            this.MarketTrends.push({trendName : trend, marketTrendScore : helper.generateRandomValue(settings.MinTrendScore, settings.MaxTrendScore)})
        })
    }

    generateBaseProductFeatures(){
        for(var i=0; i<settings.numberOfProductFeatures; i++){
            var feature = features[Math.floor(Math.random()*features.length)];
            this.ProductBasicFeatures.push({ name: feature, score : helper.generateRandomValue(settings.MinFeatureScore, settings.MaxFeatureScore)})
        }
        this.ProductBasicFeatures =  this.removeDuplicates(this.ProductBasicFeatures);
    }

    getBaseProductFeatures(){ return this.ProductBasicFeatures }

    
    getCourse(companyID, personID, marketTrend, feature, money, hours, quantityToIncrease){

        if(!this.Companies[companyID].payHours(hours))
            return (false);
        if(!this.Companies[companyID].payMoney(money))
            return(false);

        if(marketTrend !== undefined){
            this.People[personID].increaseTrend(marketTrend, quantityToIncrease);
            this.People[personID].addCourse({period:this.quarter, marketTrend : marketTrend, hours : hours})
        }
            
        if(feature !== undefined){
            this.People[personID].increaseFeature(feature, quantityToIncrease);
            this.People[personID].addCourse({period:this.quarter, feature : feature, hours : hours})
        }
        return(true);
    }
    
    
    slightlyChangeMarketTrends(){
        this.MarketTrends.forEach( m => {
            var newScore = m.score + Math.round(m.score * helper.generateRandomValue(settings.marketTrendPercentageVariationMin, settings.marketTrendPercentageVariationMax)/100);
            m.score = newScore;
        })
    }

    getMarketTrends(){
        return(this.MarketTrends);
    }

    getMarketTrendsObj(){
        var m={};
        this.MarketTrends.forEach( trend =>{
            m[trend.name]=trend.score;
        })
        return(m);
    }

    getFeature(){
        return(features[Math.floor(Math.random() * trends.length)]);
    }    

    removeDuplicates(array){
        return( array.filter(function(elem, pos) {
            return array.indexOf(elem) == pos;
        }))
    }
}


module.exports = Market;