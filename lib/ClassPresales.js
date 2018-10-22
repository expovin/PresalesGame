var crypto = require('crypto');
const Market = require('./ClassMarket');
var settings = require("./settings");
var skills = require('./dictionary').skills;
var random = require('random-name');


class Presales extends Market {


    constructor() {

        super();
        /** Constructor for the parent class. */
        this.person = {
            ID:"",
            name : "",
            cost : 0,
            satisfactionLevel : settings.initSatisfactionLevel,
            timePerQuarter:settings.timePerQuarterPerPerson,
            employedBy:"on the market",
            trends : [],
            skills : [],
            features : [],
            proposals : []
        }

        
        this.generateName();
        this.generateTrends();
        this.generateSkills();
        this.generateFeatures();
        this.generateCost();
        this.generateID();

    }

    generateName (){        
        this.person.name=random();
    }

    getCost(){ return (this.person.cost) }

    getID(){
        return(this.person.ID);
    }

    generateTrends(){
        var tmp=[];
        for(var i=0; i<settings.NumberOfTrendsPerPerson; i++)
            tmp.push(super.getTrend())

        tmp = super.removeDuplicates(tmp);
        tmp.forEach( trend => {
            this.person.trends.push({name:trend, score:super.generateRandomValue(settings.MinTrendScore, settings.MaxTrendScore)})
        })
    }

    generateFeatures(){
        var tmp=[];
        for(var i=0; i<settings.NumberOfFeaturesPerPerson; i++)
            tmp.push(super.getFeature())

        tmp = super.removeDuplicates(tmp);
        tmp.forEach( feature => {
            this.person.features.push({name:feature, score:super.generateRandomValue(settings.MinFeatureScore, settings.MaxFeatureScore)})
        })
    }
    
    generateSkills(){
        skills.forEach( skill => {
            this.person.skills.push({name:skill, score:super.generateRandomValue(settings.MinSkillScore, settings.MaxSkillScore)})
        })
    }    

    generateCost(){
        var trendScore=0, featureScore=0, skillScore=0;
        var trendsComponent = (settings.MaxCost - settings.MinCost) * settings.TrendsComponentPercentage/100;
        var featureComponent = (settings.MaxCost - settings.MinCost) * settings.FeatureComponentPercentage/100;
        var BAComponent = (settings.MaxCost - settings.MinCost) * settings.BusinessAcumenPercentage/100;
        var WLComponent = (settings.MaxCost - settings.MinCost) * settings.WillingToLearnPercentage/100;
        var TWComponent = (settings.MaxCost - settings.MinCost) * settings.TeamWorkPercentage/100;
        var MarketTrends=super.getMarketTrendsObj();

        this.person.trends.forEach( trend =>{
            trendScore+=trend.score*MarketTrends[trend.name];
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
            this.person.proposals=[];
        }
        return(bestCompany);
    }
    
    generateID(){
        this.person.ID=crypto.createHash('md5').update(JSON.stringify(this.person)).digest("hex");
    }
    getValues(){
        return(this.person);
    }
}

module.exports = Presales;