
const httpClient = require('./httpClientModules');
const chkData = require('../testClass/checkResults');

    /** Call REST endpoint to set up test scenarios */

    function printMessage(msg){
        let timestamp=new Date(Date.now());
        datevalues = [
            timestamp.getDate(),
            timestamp.getMonth()+1,
            timestamp.getFullYear(),
            timestamp.getHours(),
            timestamp.getMinutes(),
            timestamp.getSeconds(),
            timestamp.getMilliseconds()
         ];        
        console.log("["+datevalues+"] - "+msg);
    }

    function preNextPeriod(){
        httpClient.getPresales()    
        .then( res =>{
            chkData.chkPresales(res.body.data);
            return( httpClient.getCompanies());
        })       
        .then( companies => {
            chkData.chkCompanies(companies.body.data);
        }) 

        .then ( () =>{
            console.log(chkData.getOutcome());
        })
        /** Evaluate Proposal */
        /** Make Campain */

        .catch( error => printMessage(error))
    }

    printMessage("START HTTP Cliet Test");
    preNextPeriod();