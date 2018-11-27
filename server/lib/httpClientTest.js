
const httpClient = require('./httpClientModules');

var peopleToHire={};
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
        /*
        httpClient.genMarket()
        .then( (res) => {
            printMessage("["+res.code+"] Market Trends has been generated. ==>  ["+res.body.result+"] "+res.body.message);
            return (httpClient.genPresales())
        })  
        */

        httpClient.genPresales()
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
            return (httpClient.getPresales());
        })
        .then( res => {
            printMessage("["+res.code+"] Got all Presales list ");
            var Promises=[];
            companies.forEach( company =>{
                peopleToHire[company]=[];
                // Extract 5 random people
                for(var i=0; i<5; i++){
                    let personNum = Math.floor(Math.random() * 149);
                    let personId = Object.keys(res.body.data)[personNum];
                    peopleToHire[company].push(personId);
                    Promises.push(httpClient.makeProposal(company, personId))
                }
                
            })
            return(Promise.all(Promises).then( (values) => {
                values.forEach(val =>{
                    printMessage("["+val.code+"] " +val.body.message);
                })
            }))
        })
        .then( () =>{ 
            console.log(" ---> All proposal completed. Run the evaluation.<---");
            return( httpClient.evaluate()) 
        })
        .then( res => {
            printMessage("["+res.code+"] Evaluation completed! ");
            var Promises=[];
            companies.forEach( company =>{
                peopleToHire[company].forEach( personId =>{
                    Promises.push(httpClient.confirmPerson(company, personId))
                }) 
            })
            return (Promise.all(Promises) .then( (values) => {
                values.forEach(val =>{
                    printMessage("["+val.code+"] " +val.body.message);
                })
            } ))
        })   
        .then( () =>{
            console.log(" ---> All pople hired. Run get campain<---");
            var Promises=[];
            companies.forEach( company =>{
                Promises.push(httpClient.getCampain(company))
            })
            return (Promise.all(Promises).then( (values) => {
                values.forEach(val =>{
                    printMessage("["+val.code+"] " +val.body.message);
                })
            } ))
        })
        .then( () =>{
            console.log(" ---> All campain run. Calculate the BR share <---");
            return ( httpClient.BRShare())
        })
        .then( () =>{
            console.log(" --> Market campain run for all companies");
            return (httpClient.nextPeriod())
        })


/*
        .then( res => {

            printMessage("["+res.code+"] Got all Presales list ");
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
        */

        .then( res => {
            console.log("End of simulation");
        })  
        /** Evaluate Proposal */
        /** Make Campain */

        .catch( error => printMessage(error))
    }

    printMessage("START HTTP Cliet Test");
    preNextPeriod();