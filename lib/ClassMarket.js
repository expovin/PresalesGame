'use strict'

/** This is the parent class Market. This class define the heuristic algorithms
 *  used by the child class Presales and Opportunities.
  */
var gaussian = require('gaussian');
var settings = require("./settings");
var trends = require('./dictionary').trends;
var features = require('./dictionary').features;
var companies = require('./dictionary').companies;


class Market {
    

    constructor() {
        this.MarketTrends=[];
        /** Constructor for the parent class. */
        this.setMarketTrends();
        //this.getCustomers();

        this.Pople={};
        this.Companies={};
        this.Opportunities=[];
        //this.Customers={};
    }

    addPerson(person) { this.Pople[person.ID]=person}
    setPeople(people){ this.Pople=people}
    getPeople() {return this.Pople }
    getPerson(personID) { return this.Pople[personID]}

    addCompany(company){ this.Companies[company.id]=company}
    setCompanies(companies){ this.Companies=companies}
    getCompanies(){ return this.Companies }
    getCompany(companyID) {return this.Companies[companyID]}
    deleteCompanies(){ this.Companies={}}

    /** Distribuzione Gaussiana e non uniforme 
     *  Type parameter define the type ofgeneration
     *      0 : Uniform distribution (default)
     *      1 : Non linear (Lower value more likely)
     *      2 : Non linear (Higher value more likely)
     *      3 : Normal (Gaussian) distribution
     * 
     *  Round specify the number of decimal digit (default 0)
     *  the number need to be negative:
     *     -1 : One digital number
     *     -2 : Two digital number 
     *      etc...
     * */    
    generateRandomValue(min, max, type=0, round=0,likelihood=1){

        var nonce;
        switch(type){
            case 0: nonce=Math.random() * (max - min) + min; break;
            case 1 :
                do{
                    var first = Math.random() * (max - min) + min;
                    var second = Math.random() * (max - min) + min;
                } while(first > second)
                nonce=first;
                break;

            case 2:
                do{
                    var first = Math.random() * (max - min) + min;
                    var second = Math.random() * (max - min) + min;
                } while(second > first)
                nonce=first;
                break;  
                
            case 3:
                var distribution = gaussian(min, max);
                nonce = distribution.pdf(Math.random());
                break;

            case 4:
                nonce = Math.pow(Math.random(),settings.NonLinearRandomCurves[likelihood]) * (max - min) + min;
                break;
        }
        return(Math.round(nonce,round));
    }

    setMarketTrends(){
        trends.forEach( trend =>{
            this.MarketTrends.push({name : trend, score : this.generateRandomValue(settings.MinTrendScore, settings.MaxTrendScore)})
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

    getTrend(){
        return(trends[Math.floor(Math.random() * trends.length)]);
    }

    getFeature(){
        return(features[Math.floor(Math.random() * trends.length)]);
    }    
/*
    getCustomers(){
        return(Customers[this.generateRandomValue(0,companies.length)]);
    }
*/
    removeDuplicates(array){
        return( array.filter(function(elem, pos) {
            return array.indexOf(elem) == pos;
        }))
    }
}


module.exports = Market;