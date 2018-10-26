var settings = require("./settings");
var crypto = require('crypto');
const Market = require('./ClassMarket');

class Company {
    constructor(name){
        this.id="";
        this.name=name;
        this.budget=settings.companyInitialBudget,
        this.presalesTeam=[];
        this.proposal=[];
        this.brendRecognition=settings.companyInitialbrendRecognition;
        this.totalHours=0;
        this.messages=[]

        this.generateID();
    }

    generateID(){ this.id=crypto.createHash('md5').update(JSON.stringify(this)).digest("hex"); }
    getID() { return (this.id)}
    getName(){ return(this.name) }
    sendMessage(msg){ this.messages.push(msg) }
    getMessage(){ return this.messages.pop() }
    deleteMessages() { this.messages=[]}

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
            this.presalesTeam.indexOf(person.getID()).splice(index, 1);

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

    getValues(){ return(this) }
    
}

module.exports = Company;