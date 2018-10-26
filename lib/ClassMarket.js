'use strict'

/** This is the parent class Market. This class define the heuristic algorithms
 *  used by the child class Presales and Opportunities.
  */
var gaussian = require('gaussian');
var settings = require("./settings");
const helper = require("./helper");
var trends = require('./dictionary').trends;
var features = require('./dictionary').features;



class Market {
    

    constructor() {
        this.MarketTrends=[];
        /** Constructor for the parent class. */
        this.setMarketTrends();
        //this.getCustomers();

        this.People={};
        this.Companies={};
        this.Opportunities=[];
        //this.Customers={};
    }

    addPerson(person) { this.People[person.getID()]=person}
    setPeople(people){ this.People=people}

    /** Return the list of people. The parameter type should be:
     *  mull : Return all presales people in the array
     *  true : Return only the employed presales person
     *  false: Return only the unenployed presales person
     */
    getPeople(employedStatus) {
        if(employedStatus === undefined)
            return this.People
        else{
            var results={};
            var _this = this;
            var isEmp=false;
            if(employedStatus === "true")
                isEmp=true;
            Object.keys(this.People).forEach(function(PresalesID) {
                var Person = _this.People[PresalesID];
                if( Person.getEmployedStatus() === isEmp )
                    results[PresalesID]=Person;
            });
            return results;
        }
    }

    getPerson(personID) { return this.People[personID]}
    deletePeople(){ this.People={} }

    addCompany(company){ this.Companies[company.id]=company}
    setCompanies(companies){ this.Companies=companies}
    getCompanies(){ return this.Companies }
    getCompany(companyID) {return this.Companies[companyID]}
    deleteCompanies(){ this.Companies={}}

    addOpportunity(oppy) { this.Opportunities.push(oppy)}
    getOpportunities() { return(this.Opportunities)}
    deleteOpportunities() { this.Opportunities={}}

    setMarketTrends(){
        trends.forEach( trend =>{
            this.MarketTrends.push({name : trend, score : helper.generateRandomValue(settings.MinTrendScore, settings.MaxTrendScore)})
        })
    }

    slightlyChangeMarketTrends(){

    }

    getMarketTrends(){
        return(this.MarketTrends);
    }

    getMarketTrendsObj(){
        var m={};
        this.MarketTrends.forEach( trend =>{
            m[trend.name]=trend.score;
        })
        return(m);
    }

    getFeature(){
        return(features[Math.floor(Math.random() * trends.length)]);
    }    

    removeDuplicates(array){
        return( array.filter(function(elem, pos) {
            return array.indexOf(elem) == pos;
        }))
    }
}


module.exports = Market;