var randomstring = require("randomstring");
const Market = require('./ClassMarket');
var settings = require("./settings");
const helper = require('./helper');
var customers = require('./dictionary').companies;
var trends = require('./dictionary').trends;
var features = require('./dictionary').features;

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
        this.features=[];
        this.associatedCost=0;                 
        this.TTC=0;                        //  Time to compete (hidden values)

        this.pretenders=[];
        this.winner=null;
        this.status='OPEN';

        this.generateID();
        this.getCompanyName();
        this.generateTeoricalValue(minValue, maxValue);
        this.generateQualificationLevel();
        this.generateRealValue();
        this.generateTTC(TTC_MIN, TTC_MAX);
        this.generateTrends();
        this.generateAssociatedCost();
        this.generateFeatures();
    }

    /** Auto generation Opportunity attributes */
    generateID (){ this.ID=randomstring.generate(24) }
    getCompanyName(){ this.CompanyName=this.getCustomer().company }
    generateTeoricalValue(min, max){ this.teoricalValue=helper.generateRandomValue(min, max, 1)}
    generateAssociatedCost(){ this.associatedCost = helper.generateRandomValue(settings.MinOpportunityCost, settings.MaxOpportunityCost)}
    generateQualificationLevel(){
        this.qualificationLevel=helper.generateRandomValue(  settings.MinQualificationLevel,
                                                            settings.MaxQualificationLevel,1,-1);
    }
    generateRealValue(){
        this.variationPerc=helper.generateRandomValue(   settings.MinOppyValueVariationPercentage,
                                                        settings.MaxOppyValueVariationPercentage,
                                                        4,1,this.qualificationLevel);                                           
        this.realOppyValue=Math.round(this.teoricalValue*(1+this.variationPerc/100));
        if(isNaN(this.variationPerc))
            this.variationPerc=0;
    }    
    generateTTC(min, max){this.TTC =helper.generateRandomValue(min, max,0,-1)}
    generateTrends(){
        this.TrendsRequired.push(trends[Math.floor(Math.random() * trends.length)]);
        this.TrendsRequired.push(trends[Math.floor(Math.random() * trends.length)]);
        this.TrendsRequired.push(trends[Math.floor(Math.random() * trends.length)]);
    }
    generateFeatures(){
        var tmp=[];
        for(var i=0; i<settings.NumberOfFeaturesPerOppy; i++)
            tmp.push(this.peekFeature())

        tmp = helper.removeDuplicates(tmp);
        tmp.forEach( feature => {
            this.features.push({name:feature, score:helper.generateRandomValue(settings.MinFeatureScore, settings.MaxFeatureScore)})
        })
    }
    /********************************************************************* */
    getID(){ return this.ID }
    peekFeature(){ return(features[Math.floor(Math.random() * trends.length)]) } 
    getValue() { return (this.teoricalValue)}
    getQualification() { return (this.qualificationLevel)}
    getTrends(){ return (this.TrendsRequired)}
    getFeatures() { return (this.features)}
    getAssociatedCost(){ return this.associatedCost}
    getTTC(){ return this.TTC}
    getRealValue() { return this.realOppyValue }
    close() { this.status='CLOSE'}
    isOpen() { return (this.status === 'OPEN')}
    setWinner(vendor) { this.winner=vendor}
    getWinner() { return this.winner}

    changeCompanyName(newName){this.CompanyName=newName}

    getCustomer(){
        return(customers[helper.generateRandomValue(0,customers.length)]);
    }

    getValues(){
        return(this);
    }

    addPretender(vendor) { this.pretenders.push(vendor)} 

}

module.exports = Opportunities;