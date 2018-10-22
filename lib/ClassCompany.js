var settings = require("./settings");

var company={};

class Company {
    constructor(name){

        this.name=name;
        this.budget=settings.companyInitialBudget,
        this.presalesTeam=[];
        this.proposal=[];
        this.brendRecognition=settings.companyInitialbrendRecognition;
        this.totalHours=0;

    }

    getName(){
        return(this.name);
    }

    hirePerson(presalesID){
        if (typeof presalesID !== 'undefined' && presalesID !== null) {
            presalesID.forEach( p =>{
                this.presalesTeam.push(p);
                this.budget-=p.getCost();
                this.totalHours +=settings.timePerQuarterPerPerson;
            })
        }
        this.proposal=[];
    }

    makeProposal(personID){
        this.proposal.push(personID);
    }

    marketingCampain(cost, hours){
        this.budget -=cost;
        this.totalHours -=hours;


        this.brendRecognition = cost / settings.campainCostBrandRatio   + 
        Math.floor(cost / (settings.campainCostHourRatio * hours)) * settings.campainOverflow +     // Overflow Cost
        Math.floor((settings.campainCostHourRatio * hours) / cost) * settings.campainOverflow;      // Overflow Hours
        
    }

    getValues(){
        return(this);
    }
    
}

module.exports = Company;