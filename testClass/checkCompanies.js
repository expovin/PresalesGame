const chk = require('./checkingFunctions');

const modul = "COMPANIES"
var ID;

var count = {};
// This should work both there and elsewhere.

module.exports = {

    getData : function (companies){
        Object.keys(companies).forEach(function(companyID) {
            ID=companyID;          
            chk.chkGenericString(companies[companyID],"id",32,32, modul, ID);
            chk.chkGenericString(companies[companyID],"name",3,50, modul, ID);
            chk.chkGenericNumber(companies[companyID],"budget",0,9999, modul, ID);
            chk.chkGenericArray(companies[companyID],"proposal",0,20, modul, ID);
            chk.chkGenericNumber(companies[companyID],"brendRecognition",0,9999, modul, ID);
            chk.chkGenericNumber(companies[companyID],"totalHours",0,9999, modul, ID);
            chk.chkGenericArray(companies[companyID],"messages",0,20, modul, ID);
            chk.chkFlag(companies[companyID],"isBAMEnabled", modul, ID);
            chk.chkFlag(companies[companyID],"isTOPEnabled", modul, ID);
            chk.chkGenericNumber(companies[companyID],"recursivelyQuartelyCost",0,1000, modul, ID);
            chk.chkGenericArray(companies[companyID],"ProductBasicFeatures",3,10, modul, ID);
            chk.chkGenericArray(companies[companyID],"productFeatures",3,10, modul, ID);
            chk.chkGenericNumber(companies[companyID],"improvablePointsFeatures",0,5, modul, ID);
            chk.chkFlag(companies[companyID],"isBankrupt", modul, ID);
            chk.chkGenericObj(companies[companyID],"oppyCompeted" , modul, ID);
            chk.chkGenericArray(companies[companyID],"oppyNotCompeted" ,0,1000, modul, ID);
            chk.chkGenericArray(companies[companyID],"endQuarterRemainingHours",0,20, modul, ID);
            chk.chkGenericObj(companies[companyID],"oppyConstraint" , modul, ID);

        });

        return chk.getResult();
        
    }

    
}

