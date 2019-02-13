const mysql = require('mysql');
const ddls = require('./DBDDLs');

class DB  {

    constructor(host, port, database, user, password) {

        this.maxRetry=0;
        /** Constructor for the parent class. */

        var _this=this;
        let dbConnTry = setInterval( function() {
            _this.con = _this.makeDBConn(host, port, database, user, password); 

            _this.con.connect( function(err){
                if (err){ 
                    console.log("Error connecting to the Database ",err," Attempt num ",_this.maxRetry+1);
                    console.log("Retry the DB connection in 2 sec.");
                }
                else {
                    console.log('Succesfully connected to the DB');
                    clearInterval(dbConnTry);
                }
            });
        }, 2000);
           

        this.personDetailsDdl = "INSERT INTO `pg_data`.`personDetails` (gameId, quarter, personId, name, cost, satisfactionLevel) VALUES ";
        this.personTrendsDdl = "INSERT INTO `pg_data`.`personTrends`  (gameId, quarter, personId, trendName, trendScore) VALUES ";
        this.personFeaturesDdl = "INSERT INTO `pg_data`.`personFeatures`  (gameId, quarter, personId, featureName, featureScore) VALUES ";
        this.oppyCompletedDdl = "INSERT INTO `pg_data`.`oppiesCompleted`  (gameId, quarter, companyId, opportunitiesId, ClosedValue, TTC, budget, hoursLeft, idx, outcome) VALUES ";
        this.productFeaturesDdl = "INSERT INTO `pg_data`.`productFeatures`  (gameId, quarter, companyId, productFeatureName, productFeatureScore) VALUES ";
        this.presaleTeamDdl = "INSERT INTO `pg_data`.`presalesTeam`  (gameId, quarter, companyId, personId) VALUES ";
        this.marketOpportunitiesDdl = "INSERT INTO `pg_data`.`Opportunities`  (gameId, quarter, opportunityId, companyName, TeoricalValue, VariationPerc, RealValue, QualificationLevel, TTC, winner, Status) VALUES ";
        this.marketFeaturesDdl = "INSERT INTO `pg_data`.`features` (gameId, quarter, opportunityId, featureName, featureScore) VALUES ";
        this.marketPretendersDdl = "INSERT INTO `pg_data`.`pretenders` (gameId, quarter, opportunityId, companyId, trendScore, featureScore, BA, BR) VALUES";
        this.marketTrends  = "INSERT INTO `pg_data`.`trends` (gameId, quarter, opportunityId, trend) VALUES ";

        this.truncate = "Truncate table pg_data.";
        this.tables = ['features','oppiesCompleted','Opportunities','personDetails','personFeatures','personTrends','presalesTeam',
                        'pretenders','productFeatures','trends'];
             
    }

    makeDBConn(host, port, database, user, password){
        return (
            mysql.createConnection({
                host     : host,
                port     : port,
                database : database,
                user     : user,
                password : password,
            })
        )
    }

    clearTables(){
        var Promises=[];
        this.tables.forEach( table =>{
            console.log("Truncate table "+table);
            Promises.push(
                this.con.query(this.truncate+table, (error, result)=>{
                    if(error) throw error;
                    else console.log("Table Truncated!");
                })
            )
        })
        return (Promise.all(Promises)
        .then( (value)=>{
            value.forEach( val =>{
                console.log(val);
            })
        }))
    }

    init(){
        var Promises=[];
        console.log("Database Initialization");
        console.log("-----------------------------");
        Object.keys(ddls).forEach(table =>{
            console.log("Query : "+ddls[table]);
            Promises.push(                
                this.con.query(ddls[table], function (error, result) {
                    if (error) console.log(error);
                    else
                    console.log("Table "+table+" created!");
                })
            )
        })
        return (Promise.all(Promises)
        .then( (values) => {
            values.forEach(val =>{
                console.log(val);
            })
        } ))
        
    }

    generalInsert(rows, ddl){
        if(rows.length > 0){
            var sql = ddl;
            rows.forEach (row =>{
                sql += "(" + row + "),";
            })
            sql = sql.slice(0, -1);     // Just removing the last comma from the sql statement
            console.log(sql);
            return new Promise( (fulfill, reject) => {
                this.con.query(sql, function (err, result) {
                    if (err) reject(err);
                    fulfill("Insert "+rows.length+" record(s)");
                });  
            })
        }
    }

    personDetailsIns(rows){ this.generalInsert(rows, this.personDetailsDdl) }
    personTrendsIns(rows) {this.generalInsert(rows, this.personTrendsDdl)}
    personFeaturesIns(rows) {this.generalInsert(rows, this.personFeaturesDdl)}
    companyTeamIns(rows) { this.generalInsert(rows, this.presaleTeamDdl)}
    companyProductFeatureIns(rows) { this.generalInsert(rows, this.productFeaturesDdl)}
    companyOppyCompletedIns(rows) { this.generalInsert(rows, this.oppyCompletedDdl)}
    marketOpportunitiesIns(rows) { this.generalInsert(rows, this.marketOpportunitiesDdl)}
    marketFeaturesIns(rows) { this.generalInsert(rows, this.marketFeaturesDdl)}
    marketPretendersIns(rows) { this.generalInsert(rows, this.marketPretendersDdl)}
    marketTrendsIns(rows) { this.generalInsert(rows, this.marketTrends)}
}

module.exports = DB;