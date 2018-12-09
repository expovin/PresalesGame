'use strict'

/** This is the parent class Market. This class define the heuristic algorithms
 *  used by the child class Presales and Opportunities.
  */
const settings = require("./settings");
const helper = require("./helper");
const trends = require('./dictionary').trends;
const features = require('./dictionary').features;
const periods = require('./dictionary').periods;
const customers = require('./dictionary').companies;
const fs = require('fs');
const Oppy = require('../lib/ClassOpportunities');
const wsClass = require('./wsMessages');

const QIX = require('../lib/ClassQIX');



class Market {
    

    constructor(m) {
        this.qix=new QIX(m);;
        this.periodIndex=0;
        this.MarketTrends=[];
        this.ProductBasicFeatures=[];
        /** Constructor for the parent class. */
        this.setMarketTrends();
        this.generateBaseProductFeatures();

        this.People={};
        this.brendRecognitionShare=[];

        this.PeopleArray=[];
        this.PeopleTrends=[];
        this.PeopleSkills=[];

        this.Companies={};
        this.Opportunities=[];
        this.OppyDeserialized=[];
        this.OppyTrendsDeserialized=[],

        this.quarter=periods[this.periodIndex];
        this.QIncomeCompanyRanking=[];
        //this.wsM = new wsClass();

        this.oppyMinValue;
        this.oppyMaxValue;
        this.oppyTTCmin;
        this.oppyTTCmax;
        this.oppyNum;
        this.ws = new wsClass();

    }

    initQIX(m){
        return new Promise ( (fulfill, reject) =>{
            this.qix.createApp()
            .then (appID =>{
                return (this.qix.openDoc(appID.qAppId))
            })
            .then(result =>{
                this.qix.addTable(this.MarketTrends,"MarketTrends");
                this.qix.addTable(this.OppyDeserialized,"Opportunities");
                this.qix.addTable(this.OppyTrendsDeserialized,"OpportunityTrends");
                this.qix.addTable(this.PeopleArray,"People");
                this.qix.addTable(this.PeopleTrends,"Trends");
                this.qix.addTable(this.PeopleSkills,"Skills");
                this.qix.addTable(customers,"customers");      
                return (this.qix.reloadApp())         
            })
            .then( () =>{
                fulfill(true);
            })
            .catch( error =>{
                reject(error);
            })
        })
    }

    setOppyParameters(num, MinValue, MaxValue, TTCMin, TTCMax){
        this.oppyMinValue=MinValue;
        this.oppyMaxValue=MaxValue;
        this.oppyTTCmin=TTCMin;
        this.oppyTTCmax=TTCMax;
        this.oppyNum=num;
    }

    assignBrendRecognition(){
        let totalInvestment=0;
        let CompanyCampains=[];
        this.brendRecognitionShare=[];
        var _this=this;

        Object.keys(this.Companies).forEach(function(companyID) {
            let companyInvestment=0;
            _this.Companies[companyID].getMarketCampain().forEach ( campain => {
                companyInvestment += campain.money + campain.hours*10;
            })
            CompanyCampains.push({companyName : _this.Companies[companyID], cost : companyInvestment});
            totalInvestment += companyInvestment;
        });
        CompanyCampains.forEach( company => {
            let share = (company.cost / totalInvestment) * 100;
            _this.brendRecognitionShare.push({company:company.companyName.getName(), investment: company.cost, share: share})
            company.companyName.setBrendRecognition(share);
        })
    }

    getBRShare(){ return (this.brendRecognitionShare)}
    getQuarter(){ return this.quarter}

    deserializeOppy(){
        this.Opportunities.forEach (o =>{
            var newOppy={};
            newOppy['idOpportunity']=o.ID;
            newOppy['company']=o.CompanyName;
            newOppy['oppyTeoricalValue']=o.teoricalValue;
            newOppy['oppyQualificationLevel']=o.qualificationLevel;
            this.OppyDeserialized.push(newOppy);

            o.TrendsRequired.forEach (ot =>{
                var otNew = {}
                otNew['idOpportunity']=o.ID;
                otNew['trendName']=ot;
                this.OppyTrendsDeserialized.push(otNew);
            })
        })
    }


    addPeopleToArray(p){
        var person = {
            idPerson : p.person.ID,
            personName : p.person.name,
            personCost : p.person.cost,
            satisfactionLevel : p.person.satisfactionLevel,
            timePerQuarter : p.person.timePerQuarter,
            employedBy : p.person.employedBy,
            isEmployed : p.person.isEmployed,
        };

        this.PeopleArray.push(person);

        p.person.PersonTrends.forEach( trend => {
            var newTrend=[];
            newTrend['idPerson']=p.person.ID;
            newTrend['trendName']=trend.name;
            newTrend['trendScore']=trend.score;
            this.PeopleTrends.push(newTrend);
        })

        p.person.skills.forEach( skill => {
            var newSkill=[];
            newSkill['idPerson']=p.person.ID;
            newSkill['skillName']=skill.name;
            newSkill['skill.score']=skill.score;
            this.PeopleSkills.push(newSkill);
        })
    }

    scoreCalculus(companyID,oppy){
        /**  */
        /** Get the Trends weight*/
        var trendScoreNormalized=0,
            featureScoreNormalized=0,
            avgBANormalized=0,
            brandRecognitionNormalized=0;
            
        /** Trend Score */
        let trendScore =0;
        oppy.getTrends().forEach( (trend, index) => {
            let sumTrendScore=0;
            this.Companies[companyID].getPresalesTeam().forEach( personID => {
                this.People[personID].getTrends().forEach( t => {
                    if((trend === t.name))
                        sumTrendScore += settings.TrendWeight[index];
                })
            })
            //trendScore /= this.Companies[companyID].getPresalesTeam().length; //settings.TrendWeight[index]*maxTrendScore;
            trendScoreNormalized = (sumTrendScore  * settings.weighCompetition.Trends)/12 | 0;

        })

        /** Get the feature weight */
        let featureScore=0;
        oppy.getFeatures().forEach( (feature, index) => {
            let sumFeatureScore=0;
            this.Companies[companyID].getPresalesTeam().forEach( personID => {
                this.People[personID].getFeatures().forEach( f => {
                    if((feature.name === f.name))
                        sumFeatureScore += settings.FeatureWeigh[index];
                })
            })
            //featureScore += feature.score*maxFeatureScore;
            featureScoreNormalized = (sumFeatureScore * settings.weighCompetition.Features)/12 | 0;
        })
        
        /** Get the Business Acumen Average  */
        let summBA=0;
        this.Companies[companyID].getPresalesTeam().forEach( personID => summBA += this.People[personID].getSkillBA())
        let avgBA=summBA/this.Companies[companyID].getPresalesTeam().length;
        avgBANormalized = (avgBA * settings.weighCompetition.BA)/100 | 0;

        /** Get the Brend Recognition */
        let brandRecognition = this.Companies[companyID].getBrendRecognition();
        brandRecognitionNormalized = (brandRecognition * settings.weighCompetition.BR)/100 | 0;

        return ({companyID: companyID, TrendScore: trendScoreNormalized, FeatureScore: featureScoreNormalized, BA: avgBANormalized, BR: brandRecognitionNormalized})

    }

    nextPeriod(){

        /** Start Fight this Quarter */
        // Get out the recursive Quarter cost (People cost, BAM, TOP)
        
        var _this=this;
        var CompanyScore;
        var winner=null;
        var winnerScore=0;
        var msg="";

        msg={type:'start',msg:'Opportunities calculation from '+periods[this.periodIndex]+" to "+periods[this.periodIndex+1]};
        this.ws.sendBroadcastMessage(JSON.stringify(msg));


        Object.keys(this.Companies).forEach(function(companyID) {
            let totalPeopleCosts = 0;
            _this.Companies[companyID].getPresalesTeam().forEach( personID => totalPeopleCosts += _this.People[personID].getCost())
            _this.Companies[companyID].payQuarterCosts(totalPeopleCosts/4);

            _this.Companies[companyID].saveBudgetInfo();
            _this.Companies[companyID].saveBrendRecognition();
          });
          msg={type:'actions',msg:{type:"Making quarter payments and saving results",result:"done"}};
          this.ws.sendBroadcastMessage(JSON.stringify(msg));

        // Loop for each opportunity and pass them to the companies.
        this.Opportunities.forEach( (oppy,oppyNum) => {
            if( oppy.isOpen()){
                winner=null;
                Object.keys(this.Companies).forEach(companyID => {
                    
                    /** If the company want to compete */
                    var gonnaCompete =_this.Companies[companyID].competeOnOpportunity(oppy, this.quarter);
                    if(gonnaCompete){
                        this.Companies[companyID].addOppy(oppy.getID(), this.quarter, oppy.getValue(), 0, oppy.getTTC(), oppy.getAssociatedCost(),oppyNum, false)
                        /** Let's make the calcolation */
                        var CompanyRecord = _this.scoreCalculus(companyID, oppy);
                        oppy.addPretender(CompanyRecord);       // Add the company as pretender
                        CompanyScore = CompanyRecord.TrendScore + CompanyRecord.FeatureScore + CompanyRecord.BA + CompanyRecord.BR;
                        if( CompanyScore > winnerScore) {
                            winnerScore = CompanyScore;
                            winner = companyID;
                        }
                    }
                    else{
                        //this.Companies[companyID].sendMessage({type:'warning', msg:"Sorry, you can't compete on the oppy "+oppy.getID()+" because you run out of hours."});
                        this.Companies[companyID].addOppyNotCompeted(oppy.getID(), this.quarter);
                    }
                })
                if(winner !== null){
                    oppy.close();
                    oppy.setWinner(winner);         // Set the Winner on the Company record
                    msg={type:'actions',msg:{type:"You won the opportunity "+oppy.getID()+" @"+oppy.getRealValue()+" K€",result:"WON"}};
                    this.ws.sendTextMessage(winner,JSON.stringify(msg));                    
                    this.Companies[winner].addOppy(oppy.getID(), this.quarter, oppy.getValue(), oppy.getRealValue(), oppy.getTTC(), oppy.getAssociatedCost(),oppyNum,true)
                    this.Companies[winner].cashIn(oppy.getRealValue())
                    //this.Companies[winner].sendMessage("Congratulation, you won the oppy ID "+oppy.getID()+
                    //                                    " original value was "+oppy.getValue()+" the real income value is "+oppy.getRealValue()
                    //                                    + " you spent "+oppy.getAssociatedCost()+"K€ and "+oppy.getTTC()+" hours to complete the task"
                    //                                    + " current budget "+this.Companies[winner].getBudget());
                }
            }

        })
        msg={type:'actions',msg:{type:"Opportunities fight is over",result:"done"}};
        this.ws.sendBroadcastMessage(JSON.stringify(msg));


        /** Saving Opportunities statistics */
        this.saveQuarterResultToFile(this.quarter,this.getOpportunities())


        /** Saving Employed people statistics */
        let employedPeople = this.getPeople(true);
        Object.keys(employedPeople).forEach( personId => employedPeople[personId].saveQuarterResultToFile(this.quarter))
        msg={type:'actions',msg:{type:"Quarter results saved",result:"done"}};
        this.ws.sendBroadcastMessage(JSON.stringify(msg));        

        /** Move forward to the next Quarter */
        Object.keys(this.Companies).forEach(function(companyID) {
            /** Save company statistics */
            _this.Companies[companyID].saveTeamToFile(_this.quarter);
            /** Save Company statistics */
            _this.Companies[companyID].saveQuarterResultToFile(_this.quarter);
            /** Save the amount of hours left */
            _this.Companies[companyID].saveRemainingHours(_this.quarter);
            /** Reset the total hours for each Company */
            _this.Companies[companyID].resetTotalHours();
            _this.QIncomeCompanyRanking.push({id:companyID, rank:_this.Companies[companyID].getPercentGrow()})
            /** Lower The Teem Mood */
            let decrease=(100 -_this.getAvgTeamWorkLevel(_this.Companies[companyID])); //settings.decSatisfactionQuarterPerc;

            if(_this.Companies[companyID].getBAMStatus()) decrease += settings.BAMSatisfactionLvlImpactPerc;
            if(_this.Companies[companyID].getTOPStatus()) decrease += settings.TOPSatisfactionLvlImpact;
            _this.Companies[companyID].getPresalesTeam().forEach( personID =>  _this.People[personID].changeSatisfactionalLevel(decrease*(-1)))
            /** Lower the Company brad */
            _this.Companies[companyID].decreaseBrendRecognition();
        });
        msg={type:'actions',msg:{type:"Calulating new quarter company status",result:"done"}};
        this.ws.sendBroadcastMessage(JSON.stringify(msg));          


        _this.QIncomeCompanyRanking.sort(function(a,b){
            return a.rank - b.rank
        })

        // Giving a bous on the satisfactional level and Brand recognition to the first n companies
        //_this.Companies[_this.QIncomeCompanyRanking[0].companyID].getPresalesTeam().forEach( personID =>  _this.People[personID].changeSatisfactionalLevel(30))

        this.periodIndex++;
        this.quarter=periods[this.periodIndex];

        /** Slightly change market trends */
        this.slightlyChangeMarketTrends();
        msg={type:'actions',msg:{type:"Slightly changing market",result:"done"}};
        this.ws.sendBroadcastMessage(JSON.stringify(msg));  

        /** Delete old opportunitis */
        this.deleteOpportunities();
        msg={type:'actions',msg:{type:"Delete old opportunities",result:"done"}};
        this.ws.sendBroadcastMessage(JSON.stringify(msg));  

        /** Create new fresh opportunities */
        for(var i=0; i<this.oppyNum; i++)
            this.addOpportunity(new Oppy(this.oppyMinValue, this.oppyMaxValue, this.oppyTTCmin, this.oppyTTCmin));
        this.deserializeOppy();
        msg={type:'actions',msg:{type:"Generated new opportunities",result:"done"}};
        this.ws.sendBroadcastMessage(JSON.stringify(msg));  

        var _this=this;
        setTimeout( function(){
            msg={type:'end',msg:"Terminated"};
            _this.ws.sendBroadcastMessage(JSON.stringify(msg)); 
        }, 3000);


    }

    getQCompanyRank() {
        this.QIncomeCompanyRanking.forEach( (company, idx) =>{
            this.QIncomeCompanyRanking[idx]['name']=this.companies[company.companyID].name;
        })
        return(this.QIncomeCompanyRanking);
    }
    
    getCurrentQuarter() { return this.quarter }
    addPerson(person) { this.People[person.getID()]=person}
    setPeople(people){ this.People=people}

    /** Return the list of people. The parameter type should be:
     *  mull : Return all presales people in the array
     *  true : Return only the employed presales person
     *  false: Return only the unenployed presales person
     */
    getPeople(employedStatus) {
        if(employedStatus === undefined)
            return this.People
        else{
            var results={};
            var _this = this;
            Object.keys(this.People).forEach(function(PresalesID) {
                if( _this.People[PresalesID].getEmployedStatus() === employedStatus ){
                    results[PresalesID]=_this.People[PresalesID];
                }
                    
            });
            return results;
        }
    }

    getPerson(personID) { return this.People[personID]}
    deletePeople(){ this.People={} }

    addCompany(company){ this.Companies[company.id]=company}
    setCompanies(companies){ this.Companies=companies}
    getCompanies(){ return this.Companies }
    getCompany(companyID) {return this.Companies[companyID]}
    deleteCompanies(){ this.Companies={}}

    addOpportunity(oppy) { this.Opportunities.push(oppy)}
    getOpportunities() { return(this.Opportunities)}
    deleteOpportunities() { this.Opportunities=[]}

    setMarketTrends(){
        trends.forEach( trend =>{
            this.MarketTrends.push({trendName : trend, marketTrendScore : helper.generateRandomValue(settings.MinTrendScore, settings.MaxTrendScore)})
        })

       // this.MarketTrends.sort(this.compareMarketTrends);
    }  

    getAvgSatisfactionalLevel(companyId){
        let satisfaction=0;
        this.Companies[companyId].presalesTeam.forEach( p => {
            satisfaction += this.People[p].person.satisfactionLevel;
        })
        satisfaction /= this.Companies[companyId].presalesTeam.length;

        return(satisfaction);
    }

    getAvgTeamWorkLevel(Company){
        let teamWorkLevel=0;
        Company.presalesTeam.forEach( p => {
            teamWorkLevel += this.People[p].getSkillTW();
        })
        teamWorkLevel /= Company.presalesTeam.length;

        return(teamWorkLevel);
    }

    generateBaseProductFeatures(){
        let tmp=[];
        for(var i=0; i<settings.numberOfProductFeatures; i++){
            var feature = features[Math.floor(Math.random()*features.length)];
            if(tmp.indexOf(feature) === -1){
                tmp.push(feature);
                this.ProductBasicFeatures.push({ name: feature, score : helper.generateRandomValue(settings.MinFeatureScore, settings.MaxFeatureScore)})
            }
            else
                i--;
        }
        this.ProductBasicFeatures.sort(this.compare);
        //this.ProductBasicFeatures =  this.removeDuplicates(this.ProductBasicFeatures);
    }

    getBaseProductFeatures(){ return this.ProductBasicFeatures }

    
    getCourse(companyID, personID, marketTrend, feature, money, hours, quantityToIncrease){

        if(!this.Companies[companyID].payHours(hours))
            return (false);
        if(!this.Companies[companyID].payMoney(money))
            return(false);

        if(marketTrend !== undefined){
            this.People[personID].increaseTrend(marketTrend, quantityToIncrease);
            this.People[personID].addCourse({period:this.quarter, marketTrend : marketTrend, hours : hours})
        }
            
        if(feature !== undefined){
            this.People[personID].increaseFeature(feature, quantityToIncrease);
            this.People[personID].addCourse({period:this.quarter, feature : feature, hours : hours})
        }
        return(true);
    }
    
    
    slightlyChangeMarketTrends(){
        this.MarketTrends.forEach( m => {
            var newScore = m.score + Math.round(m.score * helper.generateRandomValue(settings.marketTrendPercentageVariationMin, settings.marketTrendPercentageVariationMax)/100);
            m.score = newScore;
        })
    }

    getMarketTrends(){
        return(this.MarketTrends);
    }

    getMarketTrendsObj(){
        var m={};
        this.MarketTrends.forEach( trend =>{
            m[trend.name]=trend.score;
        })
        return(m);
    }

    getFeature(){
        return(features[Math.floor(Math.random() * trends.length)]);
    }    

    removeDuplicates(array){
        return( array.filter( function(elem, pos) {
            return array.indexOf(elem) == pos;
        }))
    }

    compare(a,b) {
        if (a.score > b.score)
          return -1;
        if (a.score < b.score)
          return 1;
        return 0;
      }    

    saveQuarterResultToFile(quarter,data){
        let generalFileName="General_"+quarter+"_Opportunities.csv";
        let dataGeneral="OpportunityId;CompanyName;Quarter;TeoricalValue;VariationPerc;RealValue;QualificationLevel;TTC;Winner;Status\r\n";

        data.forEach((oppy,index) =>{
            dataGeneral += oppy.ID+";"+oppy.CompanyName+";"+quarter+";"+oppy.teoricalValue+";"+oppy.variationPerc+";"+oppy.realOppyValue+
                            ";"+oppy.qualificationLevel+";"+oppy.TTC+";"+oppy.winner+";"+oppy.status+"\r\n";

            if(index === data.length -1){
                fs.writeFile(settings.quarterLogFilePath+generalFileName,dataGeneral, function(err){
                    if(err){
                        console.log("Error while writing the file ",generalFileName, " : ", err);
                        return (false);
                    }
                    //console.log("File ",generalFileName," succesfully saved");
                    return (true);
                })
            }
            this.saveFeatures(oppy.ID,quarter,oppy.features);
            this.savePretenders(oppy.ID,quarter,oppy.pretenders);
            this.saveTrends(oppy.ID, quarter, oppy.TrendsRequired);
        })
    }

    saveFeatures(id,quarter,data){
        let featureFileName=id+"_"+quarter+"_Features.csv";
        let dataFeatures="OpportunityId;quarter;FeatureName;FeatureScore\r\n";
        data.forEach((f,index) =>{
            dataFeatures += id+";"+quarter+";"+f.name+";"+f.score+"\r\n";

            if(index === data.length -1){
                fs.writeFile(settings.quarterLogFilePath+featureFileName,dataFeatures, function(err){
                    if(err){
                        console.log("Error while writing the file ",featureFileName, " : ", err);
                        return (false);
                    }
                    //console.log("File ",featureFileName," succesfully saved");
                    return (true);
                })
            }
        })
    }

    savePretenders(id,quarter,data){
        let pretendersFileName=id+"_"+quarter+"_Pretenders.csv";
        let dataPretenders="OpportunityId;quarter;CompanyId;TrendScore;FeatureScore;BA;BR\r\n";

        data.forEach((pretender,index) =>{
            dataPretenders += id+";"+quarter+";"+pretender.companyID+";"+pretender.TrendScore+";"+pretender.FeatureScore+
                            ";"+pretender.BA+";"+pretender.BR+"\r\n";

            if(index === data.length -1){
                fs.writeFile(settings.quarterLogFilePath+pretendersFileName,dataPretenders, function(err){
                    if(err){
                        console.log("Error while writing the file ",pretendersFileName, " : ", err);
                        return (false);
                    }
                    //console.log("File ",pretendersFileName," succesfully saved");
                    return (true);
                })
            }
        })
    }

    saveTrends(id,quarter,data){
        let trendsFileName=id+"_"+quarter+"_Trends.csv";
        let dataTrends="OpportunityId;quarter;Trend\r\n";

        data.forEach((trend,index) =>{
            dataTrends += id+";"+quarter+";"+trend+"\r\n";

            if(index === data.length -1){
                fs.writeFile(settings.quarterLogFilePath+trendsFileName,dataTrends, function(err){
                    if(err){
                        console.log("Error while writing the file ",trendsFileName, " : ", err);
                        return (false);
                    }
                    //console.log("File ",trendsFileName," succesfully saved");
                    return (true);
                })
            }
        })
    }

    getAvgTeamTrends(companyId){
        let avgTrends={};
        trends.forEach( t=> {
            avgTrends[t]=[0,0];       
        })
        if(this.Companies[companyId].presalesTeam){
            this.Companies[companyId].presalesTeam.forEach( (p,idx) =>{
                this.People[p].person.PersonTrends.forEach( trend =>{
                    avgTrends[trend.name] = [avgTrends[trend.name][0]+trend.score, avgTrends[trend.name][1]+1 ];
                })
    
                if(idx === this.Companies[companyId].presalesTeam.length -1){

                    Object.keys(avgTrends).forEach(t =>{
                        if(avgTrends[t][1] !== 0){
                            avgTrends[t][0]=avgTrends[t][0]/avgTrends[t][1];
                            avgTrends[t][2]=avgTrends[t][1];
                            avgTrends[t][1]=avgTrends[t][0]/this.Companies[companyId].presalesTeam.length;
                        }
                        else
                        avgTrends[t]=[0,0,0];
                    })
                }
            })
        }

        return (avgTrends);
    }
}


module.exports = Market;