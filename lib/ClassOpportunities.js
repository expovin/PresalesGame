var randomstring = require("randomstring");
const Market = require('./ClassMarket');
var settings = require("./settings");
const helper = require('./helper');
var customers = require('./dictionary').companies;
var trends = require('./dictionary').trends;

class Opportunities  {

    constructor(minValue, maxValue, TTC_MIN, TTC_MAX) {
        /** Constructor for the parent class. */

        //super();

        this.ID="";                          //  Random generated Oppy ID
        this.CompanyName="";              //
        this.teoricalValue=0;               //  Random generated teorical opportunity value (between MIN - MAX)
        this.variationPerc=0;
        this.realOppyValue=0;                //  Random generated real close value ()
        this.qualificationLevel=0;           //  Qualification level in the range 0-5
        this.TrendsRequired=[];            //  Ordered list of required skill       
        this.associatedCost=0;                 
        this.TTC=0;                        //  Time to compete (hidden values)

        this.generateID();
        this.getCompanyName();
        this.generateTeoricalValue(minValue, maxValue);
        this.generateQualificationLevel();
        this.generateRealValue();
        this.generateTTC(TTC_MIN, TTC_MAX);
        this.getTrends();
        this.generateAssociatedCost();
    }

    
    generateID (){        
        this.ID=randomstring.generate(24);
    }

    getCompanyName(){
        this.CompanyName=this.getCustomer().company;
    }

    generateTeoricalValue(min, max){
        this.teoricalValue=helper.generateRandomValue(min, max, 1);
    }

    generateAssociatedCost(){
        this.associatedCost = helper.generateRandomValue(settings.MinOpportunityCost, settings.MaxOpportunityCost);
    }

    generateQualificationLevel(){
        this.qualificationLevel=helper.generateRandomValue(  settings.MinQualificationLevel,
                                                            settings.MaxQualificationLevel,1,-1);
    }

    generateRealValue(){
        this.variationPerc=helper.generateRandomValue(   settings.MinOppyValueVariationPercentage,
                                                        settings.MaxOppyValueVariationPercentage,
                                                        4,1,this.qualificationLevel);
                                                        
        this.realOppyValue=Math.round(this.teoricalValue*(1+this.variationPerc/100));
    }    

    generateTTC(min, max){
        this.TTC =helper.generateRandomValue(min, max,0,-1);
    }

    getTrends(){
        this.TrendsRequired.push(trends[Math.floor(Math.random() * trends.length)]);
        this.TrendsRequired.push(trends[Math.floor(Math.random() * trends.length)]);
        this.TrendsRequired.push(trends[Math.floor(Math.random() * trends.length)]);
    }

    changeCompanyName(newName){
        this.CompanyName=newName;
    }

    getCustomer(){
        return(customers[helper.generateRandomValue(0,customers.length)]);
    }

    getValues(){
        return(this);
    }


}

module.exports = Opportunities;