var prompt = require('prompt');
var prettyjson = require('prettyjson');
var Opportunities = require('./lib/ClassOpportunities');
var Presales = require('./lib/ClassPresales');
var Market = require('./lib/ClassMarket');

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

  //
  // Start the prompt
  //
  prompt.start();
 
  //
  // Get two properties from the user: email, password
  //

  shell();

  function shell(){
    var listOfCommands = ['init','oppy','market','presales','help', 'exit'];
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
    var listOfCommands = ['init <num>','get','help'];

    var command=arr.shift();
    switch(command){
      case 'init':
        if(isNaN(arr[0])){
          console.log("You have to specify the number of presales to generate");
          break;
        }
        for(var i=0; i<arr[0]; i++){
          var p= new Presales();
          PresalesList.push(p.getValues());
        }
        break;

      case 'get':
        console.log(prettyjson.render(PresalesList));
        break;

      case 'help':
        printHelp(listOfCommands);
        break;

      default:
        console.error("Command not found. Please type presales help");        
          
    }
  }

  function MarketFunc(arr){
    var listOfCommands = ['init','get','help'];

    var command=arr.shift();

    switch(command){
      case 'init':
        var m = new Market();
        MarketTrends = m.getMarketTrends();
        break;

      case 'get':
        console.log(prettyjson.render(MarketTrends));
        break;

      case 'help':
        printHelp(listOfCommands);
        break;

      default:
      console.error("Command not found. Please type market help");
    }
  }

  function oppy(arr){
    var listOfCommands = ['init <Num> <MinValue> <MaxValue> <TTC_Min> <TTC_MAX>','get','help'];
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
            var o=new Opportunities(arr[1], arr[2], arr[3], arr[4]);
            OppyList.push(o.getValues());
          }
            
        }
        else
          console.error("Parameter not numeric")
        break;

      case 'get':
        console.log(prettyjson.render(OppyList));
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

  
