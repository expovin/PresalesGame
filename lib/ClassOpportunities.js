var randomstring = require("randomstring");
const Market = require('./ClassMarket');
var settings = require("./settings");

var oppy={};

class Opportunities extends Market {

    constructor(minValue, maxValue, TTC_MIN, TTC_MAX) {
        /** Constructor for the parent class. */

        oppy={
            ID:"",                          //  Random generated Oppy ID
            CompanyName :  "",              //
            teoricalValue: 0,               //  Random generated teorical opportunity value (between MIN - MAX)
            variationPerc : 0,
            realOppyValue:0,                //  Random generated real close value ()
            qualificationLevel:0,           //  Qualification level in the range 0-5
            TrendsRequired : [],            //  Ordered list of required skill                        
            TTC : 0,                        //  Time to compete (hidden values)
        }

        super();
        this.generateID();
        this.getCompanyName();
        this.generateTeoricalValue(minValue, maxValue);
        this.generateQualificationLevel();
        this.generateRealValue();
        this.generateTTC(TTC_MIN, TTC_MAX);
        this.getTrends();

    }
    
    generateID (){        
        oppy.ID=randomstring.generate(24);
    }

    getCompanyName(){
        oppy.CompanyName=super.getCompany().company;
    }

    generateTeoricalValue(min, max){
        oppy.teoricalValue=super.generateRandomValue(min, max, 1);
    }

    generateQualificationLevel(){
        oppy.qualificationLevel=super.generateRandomValue(  settings.MinQualificationLevel,
                                                            settings.MaxQualificationLevel,1,-1);
    }

    generateRealValue(){
        oppy.variationPerc=super.generateRandomValue(   settings.MinOppyValueVariationPercentage,
                                                        settings.MaxOppyValueVariationPercentage,
                                                        4,1,oppy.qualificationLevel);
                                                        
        oppy.realOppyValue=Math.round(oppy.teoricalValue*(1+oppy.variationPerc/100));
    }    

    generateTTC(min, max){
        oppy.TTC =super.generateRandomValue(min, max,0,-1);
    }

    getTrends(){
        oppy.TrendsRequired.push(super.getTrend());
        oppy.TrendsRequired.push(super.getTrend());
        oppy.TrendsRequired.push(super.getTrend());
    }
    
    getValues(){
        return(oppy);
    }


}

module.exports = Opportunities;