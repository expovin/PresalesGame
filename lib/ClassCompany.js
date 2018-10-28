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
    

    resetTotalHours(){
        this.totalHours = settings.timePerQuarterPerPerson * this.presalesTeam.length;
    }

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
            if(this.budget - person.getCost() < 0)
                return (false)

            this.presalesTeam.push(person.getID());
            this.budget-=person.getCost();
            this.totalHours +=person.getTimePerQuarter();
        }
        this.proposal=[];
        return (true);
    }

    retentionBonus(money){
        if(this.budget - money < 0)
            return (false);

        this.budget -= money;
        return (true);
    }

    dismissPerson(person){
        const index = this.presalesTeam.indexOf(person.getID());
        if(index > -1)
            this.presalesTeam.splice(index, 1);
        
            

        this.budget+=person.getCost();
        this.totalHours -=person.getTimePerQuarter();
    }
    

    makeProposal(personID, cost){
        if(this.budget - cost < 0)
            return (false);

        this.proposal.push(personID); 
        return (true);
    }

    getProposal() { return this.proposal}

    marketingCampain(cost, hours){

        if((this.budget - cost < 0) || (this.totalHours - hours < 0))
            return (false)

        this.budget -=cost;
        this.totalHours -=hours;


        this.brendRecognition = cost / settings.campainCostBrandRatio   + 
        Math.floor(cost / (settings.campainCostHourRatio * hours)) * settings.campainOverflow +     // Overflow Cost
        Math.floor((settings.campainCostHourRatio * hours) / cost) * settings.campainOverflow;      // Overflow Hours
        
        return (true)
    }

    payHours(hours) { 
        if(this.totalHours - hours < 0)
            return (false);

        this.totalHours-=hours
        return (true);
    }

    payMoney(money) {
        console.log("Budget pre operation : ", this.budget, "Money to pay : ",money);
        if(this.budget - money < 0)
            return (false);

        this.budget-=money 
        console.log("Budget after operation : ", this.budget);
        return (true);
    }

    generateProductFeatures(){
        this.ProductBasicFeatures.forEach( f => {
            var newScore = f.score + Math.round(f.score * helper.generateRandomValue(settings.featureMinChange, settings.featureMaxChange)/100);
            this.productFeatures.push({ name : f.name, score : newScore})
        })
    }

    getValues(){ return(this) }
    
}

module.exports = Company;