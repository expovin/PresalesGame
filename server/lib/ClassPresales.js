var crypto = require('crypto');
const Market = require('./ClassMarket');
var settings = require("./settings");
var skills = require('./dictionary').skills;
var features = require('./dictionary').features;
var trends = require('./dictionary').trends;
var icons = require('./dictionary').icons;
const fs = require('fs');
var random = require('node-random-name');
const helper = require('./helper');

class Presales  {


    constructor(marketTrends) {

        this.marketTrends = {};
        /** Constructor for the parent class. */
        this.person = {
            ID:"",
            name : "",
            icon:"",
            cost : 0,
            satisfactionLevel : settings.initSatisfactionLevel,
            timePerQuarter:settings.timePerQuarterPerPerson,
            employedBy:"on the market",
            isEmployed:false,
            PersonTrends : [],
            skills : [],
            features : [],
            proposals : [],
            courses : [],
            meritIncreases : [],
            retentionBonuses:[]
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

    generateName (){ 
        this.person.icon=icons[Math.floor(Math.random() * icons.length)];
        let gender = this.person.icon[0];
        let name="";

        if(gender === 'M') 
            name=random({ random: Math.random, male: true}) 
        else
            name=random({ random: Math.random, female: true}) 

        this.person.name=name + " "+ random({ random: Math.random, last: true})
    }
    getCost(){ return (this.person.cost) }
    getID(){ return(this.person.ID) }
    getName(){ return(this.person.name) }
    getTimePerQuarter(){ return (this.person.timePerQuarter)}
    getFeature(){ return(features[Math.floor(Math.random() * trends.length)]) }    
    getCourses() { return this.person.courses }
    addCourse(course) { this.person.courses.push(course)}
    

    changeSatisfactionalLevel(p, a){
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
        let found=false;
        this.person.PersonTrends.forEach(t => {
            if(t.name === trend){
                found=true;
                const WL = this.getSkillWL();
                t.score = Math.round(t.score * percentage/100 * WL/100 + t.score);
            }
        })
        if(!found)
            this.person.PersonTrends.push({name:trend, score:10})
    }


    increaseFeature(feature, percentage) {
        let found=false;
        this.person.features.forEach(f => {
            if(f.name === feature){
                found=true;
                const WL = this.getSkillWL();
                f.score =  Math.round(f.score * percentage/100 * WL/100 + f.score);
            }
        })
        if(!found){
            this.person.features.push({name:feature, score:10})   
        }
            
    }

    getTrend(){ return(trends[Math.floor(Math.random() * trends.length)]) }
    getTrends() { return (this.person.PersonTrends)}

    getFeatures(){ return (this.person.features)}

    adaptMarketTrends(marketTrends){
        marketTrends.forEach(t =>{
            this.marketTrends[t.trendName]=t.marketTrendScore;
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
        if(foundBetter > this.person.satisfactionLevel)
            return (this.dismiss())
        
        return (false);
    }

    dismiss(){
        this.person.isEmployed=false;
        const resignationLetterTo = this.person.employedBy;
        this.person.employedBy="on the market";
        this.person.satisfactionLevel=settings.initSatisfactionLevel;
        return (resignationLetterTo);
    }

    evalProposal(Company, Amount){
        if(this.person.employedBy === "on the market")      // Only people on the market can be hire
            this.person.proposals.push({Company:Company, Amount:Amount});
    }

    removeProposal(Company){
        let indexToRemove=-1;
        this.person.proposals.forEach( (prop,idx) =>{
            if(prop.Company === Company)
                indexToRemove=idx;
        })
        if(indexToRemove !== -1){
            this.person.proposals.splice(indexToRemove,1);
        }
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

    meritIncrease(percentage, quarter){
        this.person.cost *= (1+ percentage/100);
        this.person.satisfactionLevel *= (1 + percentage * settings.meritIncreaseSatisfactionRatio / 100);
        this.person.meritIncreases.push({period:quarter, percentage:percentage});
    }
    getMeritIncreases(){ return this.person.meritIncreases }

    retentionBonus(money, quarter){
        this.person.satisfactionLevel *= (1 + money * settings.retentionBonusSatisfactionRatio / 100);
        this.person.retentionBonuses.push({period:quarter, money:money});
    }
    getRetentionBonus() { return this.person.retentionBonuses }
    
    generateID(){
        this.person.ID=crypto.createHash('md5').update(JSON.stringify(this.person)).digest("hex");
    }

    getValues(){ return(this.person) }

    getPersonDetailsData(gameId, quarter){
        return (["'"+gameId+"','"+quarter+"','"+this.person.ID+"','"+this.person.name+"',"+this.person.cost+","+this.person.satisfactionLevel]);
    }

    getPersonTrendsData(gameId, quarter){
        let personData=[];
        this.person.PersonTrends.forEach( (t,idx) =>{
            personData.push(["'"+gameId+"','"+quarter+"','"+this.person.ID+"','"+t.name+"',"+t.score]);
        })
        return (personData);
    }

    getPersonFeaturesData(gameId, quarter){
        let personData=[];
        this.person.features.forEach( (t,idx) =>{
            personData.push(["'"+gameId+"','"+quarter+"','"+this.person.ID+"','"+t.name+"',"+t.score]);
        })
        return (personData);
    }

    /*
    saveQuarterResultToFile(quarter){
        let fileName=this.person.ID+"_"+quarter+"_PersonDetails.csv";
        let personData="PersonId;Name;Cost;satisfactionLevel;quarter\r\n";
        personData += this.person.ID+";"+this.person.name+";"+this.person.cost+";"+this.person.satisfactionLevel+";"+quarter+"\r\n"
        fs.writeFile(settings.quarterLogFilePath+fileName,personData, function(err){
            if(err){
                console.log("Error while writing the file ",fileName, " : ", err);
                return (false);
            }
            //console.log("File ",fileName," succesfully saved");
            return (true);
        })           
        this.savePersonTrends(quarter);
        this.saveFeatures(quarter);
    }

    savePersonTrends(quarter){
        let fileName=this.person.ID+"_"+quarter+"_PersonTrends.csv";
        let personData="PersonId;quarter;TrendName;TrendScore\r\n";
        this.person.PersonTrends.forEach( (t,idx) =>{
            personData += this.person.ID+";"+quarter+";"+t.name+";"+t.score+"\r\n";

            if(this.person.PersonTrends.length === idx+1){
                fs.writeFile(settings.quarterLogFilePath+fileName,personData, function(err){
                    if(err){
                        console.log("Error while writing the file ",fileName, " : ", err);
                        return (false);
                    }
                    //console.log("File ",fileName," succesfully saved");
                    return (true);
                })   
            }
        })
    }

    saveFeatures(quarter){
        let fileName=this.person.ID+"_"+quarter+"_PersonFeatures.csv";
        let personData="PersonId;quarter;FeatureName;FeatureScore\r\n";
        this.person.features.forEach( (t,idx) =>{
            personData += this.person.ID+";"+quarter+";"+t.name+";"+t.score+"\r\n";

            if(this.person.features.length === idx+1){
                fs.writeFile(settings.quarterLogFilePath+fileName,personData, function(err){
                    if(err){
                        console.log("Error while writing the file ",fileName, " : ", err);
                        return (false);
                    }
                    //console.log("File ",fileName," succesfully saved");
                    return (true);
                })   
            }
        })
    }
    */
}

module.exports = Presales;