
const httpClient = require('./httpClientModules');

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
        var companies=[];
        httpClient.genMarket()
        .then( (res) => {
            console.log(res);
            printMessage("["+res.code+"] Market Trends has been generated. ==>  ["+res.body.result+"] "+res.body.message);
            return (httpClient.genPresales())
        })      
        .then( (res) =>{
            printMessage("["+res.code+"] Generating Presales people. ==> ["+res.body.result+"] "+res.body.message);
            return (httpClient.genOpportunities())
        })
        .then( (res) => {
            printMessage("["+res.code+"] Opportunities has been generated. ==> ["+res.body.result+"] "+res.body.message);
             return (httpClient.genCompany("Qlik"))
        })
        .then( (res) => {
            printMessage("["+res.code+"] Company Qlik has been generated. ==> ["+res.body.result+"] "+res.body.message);
            companies.push(res.body.id);
             return httpClient.genCompany("Microsoft")
        })   
        .then( (res) => {
            printMessage("["+res.code+"] Company Microsoft has been generated. ==> ["+res.body.result+"] "+res.body.message);
            companies.push(res.body.id);
             return httpClient.genCompany("Amazon")
        })                   
        .then( (res) => {
            printMessage("["+res.code+"] Company Amazon has been generated. ==> ["+res.body.result+"] "+res.body.message);
            companies.push(res.body.id);
             return httpClient.genCompany("Tableau")
        }) 
        .then( res =>{
            printMessage("["+res.code+"] Company Tableau has been generated. ==> ["+res.body.result+"] "+res.body.message);
            companies.push(res.body.id);
            return httpClient.getPresales();
        })
        .then( res => {
            /** res undefined here  */
            //printMessage("["+res.code+"] Evaluation Completed ");
            var Promises=[];
            companies.forEach( company =>{
                Promises.push(httpClient.marketCampain(company))
            })
            Promise.all(Promises) .then( (values) => {
                values.forEach(val =>{
                    printMessage("["+val.code+"] Market Campain Completed ==> ["+val.body.result+"] "+val.body.message);
                })
                return( true) 
            } )
        })
        //.catch( error => printMessage(error))

        .then( () => {
            var Promises=[];
            companies.forEach( company =>{
                Promises.push(httpClient.toggleFilterValue(company))
            })
            Promise.all(Promises) .then( (values) => {
                values.forEach( val =>{
                    printMessage("["+val.code+"] Toggle enabled ==> ["+val.body.result+"] "+val.body.message);
                })
                return( true) 
            } )
        })
        .then( res =>{
            //printMessage("["+res.code+"] Filter value toggled Completed ");
            var Promises=[];
            companies.forEach( company =>{
                Promises.push(httpClient.setFilterValue(company))
            })
            Promise.all(Promises) .then( (values) => {
                values.forEach(val =>{
                    printMessage("["+val.code+"] Filter set ==> ["+val.body.result+"] "+val.body.message);
                })
                return( true) 
            } )
        })      
        .then( res => {
            //printMessage("["+res.code+"] Value set Completed ");
        })  
        /** Evaluate Proposal */
        /** Make Campain */

        .catch( error => printMessage(error))
    }

    printMessage("START HTTP Cliet Test");
    preNextPeriod();