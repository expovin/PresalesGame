const http = require('http');

var post_data = {
    num : 50,
    minValue: 4,
    maxValue: 1500,
    minTTC: 5,
    maxTTC : 35,
    name: "Qlik",
    message: "Wellcome to the game!",
    value: 86,
    oppyValues: [50,140],
    cost:150,
    hours:15,
    feature: "Open API",
    points: 3,
    percentage: 25,
    oppyValues:[30,150],

};

var options = {
    //host: 'localhost',
    port: 3000,
    path: '/market',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'gameID' : 'm'
      }    
  };

  function genericRequest () {
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
        options.path="/market";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
        
    },

    getMarket : function () {
        options.path="/market";
        options.method='GET';
        return new Promise ( (fulfill, reject) => {
            getRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
        
    },

    genPresales : function() {
        options.path="/presales";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    getPresales : function() {
        options.path="/presales";
        options.method='GET';
        return new Promise ( (fulfill, reject) => {
            getRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    makeProposal : function(companyID, presalesID) {
        options.path="/market/proposal/"+companyID+"/"+presalesID;
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    evaluate : function(companyID, presalesID) {
        options.path="/market/evaluate";
        options.method='GET';
        return new Promise ( (fulfill, reject) => {
            getRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },    
    genOpportunities : function() {
        options.path="/opportunities";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    genCompany : function (name){
        options.path="/companies";
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
        options.path="/companies/"+companyID+"/Compain";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },

    toggleFilterValue : function (companyID){
        options.path="/companies/"+companyID+"/filter/value";
        options.method="PUT";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    },    

    setFilterValue : function (companyID){
        options.path="/companies/"+companyID+"/filter/value";
        options.method="POST";
        return new Promise ( (fulfill, reject) => {
            genericRequest()
            .then( res => {
                fulfill(res);
            }, error => reject(error))
        })
    }
    
}