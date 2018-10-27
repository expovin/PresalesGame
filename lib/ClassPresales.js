var crypto = require('crypto');
const Market = require('./ClassMarket');
var settings = require("./settings");
var skills = require('./dictionary').skills;
var features = require('./dictionary').features;
var trends = require('./dictionary').trends;
var random = require('random-name');
const helper = require('./helper');

class Presales  {


    constructor(marketTrends) {

        this.marketTrends = {};
        /** Constructor for the parent class. */
        this.person = {
            ID:"",
            name : "",
            cost : 0,
            satisfactionLevel : settings.initSatisfactionLevel,
            timePerQuarter:settings.timePerQuarterPerPerson,
            employedBy:"on the market",
            isEmployed:false,
            PersonTrends : [],
            skills : [],
            features : [],
            proposals : [],
            courses : []
        }

        this.adaptMarketTrends(marketTrends);
        this.generateName();
        this.generateTrends();
        this.generateSkills();
        this.generateFeatures();
        this.generateCost();
        this.generateID();

    }

    getEmployedStatus() {return this.person.isEmployed }
    generateName (){ this.person.name=random() }
    getCost(){ return (this.person.cost) }
    getID(){ return(this.person.ID) }
    getName(){ return(this.person.name) }
    getTimePerQuarter(){ return (this.person.timePerQuarter)}
    getFeature(){ return(features[Math.floor(Math.random() * trends.length)]) }    
    getCourses() { return this.person.courses }
    addCourse(course) { this.person.courses.push(course)}
    

    changeSatisfactionalLevel(p, a){
        console.log("Called Satisfactional level. Percentage :  ",p," absolute : ",a);
        if(isNaN(p))
            this.person.satisfactionLevel+=a;
        else
            this.person.satisfactionLevel *= (1+p/100);  

        return this.person.satisfactionLevel;
        
    }

    getSkillWL(){
        var ret="";
        this.person.skills.forEach( s =>{
            if(s.name === "Willing to Learn")
                ret=s.score;
        })
        return ret;
    }

    getSkillBA(){
        var ret="";
        this.person.skills.forEach( s =>{
            if(s.name === "Business Acumen")
                ret=s.score;
        })
        return ret;
    }

    getSkillTW(){
        var ret="";
        this.person.skills.forEach( s =>{
            if(s.name === "Team worker")
                ret= s.score;
        })
        return ret;
    }

    increaseTrend(trend, percentage) {
        this.person.PersonTrends.forEach(t => {
            if(t.name === trend){
                const WL = this.getSkillWL();
                t.score = Math.round(t.score * percentage/100 * WL/100 + t.score);
            }
        })
    }


    increaseFeature(feature, percentage) {
        this.person.features.forEach(f => {
            if(f.name === feature){
                const WL = this.getSkillWL();
                f.score =  Math.round(f.score * percentage/100 * WL/100 + f.score);
            }
        })
    }

    getTrend(){ return(trends[Math.floor(Math.random() * trends.length)]) }

    adaptMarketTrends(marketTrends){
        marketTrends.forEach(t =>{
            this.marketTrends[t.name]=t.score;
        })
    }
    

    generateTrends(){
        var tmp=[];
        for(var i=0; i<settings.NumberOfTrendsPerPerson; i++)
            tmp.push(this.getTrend())

        tmp = helper.removeDuplicates(tmp);
        tmp.forEach( t => {
            this.person.PersonTrends.push({name:t, score:helper.generateRandomValue(settings.MinTrendScore, settings.MaxTrendScore)})
        })
    }

    generateFeatures(){
        var tmp=[];
        for(var i=0; i<settings.NumberOfFeaturesPerPerson; i++)
            tmp.push(this.getFeature())

        tmp = helper.removeDuplicates(tmp);
        tmp.forEach( feature => {
            this.person.features.push({name:feature, score:helper.generateRandomValue(settings.MinFeatureScore, settings.MaxFeatureScore)})
        })
    }
    
    generateSkills(){
        skills.forEach( skill => {
            this.person.skills.push({name:skill, score:helper.generateRandomValue(settings.MinSkillScore, settings.MaxSkillScore)})
        })
    }    

    generateCost(){
        var trendScore=0, featureScore=0, skillScore=0;
        var trendsComponent = (settings.MaxCost - settings.MinCost) * settings.TrendsComponentPercentage/100;
        var featureComponent = (settings.MaxCost - settings.MinCost) * settings.FeatureComponentPercentage/100;
        var BAComponent = (settings.MaxCost - settings.MinCost) * settings.BusinessAcumenPercentage/100;
        var WLComponent = (settings.MaxCost - settings.MinCost) * settings.WillingToLearnPercentage/100;
        var TWComponent = (settings.MaxCost - settings.MinCost) * settings.TeamWorkPercentage/100;
        

        this.person.PersonTrends.forEach( trend =>{
            trendScore+=trend.score*this.marketTrends[trend.name];
        })
        

        this.person.features.forEach( feature =>{
            featureScore+=feature.score;
        })
        
        this.person.skills.forEach ( skill => {
            skillScore+=  ( settings.MaxCost - settings.MinCost) * 
                            settings.skill[skill.name]/100 *
                            skill.score;
        })

        this.person.cost =Math.round(trendsComponent*trendScore/100000 + 
                        featureComponent*featureScore/500 +
                        skillScore/300 +
                        settings.MinCost);

    }

    resign(){
        const foundBetter = helper.generateRandomValue(settings.minSatisfactionLevel, settings.maxSatisfactionLevel);
        console.log("In Resignation foundBetter: ", foundBetter," this.person.satisfactionLevel : ",this.person.satisfactionLevel);
        if(foundBetter > this.person.satisfactionLevel){
            this.person.isEmployed=false;
            const resignationLetterTo = this.person.employedBy;
            this.person.employedBy="on the market";
            this.person.satisfactionLevel=settings.initSatisfactionLevel;
            return (resignationLetterTo);
        }
        return (false);
    }

    evalProposal(Company, Amount){
        if(this.person.employedBy === "on the market")      // Only people on the market can be hire
            this.person.proposals.push({Company:Company, Amount:Amount});
    }

    acceptProposal(){
        var bestAmount=this.person.cost * this.person.satisfactionLevel/settings.CostSatisfactionModifier;
        var bestCompany=null;
        var Accepted=false;

        this.person.proposals.forEach( proposal => {
            if(proposal.Amount > bestAmount){
                Accepted=true;
                bestAmount=proposal.Amount;
                bestCompany=proposal.Company;
            }
        })

        if(Accepted){
            this.person.employedBy=bestCompany;
            this.person.satisfactionLevel=settings.maxSatisfactionLevel;
            this.person.cost=bestAmount;
            this.person.isEmployed=true;
            this.person.proposals=[];
        }
        return(bestCompany);
    }
    
    generateID(){
        this.person.ID=crypto.createHash('md5').update(JSON.stringify(this.person)).digest("hex");
    }

    getValues(){ return(this.person) }
}

module.exports = Presales;