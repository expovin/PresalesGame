var crypto = require('crypto');
const Market = require('./ClassMarket');
var settings = require("./settings");
var skills = require('./dictionary').skills;
var random_name = require('node-random-name');
var random = require('random-name')


var person;

class Presales extends Market {


    constructor() {
        /** Constructor for the parent class. */
        person = {
            ID:"",
            name : "",
            cost : 0,
            satisfactionLevel : settings.initSatisfactionLevel,
            timePerQuarter:240,
            employedBy:"initial",
            trends : [],
            skills : [],
            features : [],
            proposals : []
        }

        super();
        this.generateName();
        this.generateTrends();
        this.generateSkills();
        this.generateFeatures();
        this.generateCost();
        this.generateID();

    }

    generateName (){        
        person.name=random();
    }

    generateTrends(){
        var tmp=[];
        for(var i=0; i<settings.NumberOfTrendsPerPerson; i++)
            tmp.push(super.getTrend())

        tmp = super.removeDuplicates(tmp);
        tmp.forEach( trend => {
            person.trends.push({name:trend, score:super.generateRandomValue(settings.MinTrendScore, settings.MaxTrendScore)})
        })
    }

    generateFeatures(){
        var tmp=[];
        for(var i=0; i<settings.NumberOfFeaturesPerPerson; i++)
            tmp.push(super.getFeature())

        tmp = super.removeDuplicates(tmp);
        tmp.forEach( feature => {
            person.features.push({name:feature, score:super.generateRandomValue(settings.MinFeatureScore, settings.MaxFeatureScore)})
        })
    }
    
    generateSkills(){
        skills.forEach( skill => {
            person.skills.push({name:skill, score:super.generateRandomValue(settings.MinSkillScore, settings.MaxSkillScore)})
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

        person.trends.forEach( trend =>{
            trendScore+=trend.score*MarketTrends[trend.name];
        })
        

        person.features.forEach( feature =>{
            featureScore+=feature.score;
        })
        
        person.skills.forEach ( skill => {
            skillScore+=  ( settings.MaxCost - settings.MinCost) * 
                            settings.skill[skill.name]/100 *
                            skill.score;
        })

        person.cost =Math.round(trendsComponent*trendScore/100000 + 
                        featureComponent*featureScore/500 +
                        skillScore/300 +
                        settings.MinCost);

    }

    makeProposal(Company, Amount){
        person.proposals.push({Company:Company, Amount:Amount});
    }

    acceptProposal(){
        var bestAmount=person.cost * person.satisfactionLevel/settings.CostSatisfactionModifier;
        var bestCompany=null;
        var Accepted=false;

        person.proposals.forEach( proposal => {
            if(proposal.Amount > bestAmount){
                Accepted=true;
                bestAmount=proposal.Amount;
                bestCompany=proposal.Company;
            }
        })

        if(Accepted){
            person.employedBy=bestCompany;
            person.satisfactionLevel=settings.maxSatisfactionLevel;
            person.cost=bestAmount;
            person.proposals=[];
        }
    }
    
    generateID(){
        person.ID=crypto.createHash('md5').update(JSON.stringify(person)).digest("hex");
    }
    getValues(){
        return(person);
    }    
}

module.exports = Presales;