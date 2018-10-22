var randomstring = require("randomstring");
const Market = require('./ClassMarket');
var settings = require("./settings");


class Opportunities extends Market {

    constructor(minValue, maxValue, TTC_MIN, TTC_MAX) {
        /** Constructor for the parent class. */

        super();

        this.ID="";                          //  Random generated Oppy ID
        this.CompanyName="";              //
        this.teoricalValue=0;               //  Random generated teorical opportunity value (between MIN - MAX)
        this.variationPerc=0;
        this.realOppyValue=0;                //  Random generated real close value ()
        this.qualificationLevel=0;           //  Qualification level in the range 0-5
        this.TrendsRequired=[];            //  Ordered list of required skill                        
        this.TTC=0;                        //  Time to compete (hidden values)

        this.generateID();
        this.getCompanyName();
        this.generateTeoricalValue(minValue, maxValue);
        this.generateQualificationLevel();
        this.generateRealValue();
        this.generateTTC(TTC_MIN, TTC_MAX);
        this.getTrends();
    }

    
    generateID (){        
        this.ID=randomstring.generate(24);
    }

    getCompanyName(){
        this.CompanyName=super.getCompany().company;
    }

    generateTeoricalValue(min, max){
        this.teoricalValue=super.generateRandomValue(min, max, 1);
    }

    generateQualificationLevel(){
        this.qualificationLevel=super.generateRandomValue(  settings.MinQualificationLevel,
                                                            settings.MaxQualificationLevel,1,-1);
    }

    generateRealValue(){
        this.variationPerc=super.generateRandomValue(   settings.MinOppyValueVariationPercentage,
                                                        settings.MaxOppyValueVariationPercentage,
                                                        4,1,this.qualificationLevel);
                                                        
        this.realOppyValue=Math.round(this.teoricalValue*(1+this.variationPerc/100));
    }    

    generateTTC(min, max){
        this.TTC =super.generateRandomValue(min, max,0,-1);
    }

    getTrends(){
        this.TrendsRequired.push(super.getTrend());
        this.TrendsRequired.push(super.getTrend());
        this.TrendsRequired.push(super.getTrend());
    }

    changeCompanyName(newName){
        this.CompanyName=newName;
    }
    
    getValues(){
        return(this);
    }


}

module.exports = Opportunities;