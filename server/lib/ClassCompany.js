var settings = require("./settings");
var crypto = require('crypto');
//const Market = require('./ClassMarket');
const helper = require('./helper');

class Company {
    constructor(name, ProductBasicFeatures){
        this.id="";
        this.name=name;
        this.budget=settings.companyInitialBudget,
        this.presalesTeam=[];
        this.proposal=[];
        this.brendRecognition=settings.companyInitialbrendRecognition;
        this.totalHours=0;
        this.messages=[];
        this.isBAMEnabled=false;
        this.isTOPEnabled=false;
        this.recursivelyQuartelyCost=settings.initRecursuveQuartelyCost;
        this.ProductBasicFeatures=ProductBasicFeatures;
        this.productFeatures=[];
        this.improvablePointsFeatures=settings.DMaxImprovableFeaturePerQuarter;
        this.isBankrupt=false;
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

    cashIn( oppyValue ) { this.budget += oppyValue }
    payQuarterCosts(totalPeopleCosts){
        this.budget -= this.recursivelyQuartelyCost;        // Fixed recursive Quartely costs €
        this.budget -= totalPeopleCosts;                  // Only get a quarter of a full year copensation

        // BAM and TOP hours Quartely costs
        if(this.isBAMEnabled)   this.totalHours -= settings.BAMrecursiveHourQuartelyCost;
        if(this.isTOPEnabled)   this.totalHours -= settings.TOPrecursiveQuartelyHourCost;
    }

    createOppyWonQuarter(quarter) { this.oppyCompeted[quarter]={}}
    addOppy(oppyID,quarter,value,TTC,Cost,won) { 
        if(won)
            this.oppyCompeted[oppyID]={quarter:quarter, value:value, TTC:TTC,Cost:Cost,outcome:"WON"}
        else
            this.oppyCompeted[oppyID]={quarter:quarter, value:value, TTC:TTC,Cost:Cost,outcome:"LOST"}
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
        if(this.oppyConstraint.flgTrend){
            let trendFound=false;
            oppy.getTrends().forEach( t =>{
                if(this.oppyConstraint.Trends.indexOf(t) === -1)
                trendFound=true;
            })
            join=trendFound;
        }

        /** Check Features constraint to implement */
        if(this.oppyConstraint.flgFeature){
            let featureFound=false;
            oppy.getFeatures().forEach( f =>{
                if(this.oppyConstraint.Feature.indexOf(f) === -1)
                featureFound=true;
            })
            join=trendFound;
        }

        /** Check Workers to implement */
        /** Check Industry to implement */
            

        if(join){
            /** Decrement Opportunity hours and Budget */
            this.budget -= oppy.getAssociatedCost();
            this.totalHours -= oppy.getTTC();

            /** If this opportunity require more hours or budget then the company's have
             *  The attrib will be set to zero and the company cannot compete
             */
            if(this.budget <= 0 || isNaN(this.budget)) { 
                this.budget = 0;
                this.isBankrupt=true;
                join=false;
            }

            if( this.totalHours <= 0) { 
                this.totalHours = 0;
                join=false;
            }
        }

        /** If this company has run out of hours or budget cannot compete! */
        if(( this.budget === 0 ) || (this.totalHours === 0) || isNaN(this.budget)){
            this.sendMessage({type:'warning', msg:"Sorry, you can't compete on the oppy "+oppy.getID()+" because you run out of budget or hours.Current budget : "+this.budget+" current hours : "+this.totalHours});
            this.addOppyNotCompeted(oppy.getID(), quarter);
            join=false;
        }

        return(join);
    }

    improveFeature(featureName, points){
        if(this.improvablePointsFeatures - points < 0)
            return (false)

        this.productFeatures.forEach( f => {
            if(f.name === featureName)
              f.score +=points;
        })
        this.improvablePointsFeatures -=points;
        return (true)
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

    hirePerson(person){
        if (typeof person !== 'undefined' && person !== null) {
            if(this.budget - person.getCost() < 0)
                return (false)

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

    getProposal() { return this.proposal}

    marketingCampain(cost, hours){

        if((this.budget - cost < 0) || (this.totalHours - hours < 0))
            return (false)

        this.budget -=cost;
        this.totalHours -=hours;


        if(cost > 0) {
            this.brendRecognition += cost / settings.campainCostBrandRatio   + 
            Math.floor(cost / (settings.campainCostHourRatio * hours)) * settings.campainOverflow +     // Overflow Cost
            Math.floor((settings.campainCostHourRatio * hours) / cost) * settings.campainOverflow;      // Overflow Hours
        }

        
        return (true)
    }

    decreaseBrendRecognition(p){ this.brendRecognition *= (1-p/100)}

    payHours(hours) { 
        if(this.totalHours - hours < 0)
            return (false);

        this.totalHours-=hours
        return (true);
    }

    payMoney(money) {
        console.log("Budget pre operation : ", this.budget, "Money to pay : ",money);
        if(this.budget - money < 0)
            return (false);

        this.budget-=money 
        console.log("Budget after operation : ", this.budget);
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


    getValues(){ return(this) }
}

module.exports = Company;