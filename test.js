var Opportunities = require('./lib/ClassOpportunities');
var Presales = require('./lib/ClassPresales');
var Market = require('./lib/ClassMarket');

//var oppy = new Opportunities(4, 4000, 4, 50);
//console.log("Oppy details:",oppy.getValues());
var market = new Market();
console.log("Market : ",market.getMarketTrends());
var presales = new Presales();
console.log("Presales : ",presales.getValues());