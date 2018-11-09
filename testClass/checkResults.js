const presales = require('./checkPresales');
const companies = require('./checkCompanies');
const helper = require('../lib/helper');

var totale=[];

module.exports = {
    chkPresales : function (data){
        presales.getData(data);
        helper.resetCount();
    },

    chkCompanies : function (data){
        totale.push(companies.getData(data));
        helper.resetCount();
    },

    getOutcome : function() { return totale }
}


