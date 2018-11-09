const chk = require('./checkingFunctions');

const modul = "PRESALES"
var ID;

var count = {};
// This should work both there and elsewhere.

module.exports = {

    getData : function (presales){
        Object.keys(presales).forEach(function(presalesID) {
            ID=presalesID;
            chk.chkGenericObj(presales[presalesID],"marketTrends" , modul, ID);
            chk.chkGenericString(presales[presalesID].person,"name",2,80, modul, ID);
            chk.chkGenericString(presales[presalesID].person,"ID",32,32, modul, ID);
            chk.chkGenericNumber(presales[presalesID].person,"cost",50,200, modul, ID);
            chk.chkGenericNumber(presales[presalesID].person,"satisfactionLevel",0,100, modul, ID);
            chk.chkGenericNumber(presales[presalesID].person,"timePerQuarter",0,240, modul, ID);
            chk.chkGenericString(presales[presalesID].person,"employedBy",2,150, modul, ID);
            chk.chkFlag(presales[presalesID].person,"isEmployed", modul, ID);
            chk.chkGenericArray(presales[presalesID].person,"PersonTrends",4,10, modul, ID);
            chk.chkGenericArray(presales[presalesID].person,"skills",3,3, modul, ID);
            chk.chkGenericArray(presales[presalesID].person,"features",2,8, modul, ID);
            chk.chkGenericArray(presales[presalesID].person,"proposals",0,100, modul, ID);
            chk.chkGenericArray(presales[presalesID].person,"courses",0,100, modul, ID);
            chk.chkGenericArray(presales[presalesID].person,"meritIncreases",0,20, modul, ID);
            chk.chkGenericArray(presales[presalesID].person,"retentionBonuses",0,20, modul, ID);
        });

        return chk.getResult();
        
    }

    
}

