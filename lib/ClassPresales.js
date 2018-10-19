const Market = require('./ClassMarket');
var settings = require("./settings");
var random_name = require('node-random-name');


var person;

class Presales extends Market {


    constructor() {
        /** Constructor for the parent class. */
        person = {
            name : "",
            marketPrice : 0,
            satisfactionLevel : 100,
            timePerQuarter:240,
            skills : []
        }

        super();
        this.generateName();
        this.getSkills();


    }

    generateName (){        
        person.name=random_name();
        console.log("Name : ",this.name);
    }

    getSkills(){
        var tmp=[];
        for(var i=0; i<settings.NumberOfSkillPerPerson; i++)
            tmp.push(super.getTrend())

        tmp = super.removeDuplicates(tmp);
        tmp.forEach( skill => {
            person.skills.push({name:skill, score:super.generateRandomValue(settings.MinTrendScore, settings.MaxTrendScore)})
        })
    }
    
    
    
    getValues(){
        return(person);
    }    
}

module.exports = Presales;