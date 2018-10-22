var settings = require("./settings");

var company={};

class Company {
    constructor(name){

        this.name=name;
        this.initialBudget=settings.companyInitialBudget,
        this.presalesTeam=[];
        this.proposal=[];

    }

    getName(){
        return(this.name);
    }

    hirePerson(presalesID){
        if (typeof presalesID !== 'undefined' && presalesID !== null) {
            presalesID.forEach( p => this.presalesTeam.push(p));
        }
        this.proposal=[];

    }

    makeProposal(personID){
        this.proposal.push(personID);
    }

    getValues(){
        return(this);
    }
    
}

module.exports = Company;