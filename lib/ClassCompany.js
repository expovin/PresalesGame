var settings = require("./settings");
var crypto = require('crypto');
//const Market = require('./ClassMarket');
const helper = require('./helper');

class Company {
    constructor(name, ProductBasicFeatures){
        this.id="";
        this.name=name;
        this.budget=settings.companyInitialBudget,
        this.presalesTeam=[];
        this.proposal=[];
        this.brendRecognition=settings.companyInitialbrendRecognition;
        this.totalHours=0;
        this.messages=[];
        this.isBAMEnabled=false;
        this.isTOPEnabled=false;
        this.recursivelyQuartelyCost=settings.initRecursuveQuartelyCost;
        this.ProductBasicFeatures=ProductBasicFeatures;
        this.productFeatures=[];
        this.improvablePointsFeatures=settings.DMaxImprovableFeaturePerQuarter;

        this.generateID();
        this.generateProductFeatures();
    }

    generateID(){ this.id=crypto.createHash('md5').update(JSON.stringify(this)).digest("hex"); }
    getID() { return (this.id)}
    getName(){ return(this.name) }
    sendMessage(msg){ this.messages.push(msg) }
    getMessage(){ return this.messages.pop() }
    deleteMessages() { this.messages=[]}
    getProductFeatures() { return this.productFeatures; }
    
    improveFeature(featureName, points){
        if(this.improvablePointsFeatures - points < 0)
            return (false)

        this.productFeatures.forEach( f => {
            if(f.name === featureName)
              f.score +=points;
        })
        this.improvablePointsFeatures -=points;
        return (true)
    }

    enableBAM(){
        if(this.totalHours - settings.BAMinitialHourCost < 0)
            return (false)

        this.isBAMEnabled=true;
        this.totalHours -=settings.BAMinitialHourCost;
        return (true)
    }
    disableBAM() { this.isBAMEnabled=false}
    getBAMStatus() { return this.isBAMEnabled }

    enableTOP(){
        if(this.totalHours - settings.TOPinitialHourCost < 0)
            return (false)

        this.isTOPEnabled=true;
        this.totalHours-=settings.TOPinitialHourCost;
        return (true)
    }
    disableTOP(){ this.isTOPEnabled=false}
    getTOPStatus() { return this.isTOPEnabled }

    hirePerson(person){
        if (typeof person !== 'undefined' && person !== null) {
            this.presalesTeam.push(person.getID());
            this.budget-=person.getCost();
            this.totalHours +=person.getTimePerQuarter();//settings.timePerQuarterPerPerson;
        }
        this.proposal=[];
    }

    dismissPerson(person){
        const index = this.presalesTeam.indexOf(person.getID());
        if(index > -1)
            this.presalesTeam.splice(index, 1);
        
            

        this.budget+=person.getCost();
        this.totalHours -=person.getTimePerQuarter();//settings.timePerQuarterPerPerson;
    }
    

    makeProposal(personID){ this.proposal.push(personID); }
    getProposal() { return this.proposal}

    marketingCampain(cost, hours){
        this.budget -=cost;
        this.totalHours -=hours;


        this.brendRecognition = cost / settings.campainCostBrandRatio   + 
        Math.floor(cost / (settings.campainCostHourRatio * hours)) * settings.campainOverflow +     // Overflow Cost
        Math.floor((settings.campainCostHourRatio * hours) / cost) * settings.campainOverflow;      // Overflow Hours
        
    }

    payHours(hours) { this.totalHours-=hours}
    payMoney(money) {this.budget-=money }

    generateProductFeatures(){
        this.ProductBasicFeatures.forEach( f => {
            var newScore = f.score + Math.round(f.score * helper.generateRandomValue(settings.featureMinChange, settings.featureMaxChange)/100);
            this.productFeatures.push({ name : f.name, score : newScore})
        })
    }

    getValues(){ return(this) }
    
}

module.exports = Company;