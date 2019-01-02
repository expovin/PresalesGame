const http = require('http');

var post_data = {
    num : 150,
    minValue: 4,
    maxValue: 1500,
    minTTC: 5,
    maxTTC : 135,
    name: "Qlik",
    message: "Wellcome to the game!",
    value: 86,
    oppyValues: [0,14000],
    cost:150,
    hours:15,
    feature: "Open API",
    points: 3,
    percentage: 25

};

var options = {
    host: 'itmil-ves',
    port: 3000,
    path: '/api/v1/market',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'gameID' : 'm'
      }    
  };

  function genericRequest () {
      var body="";
      return new Promise( (fulfill, reject) => {
        const req = http.request(options, res => {
            let data = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', () => {
                if(data)
                    body = JSON.parse(data);

                fulfill({code:res.statusCode, body:body});
              });                
        });
        req.on('error', (error) => {
            console.log("Error : ",error);
            reject(error);
        });
        req.end(JSON.stringify(post_data));  
      })

  }

  function getRequest () {
    return new Promise( (fulfill, reject) => {
      const req = http.get(options, res => {
          let data = '';
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
              data += chunk;
          });
          res.on('end', () => {
              if(data)
                  body = JSON.parse(data);

              fulfill({code:res.statusCode, body:body});
            });                
      });
      req.on('error', (error) => {
          console.log("Error : ",error);
          reject(error);
      });
      req.end(JSON.stringify(post_data));  
    })

}

module.exports = {

    genMarket : function () {
        options.path="/api/v1/market";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
        
    },

    getMarket : function () {
        options.path="/api/v1/market";
        options.method='GET';
        return new Promise ( (fulfill, reject) => {
            getRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
        
    },

    genPresales : function() {
        options.path="/api/v1/presales";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    getCompanies : function () {
        options.path="/api/v1/companies";
        options.method='GET';
        return new Promise ( (fulfill, reject) => {
            getRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
        
    },    

    getPresales : function() {
        options.path="/api/v1/presales";
        options.method='GET';
        return new Promise ( (fulfill, reject) => {
            getRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    makeProposal : function(companyID, presalesID) {
        options.path="/api/v1/market/proposal/"+companyID+"/"+presalesID;
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    evaluate : function(companyID, presalesID) {
        options.path="/api/v1/market/evaluate";
        options.method='GET';
        return new Promise ( (fulfill, reject) => {
            getRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },    

    confirmPerson : function(companyID, PersonID) {
        options.path="/api/v1/market/evaluate";
        options.method="POST";
        post_data['companyID']=companyID;
        post_data['personID']=PersonID;
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    discardPerson : function(companyID, PersonID) {
        options.path="/api/v1/market/evaluate";
        options.method="PUT";
        post_data['companyID']=companyID;
        post_data['personID']=PersonID;        
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },    

    genOpportunities : function() {
        options.path="/api/v1/opportunities";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    genCompany : function (name){
        options.path="/api/v1/companies";
        options.method="POST";
        post_data.name=name;
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    marketCampain : function (companyID){
        options.path="/api/v1/companies/"+companyID+"/Campain";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    toggleFilterValue : function (companyID){
        options.path="/api/v1/companies/"+companyID+"/filter/value";
        options.method="PUT";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },    

    setFilterValue : function (companyID){
        options.path="/api/v1/companies/"+companyID+"/filter/value";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    makeProposal : function(companyID, PersonID){
        options.path="/api/v1/market/proposal/"+companyID+"/"+PersonID+"/";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })        
    },

    getCampain : function(companyID){
        options.path="/api/v1/companies/"+companyID+"/Campain";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })    
    },

    BRShare : function(){
        options.path="/api/v1/market/BRShare";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })    
    },

    nextPeriod : function(){
        options.path="/api/v1/market/nextPeriod";
        options.method="GET";
        return new Promise ( (fulfill, reject) => {
            getRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
            .catch( err =>{
                console.log("Error : ",err);
            })
        })    
    }   
}