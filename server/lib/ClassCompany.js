var settings = require("./settings");
var crypto = require('crypto');
//const Market = require('./ClassMarket');
const helper = require('./helper');
const fs = require('fs');

class Company {
    constructor(name, ProductBasicFeatures){
        this.id="";
        this.name=name;
        this.budget=settings.companyInitialBudget,
        this.presalesTeam=[];
        this.peopleToConfirm=[];
        this.proposal=[];
        this.brendRecognition=settings.companyInitialbrendRecognition;
        this.totalHours=0;
        this.lastQBudget=0;
        this.lastQbrendRecognition=0;
        this.messages=[];
        this.isBAMEnabled=false;
        this.isTOPEnabled=false;
        this.recursivelyQuartelyCost=settings.initRecursuveQuartelyCost;
        this.ProductBasicFeatures=ProductBasicFeatures;
        this.productFeatures=[];
        this.improvablePointsFeatures=settings.DMaxImprovableFeaturePerQuarter;
        this.isBankrupt=false;
        this.brandRecognInvestments=[];
        this.oppyCompeted={};
        this.oppyNotCompeted=[];
        this.endQuarterRemainingHours=[];


        this.oppyConstraint ={
            flgValue:false,
            Value:[0,9999],
            flgQualification:false,
            Qualification : [1,2,3,4,5],
            flgTrend:false,
            Trends:[],
            flgFeature:false,
            Feature:[],
            flgWorkers:false,
            Workers:[],
            flgIndustry:false,
            Industry:[]
        }

        this.generateID();
        this.generateProductFeatures();
    }

    generateID(){ this.id=crypto.createHash('md5').update(JSON.stringify(this)).digest("hex"); }
    getID() { return (this.id)}
    getName(){ return(this.name) }
    sendMessage(msg){ this.messages.push(msg) }
    getMessage(){ return this.messages.pop() }
    deleteMessages() { this.messages=[]}
    getProductFeatures() { return this.productFeatures; }
    getPresalesTeam() { return this.presalesTeam}
    getBrendRecognition() { return this.brendRecognition }
    getBudget(){ return this.budget}
    resetTotalHours(){
        this.totalHours = settings.timePerQuarterPerPerson * this.presalesTeam.length;
    }
    saveBudgetInfo(){this.lastQBudget=this.budget}
    saveBrendRecognition(){this.lastQbrendRecognition=this.brendRecognition}
    getAbsoluteIncome(){ return (this.lastQBudget - this.budget) }
    getPercentGrow(){ return (  ((this.budget/this.lastQBudget)*100) -1)}
    getPercBrendRecog() { return (((this.brendRecognition/this.lastQbrendRecognition)*100) -1) }


    cashIn( oppyValue ) { this.budget += oppyValue }
    payQuarterCosts(totalPeopleCosts){
        this.budget -= this.recursivelyQuartelyCost;        // Fixed recursive Quartely costs €
        this.budget -= totalPeopleCosts;                  // Only get a quarter of a full year copensation

        // BAM and TOP hours Quartely costs
        if(this.isBAMEnabled)   this.totalHours -= settings.BAMrecursiveHourQuartelyCost;
        if(this.isTOPEnabled)   this.totalHours -= settings.TOPrecursiveQuartelyHourCost;
    }

    createOppyWonQuarter(quarter) { this.oppyCompeted[quarter]={}}
    addOppy(oppyID,quarter,value,realValue,TTC,Cost,idx,won) { 
        if(won)
            this.oppyCompeted[oppyID]={quarter:quarter, InitialValue:value, closeValue:realValue, TTC:TTC,Cost:Cost,budget:this.budget,hoursLeft:this.totalHours,idx:idx,outcome:"WON"}
        else
            this.oppyCompeted[oppyID]={quarter:quarter, InitialValue:value, closeValue:0, TTC:TTC, Cost:Cost, budget:this.budget, hoursLeft:this.totalHours, idx:idx, outcome:"LOST"}
    }
    addOppyNotCompeted(oppyID, quarter) { this.oppyNotCompeted.push({quarter:quarter, oppy:oppyID})}
    saveRemainingHours(quarter) { this.endQuarterRemainingHours.push({quarter: quarter, hours:this.totalHours})}
    competeOnOpportunity(oppy, quarter){
        let join=true;

        /** Check Value Constraint */
        if(this.oppyConstraint.flgValue){
            if((oppy.getValue() < this.oppyConstraint.Value[0]) || (oppy.getValue() > this.oppyConstraint.Value[1]))
            join=false;
        }
        
        /** Check Qualification Constraint */
        if(this.oppyConstraint.flgQualification){
            if(this.oppyConstraint.Qualification.indexOf(oppy.getQualification()) === -1)
            join=false;
        }

        /** Check Trends Constraint*/
        /*
        if(this.oppyConstraint.flgTrend){
            let trendFound=false;
            oppy.getTrends().forEach( t =>{
                if(this.oppyConstraint.Trends.indexOf(t) === -1)
                trendFound=true;
            })
            join=trendFound;
        }
        */
        /** Check Features constraint to implement */
        /*
        if(this.oppyConstraint.flgFeature){
            let featureFound=false;
            oppy.getFeatures().forEach( f =>{
                if(this.oppyConstraint.Feature.indexOf(f) === -1)
                featureFound=true;
            })
            join=trendFound;
        }
        */
        /** Check Workers to implement */
        /** Check Industry to implement */
            
        /** Check left hours */
        if( this.totalHours < oppy.getTTC()  ){
            this.totalHours=0;
            join=false;
        }

        if(join){
            /** Decrement Opportunity hours and Budget */
            //this.budget -= oppy.getAssociatedCost();
            this.totalHours -= oppy.getTTC();

        }

        return(join);
    }

    improveFeature(featureName, money){
        if(this.budget - money < 0)
            return (false)

        this.productFeatures.forEach( f => {
            if(f.name === featureName){
                f.score += money / settings.improveFeatureMoneyRatio;
                this.budget -=money;
            }
              
        })
        this.productFeatures.sort(this.compare);
        return (true)
    }

    compare(a,b) {
        if (a.score > b.score)
          return -1;
        if (a.score < b.score)
          return 1;
        return 0;
      }       

    enableBAM(){
        if(this.totalHours - settings.BAMinitialHourCost < 0){
            this.sendMessage({type:'warning',msg:'Sorry, you have not enought money to enable BAM!'})
            return (false)
        }
            

        this.isBAMEnabled=true;
        this.totalHours -=settings.BAMinitialHourCost;
        return (true)
    }
    disableBAM() { this.isBAMEnabled=false}
    getBAMStatus() { return this.isBAMEnabled }

    enableTOP(){
        if(this.totalHours - settings.TOPinitialHourCost < 0){
            this.sendMessage({type:'warning',msg:'Sorry, you have not enought money to enable TOP!'})
            return (false)
        }
            

        this.isTOPEnabled=true;
        this.totalHours-=settings.TOPinitialHourCost;
        return (true)
    }
    disableTOP(){ this.isTOPEnabled=false}
    getTOPStatus() { return this.isTOPEnabled }

    addPeopleToConfirm(person){
        this.peopleToConfirm.push(person.getID());
        this.proposal=[];
    }

    declineProposal(person){

        var index = this.peopleToConfirm.indexOf(person);
        if (index > -1) 
            this.peopleToConfirm.splice(index, 1);

        /** Pay the penalty */
        this.budget -= settings.penaltyDeclineToHire;
    }

    acceptProposal(personId){
        var index = this.peopleToConfirm.indexOf(personId);
        if (index > -1) 
            this.peopleToConfirm.splice(index, 1);
    }

    hirePerson(person){
        if (typeof person !== 'undefined' && person !== null) {
            if(this.budget - person.getCost() < 0)
                return (false)

            if(!this.presalesTeam.includes(person.getID()))
                this.presalesTeam.push(person.getID());
                
            this.budget-=person.getCost();
            this.totalHours +=person.getTimePerQuarter();
        }
        this.proposal=[];
        return (true);
    }

    retentionBonus(money){
        if(this.budget - money < 0)
            return (false);

        this.budget -= money;
        return (true);
    }

    dismissPerson(person){
        const index = this.presalesTeam.indexOf(person.getID());
        if(index > -1)
            this.presalesTeam.splice(index, 1);
        
            

        this.budget+=person.getCost();
        this.totalHours -=person.getTimePerQuarter();
    }
    

    makeProposal(personID, cost){
        if(this.budget - cost < 0)
            return (false);

        this.proposal.push(personID); 
        return (true);
    }

    deleteProposal(personID){
        var index = this.proposal.indexOf(personID);
        if (index > -1) {
            this.proposal.splice(index, 1);
        }
    }

    getProposal() { return this.proposal}

    marketingCampain(cost, hours){

        if((this.budget - cost < 0) || (this.totalHours - hours < 0))
            return (false)

        this.budget -=cost;
        this.totalHours -=hours;

/*
        if(cost > 0) {
            this.brendRecognition += cost / settings.campainCostBrandRatio   + 
            Math.floor(cost / (settings.campainCostHourRatio * hours)) * settings.campainOverflow +     // Overflow Cost
            Math.floor((settings.campainCostHourRatio * hours) / cost) * settings.campainOverflow;      // Overflow Hours
        }
*/

        this.brandRecognInvestments.push({money: cost, hours:hours});
        
        return (true)
    }

    getMarketCampain() { return (this.brandRecognInvestments)}
    deleteMarketCampain(idx) { this.brandRecognInvestments.splice(idx,1)}
    
    setBrendRecognition(share) {
        this.brendRecognition = share;
        this.brandRecognInvestments=[];
    }

    decreaseBrendRecognition(){ 
        this.brendRecognition /= 2;
    } //(1-p/100)}

    payHours(hours) { 
        if(this.totalHours - hours < 0)
            return (false);

        this.totalHours-=hours
        return (true);
    }

    payMoney(money) {
        if(this.budget - money < 0)
            return (false);

        this.budget-=money 
        return (true);
    }

    generateProductFeatures(){
        this.ProductBasicFeatures.forEach( f => {
            var newScore = f.score + Math.round(f.score * helper.generateRandomValue(settings.featureMinChange, settings.featureMaxChange)/100);
            this.productFeatures.push({ name : f.name, score : newScore})
        })
    }
    

    /** Oppy fight criteria */
    getAllFilters() { return (this.oppyConstraint)}
    
    getOppyValue() {return ({flg : this.oppyConstraint.flgValue, value : this.oppyConstraint.Value})}
    toggleValue(){ this.oppyConstraint.flgValue = !this.oppyConstraint.flgValue}
    setOppyValue(value) { this.oppyConstraint.Value=value}

    getOppyQualification() { return ({flg: this.oppyConstraint.flgQualification, value: this.oppyConstraint.Qualification})}
    toggleQualification() { this.oppyConstraint.flgQualification = !this.oppyConstraint.flgQualification}
    setOppyQualification(qualification) { this.oppyConstraint.Qualification = qualification}

    getOppyTrend(){ return ({flg: this.oppyConstraint.flgTrend, value: this.oppyConstraint.Trends})}
    toggleTrends(){ this.oppyConstraint.flgTrend=!this.oppyConstraint.flgTrend}
    setOppyTrends(trends) { this.oppyConstraint.Trends=trends}

    getOppyFeature(){ return ({flg:this.oppyConstraint.flgFeature, value:this.oppyConstraint.Feature})}
    toggleFeature(){ this.oppyConstraint.flgFeature=!this.oppyConstraint.flgFeature}
    setOppyFeature(features){ this.oppyConstraint.Feature=features}

    getOppyWorkers(){ return ({flg:this.oppyConstraint.flgWorkers, value:this.oppyConstraint.Workers})}
    toggleWorkers(){ this.oppyConstraint.flgWorkers=!this.oppyConstraint.flgWorkers}
    setOppyWorkers(workers){ this.oppyConstraint.Workers=workers}

    getOppyIndustry(){ return ({flg:this.oppyConstraint.flgIndustry, value: this.oppyConstraint.Industry})}
    toggleIndustry(){ this.oppyConstraint.flgIndustry=!this.oppyConstraint.flgIndustry}
    setOppyIndustry(industries){ this.oppyConstraint.Industry=industries}
    /********************** */

    getOppyCompletedData(gameId, quarter){
        let rows=[];
        Object.keys(this.oppyCompeted).forEach((oppyId) => {
            rows.push(["'"+gameId+"','"+quarter+"','"+this.id+"','"+oppyId+"',"+this.oppyCompeted[oppyId].closeValue+","+this.oppyCompeted[oppyId].TTC+","+
                        this.oppyCompeted[oppyId].budget+","+this.oppyCompeted[oppyId].hoursLeft+","+this.oppyCompeted[oppyId].idx+",'"+ this.oppyCompeted[oppyId].outcome+"'"]);
        })
        return(rows);
    }

    saveQuarterResultToFile(quarter){        
        let fileName=this.id+"_"+quarter+"_OppyCompleted.csv";
        let data="CompanyId;OpportunitiesId;quarter;InitialValue;ClosedValue;TTC;budget;hoursLeft;idx;outcome\r\n";
        console.log("Saving data to file : ",fileName);
        Object.keys(this.oppyCompeted).forEach((oppyId, index) => {
            data += this.id+";"+oppyId+","+this.oppyCompeted[oppyId].quarter+";"+this.oppyCompeted[oppyId].InitialValue+
                    ";"+this.oppyCompeted[oppyId].closeValue+";"+this.oppyCompeted[oppyId].TTC+";"+this.oppyCompeted[oppyId].budget+
                    ";"+this.oppyCompeted[oppyId].hoursLeft+";"+this.oppyCompeted[oppyId].idx+";"+this.oppyCompeted[oppyId].outcome+"\r\n";


            if(index === Object.keys(this.oppyCompeted).length -1){
                fs.writeFile(settings.quarterLogFilePath+fileName,data, function(err){
                    if(err){
                        console.log("Error while writing the file ",fileName, " : ", err);
                        return (false);
                    }
                    //console.log("File ",fileName," succesfully saved");
                    return (true);
                })
            }
        })

        this.saveTeamToFile(quarter);
        
        let productFeatureFileName=this.id+"_"+quarter+"_ProductFeatures.csv";
        let prodFeaturesData="CompanyId;quarter;ProductFeatureName;ProductFeatureScore\r\n";
        Object.keys(this.productFeatures).forEach((feature, index) => {
            prodFeaturesData += this.id+";"+quarter+";"+this.productFeatures[feature].name+";"+this.productFeatures[feature].score+"\r\n";
            if(index === Object.keys(this.productFeatures).length -1){
                fs.writeFile(settings.quarterLogFilePath+productFeatureFileName,prodFeaturesData, function(err){
                    if(err){
                        console.log("Error while writing the file ",productFeatureFileName, " : ", err);
                        return (false);
                    }
                    //console.log("File ",productFeatureFileName," succesfully saved");
                    return (true);
                })
            }
        })
    }

    getFeaturesData(gameId, quarter){
        let rows=[];
        Object.keys(this.productFeatures).forEach((feature, index) => {
            rows.push(["'"+gameId+"','"+ quarter+"','"+ this.id+"','"+ this.productFeatures[feature].name+"',"+ this.productFeatures[feature].score]);
        })
        return(rows);
    }


    getTeamData(gameId, quarter){
        let rows=[];
        this.presalesTeam.forEach( person =>{
            rows.push(["'"+gameId+"','"+ quarter+"','"+this.id+"','"+ person+"'"]);
        })
        return(rows);
    }

    saveTeamToFile(quarter){
        let fileName=this.id+"_"+quarter+"_PresalesTeam.csv";
        let peopleData="CompanyId;personId\r\n";
        this.presalesTeam.forEach( person =>{
            peopleData+=this.id+";"+person+"\r\n";
            fs.writeFile(settings.quarterLogFilePath+fileName,peopleData, function(err){
                if(err){
                    console.log("Error while writing the file ",fileName, " : ", err);
                    return (false);
                }
                //console.log("File ",fileName," succesfully saved");
                return (true);
            })            
        })
    }

    getValues(){ return(this) }
}

module.exports = Company;