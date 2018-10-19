var settings = require("./settings");

var company={};

class Company {
    constructor(name){

        company = {
            name:"",
            initialBudget : settings.companyInitialBudget,
            presalesTeam : {}
        }

        company.name=this.name;
    }

    hirePerson(personID, proposal){

    }
    
}

module.exports = Company;