var prompt = require('prompt');
var prettyjson = require('prettyjson');
var Company = require('./lib/ClassCompany');
var Opportunities = require('./lib/ClassOpportunities');
var Presales = require('./lib/ClassPresales');
var Market = require('./lib/ClassMarket');
var random = require('random-name');

var schema = {
    properties: {
      command: {
        //enum: ['init','oppy','help', 'exit'],
        //message: 'Command not found. For the list of command type help',
        required: true
      }
    }
  };
 
  var OppyList=[];
  var MarketTrends=[];
  var PresalesList=[];
  var CompanyList=[];

  //
  // Start the prompt
  //
  prompt.start();
 
  //
  // Get two properties from the user: email, password
  //

  shell();

  function shell(){
    var listOfCommands = ['init','oppy','market','presales','help','company' ,'exit'];
    prompt.get(schema, function (err, result) {

      var arr = result.command.split(" ");
      var command=arr.shift();

      switch(command){
        case 'help':
            printHelp(listOfCommands);
            break;

        case 'init':
            console.log("Initialization process...");
            break;

        case 'oppy':
              oppy(arr);
              break;

        case 'company':
              Comp(arr);
              break;

        case 'market':
              MarketFunc(arr);
              break;

        case  'presales':
              PresalesFunc(arr);
              break;

        case 'exit':
            console.log("Game Over. Bay");
            break;

        default : 
            console.error("Command not found. Please type help");
      }

      if(result.command !== "exit")
        shell();
    });
  }

  function PresalesFunc(arr){
    var listOfCommands = ['init <num>','get','propose <ID> <Company> <Amount>','evalProposal','help'];

    var command=arr.shift();
    switch(command){
      case 'init':
        if(isNaN(arr[0])){
          console.log("You have to specify the number of presales to generate");
          break;
        }
        for(var i=0; i<arr[0]; i++){
          var p= new Presales();
          
          PresalesList.push(p);
        }
        break;

      case 'evalProposal':
        Deals=initDeals();
        PresalesList.forEach( p =>{
          var companyName=p.acceptProposal();
          if(companyName !== null)
            Deals[companyName].push(p);
          
        })

        CompanyList.forEach( c => c.hirePerson(Deals[c.getName()]))
        break;

      case 'getID':
          console.log(PresalesList[arr[0]].getID());
          break;

      case 'get':
        if(isNaN(arr[0])){
          PresalesList.forEach( p =>{
            console.log(prettyjson.render(p.getValues()));
          })
        }else{
          console.log("--------------------------------------------------------");
          console.log("Request sigle Presales Number : ",arr[0]);
          console.log("--------------------------------------------------------");
          console.log(prettyjson.render(PresalesList[arr[0]].getValues()));
        }

        
        break;

      case 'propose':
        PresalesList[arr[0]].evalProposal(CompanyList[arr[1]].getName(),arr[2]);
        CompanyList[arr[1]].makeProposal(PresalesList[arr[0]].getID());

        break;

      case 'help':
        printHelp(listOfCommands);
        break;

      default:
        console.error("Command not found. Please type presales help");        
          
    }
  }

  function Comp(arr){
    var listOfCommands = ['init','get','campain','help'];

    var command=arr.shift();

    switch(command){
      case 'init':
        for(var i=0; i<5; i++)
            CompanyList.push(new Company(random()));
        break;

      case 'get':
        if(isNaN(arr[0])){
          CompanyList.forEach( c =>console.log(prettyjson.render(c.getValues())));
        }else{
          console.log("--------------------------------------------------------");
          console.log("Request sigle Copany Number : ",arr[0]);
          console.log("--------------------------------------------------------");
          console.log(prettyjson.render(CompanyList[arr[0]].getValues()));
        }
        break;

      case 'campain':
        CompanyList[arr[0]].marketingCampain(arr[1],arr[2]);
        break;

      case 'help':
        printHelp(listOfCommands);
        break;

      default:
        console.error("Command not found. Please type market help");
    }
  }


  function MarketFunc(arr){
    var listOfCommands = ['init','get','help'];

    var command=arr.shift();

    switch(command){
      case 'init':
        MarketTrends = new Market();
        break;

      case 'get':
        console.log(prettyjson.render(MarketTrends.getMarketTrends()));
        break;

      case 'help':
        printHelp(listOfCommands);
        break;

      default:
      console.error("Command not found. Please type market help");
    }
  }

  function oppy(arr){
    var listOfCommands = ['init <Num> <MinValue> <MaxValue> <TTC_Min> <TTC_MAX>','get [num]','help'];
    var isValid=true;

    var command=arr.shift();
    switch(command){
      case 'help':
        printHelp(listOfCommands);
        break;

      case 'init':
        if(arr.length !== 5){
          console.error("Parameters not valid.");
        }
        arr.forEach( ele => { 
          if(isNaN(ele))
          isValid=false;
        })

        if(isValid){
          for(var i=0; i<arr[0]; i++){
            var o = {};
            o =  new Opportunities(arr[1], arr[2], arr[3], arr[4]);
            OppyList.push(o);
          }
        }
        else
          console.error("Parameter not numeric")
        break;

      case 'get':
        if(isNaN(arr[0])){
          OppyList.forEach( o => {
            console.log(prettyjson.render(o.getValues()));
          }) 
        }
          
        else{
          console.log("--------------------------------------------------------");
          console.log("Request single oppy number : ",arr[0]);
          console.log("--------------------------------------------------------");
          console.log(prettyjson.render(OppyList[arr[0]].getValues()));
        }
        
        break;


      default:
      console.error("Command not found. Please type oppy help");
    }
    
  }

  function printHelp(listOfCommands){
    
    console.log("This is the list of commands available :");
    listOfCommands.forEach( command => {
      console.log(command);
    })
    console.log("For more info in each command type help <command>");
  }

  

function initDeals(){
  var deals={};
  CompanyList.forEach( c => deals[c.getName()]=[]);
  return deals;
}