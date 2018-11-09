const helper = require('../lib/helper');

var count={};

function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}


module.exports = {
    
    
    chkGenericObj : function (data, field, modul, ID){
        count[modul] = helper.printOut(!isEmptyObject(data[field]),modul,ID," Check on the person "+field+" emptyness");
        count[modul] = helper.printOut(data[field],modul,ID," Check on the person "+field+" existence");
    
        /** Check single record */
    },
    
    chkGenericArray : function (data, field, minObj, maxObj, modul, ID){
        count[modul] = helper.printOut(((data[field].length >= minObj) && (data[field].length <= maxObj)),modul,ID," Check on the "+field+" ID existence");
    },
    
    chkGenericString : function (data, field, minLen, maxLen, modul, ID) {
        count[modul] = helper.printOut( !((data[field] === null) || (data[field] === undefined)), modul,ID," Check on the person "+field+" existence");
        count[modul] = helper.printOut( ((data[field].length >= minLen) && (data[field].length <= maxLen)), modul,ID," Check on the person "+field+" length. Current length "+data[field].length);
    },
    
    
    chkGenericNumber : function (data, field, min, max, modul, ID) {
        count[modul] = helper.printOut( !((data[field] === null) || (data[field] === undefined)), modul,ID," Check on the person "+field+" existence");
        count[modul] = helper.printOut(!isNaN(data[field]), modul,ID," Check on the person "+field+" level format number");
        count[modul] = helper.printOut( ((data[field] >= min) && (data[field] <= max)), modul,ID," Check on the person "+field+" level range");
    },
    
    chkFlag : function (data, field, modul, ID){
        count[modul] = helper.printOut( !((data[field] === null) || (data[field] === undefined)), modul,ID," Check on the person "+field+" existence");
        count[modul] = helper.printOut( ((data[field] !== false) || (data[field] !== true)), modul,ID," Check on the person "+field+" boolean type");
    },

    getResult : function() { return (count) }
    
}