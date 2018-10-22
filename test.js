

var Opportunities = require('./lib/ClassOpportunities');
var Presales = require('./lib/ClassPresales');
var Market = require('./lib/ClassMarket');

var oppy = [];
var market = new Market();
var presales = new Presales();

if(process.argv[2] === "oppy"){
    oppy.push(new Opportunities(4, 4000, 4, 50));
    oppy.push(new Opportunities(4, 4000, 4, 50));
    oppy.push(new Opportunities(4, 4000, 4, 50));
    oppy.push(new Opportunities(4, 4000, 4, 50));
    oppy.forEach(o => console.log(o.getValues()));
}


if(process.argv[2] === "market")    
    console.log("Market : ",market.getMarketTrends());

if(process.argv[2] === "presales")  {
    if(process.argv.length === 3)
        console.log("Presales : ",presales.getValues());
    else{
        presales.makeProposal(process.argv[3],process.argv[4]);
        console.log("Presales : ",presales.getValues());
    }
        
}

if(process.argv.length <3){
    console.log(" Usage : node test.js [object]");
    console.log("\t oppy: Get an opportunity");
    console.log("\t market: Get the market trends");
    console.log("\t presales: Get a presales person");
}
