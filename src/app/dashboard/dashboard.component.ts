import { Component, OnInit, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { CompanyService } from '../services/company.service';
import { CookieService } from 'ngx-cookie-service';
import { PresalesService } from '../services/presales.service';
import { MarketService } from '../services/market.service';
import { Company } from '../shared/company';
import picasso from 'picasso.js';
import PicassoCharts from '../shared/PicassoCharts.js';
import { NotifierService } from 'angular-notifier';
import { ChartsComponent } from '../charts/charts.component'
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs/Subscription';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(ChartsComponent) child:ChartsComponent;

  private closeResult: string;

  private companyID:string=null;
  private gameID: string=null;

  private company:Company;
  private team=[];
  private peopleToConfirm=[];
  private proposals=[];
  private marketTrends={};
  private marketTrendsList=[];
  private avgSatisfaction;
  private notifier;
  private labelBAM="Enable BAM";
  private labelTOP="Enable TOP";
  private hoursToInvest:number=0;
  private moneyToInvest:number=0;
  private userDetails:number=0;
  private selectedPerson=null;
  private labels=[];
  private personalScore=[];
  private marketScore=[];
  private lablesChart=[];
  private isTrends:boolean=true;
  private meritIncrease:number;
  private retentionBonus:number;
  private featureToImprove:string;
  private isFeatureSuggestion:boolean=false;
  private subscription: Subscription;
  private isTracked:boolean=false;

  private trendToImprove:string;
  private isTrendSuggestion:boolean=false;

  private filterargs;
  private courseHoursCost = [10, 20, 40];
  private courseMoneyCost = [2, 4, 8];
  private courseIncreaseUpTo = [10, 20, 40];
  private courseIndexCost = -1;


  constructor(private companyService: CompanyService,
              private cookieService: CookieService,
              private notifierService: NotifierService,
              private presalesService: PresalesService,
              private messageService: MessageService,
              public ngxSmartModalService: NgxSmartModalService,
              private marketService: MarketService,
              @Inject(DOCUMENT) private document: Document) 
              { 
                
                this.notifier = this.notifierService; 
              }

  ngOnInit() {


    this.companyID = this.cookieService.get('companyID');
    this.gameID = this.cookieService.get('gameID');

    if(this.companyID === undefined || this.gameID === undefined || this.companyID === "" || this.gameID === ""){
      console.log("Company not created yet. Redirect to landing!");
      let hostname=this.document.location.protocol+"//"+this.document.location.hostname+":"+this.document.location.port +"/landing";
      window.location.href = hostname;
    }

    this.userDetails=0;
    this.messageService.setPageStatus("Dashboard");

    this.marketService.getTeamAvgSatisfaction(this.gameID, this.companyID)
    .subscribe ( res =>{
      this.avgSatisfaction=res['data'];
    })


    this.companyService.getDetails(this.companyID,this.gameID)
    .subscribe( CompanyDet =>{
      this.company=CompanyDet['data'];
      this.messageService.setCompany(this.company);

      this.team=[];
      
      CompanyDet['data']['presalesTeam'].forEach( p =>{
        this.presalesService.getPresale(p,this.gameID)
        .subscribe( person =>{
          this.team.push(person['data']['person']);
          this.marketTrends=person['data']['marketTrends'];
          //this.selectedPerson=this.team[0];

          var _this=this;
          Object.keys(this.marketTrends).forEach(function(trend) {
            _this.marketTrendsList.push({name:trend, score:_this.marketTrends[trend]})
            
          });
        })
      })
      this.peopleToConfirm=[];
      CompanyDet['data']['peopleToConfirm'].forEach( p =>{
        this.presalesService.getPresale(p,this.gameID)
        .subscribe( person =>{
          this.peopleToConfirm.push(person['data']['person']);
        })
      })
      
      this.proposals=[];
      CompanyDet['data']['proposal'].forEach( p =>{
        this.presalesService.getPresale(p,this.gameID)
        .subscribe( person =>{

          this.proposals.push(person['data']['person']);
        })
      })

      picasso.chart({
        element: document.querySelector('#chartProductFeatures'), // This is the element to render the chart in
        data: [{
          type: 'matrix',
          data: this.company['productFeatures']
        }],
        settings: PicassoCharts.barchart
      })
    } );
  }

  toggleBAM(){

    if(!this.company['isBAMEnabled']){
      this.companyService.enableBAM(this.companyID,this.gameID)
      .subscribe( res =>{
        if(res['result'] === 'OK'){
          this.labelBAM="Disable BAM";
          this.notifier.notify( 'success', 'BAM has been enabled');          
        }         
        else
          this.notifier.notify( 'error', 'Error while enabling BAM');
      })
    } else {
      this.companyService.disableBAM(this.companyID,this.gameID)
      .subscribe( res =>{
        
        if(res['result'] === 'OK'){
          this.labelBAM="Enable BAM"
          this.notifier.notify( 'success', 'BAM has been disabled');
        }
          
        else
          this.notifier.notify( 'error', 'Error while disabling BAM');
      })
    }
    this.messageService.setCompany(this.company);
    this.ngOnInit();

  }

  toggleTOP(){

    if(!this.company['isTOPEnabled']){
      this.companyService.enableTOP(this.companyID,this.gameID)
      .subscribe( res =>{
        if(res['result'] === 'OK'){
          this.labelTOP="Disable TOP";
          this.notifier.notify( 'success', 'TOP has been enabled');
        }         
        else
          this.notifier.notify( 'error', 'Error while enabling TOP');
      })
    } else {
      this.companyService.disableTOP(this.companyID,this.gameID)
      .subscribe( res =>{
        
        if(res['result'] === 'OK'){
          this.labelTOP="Enable TOP"
          this.notifier.notify( 'success', 'TOP has been disabled');
        }
          
        else
          this.notifier.notify( 'error', 'Error while disabling TOP');
      })
    }

    this.messageService.setCompany(this.company);
    this.ngOnInit();

  }

  getCampain(){
    console.log("hours: ",this.hoursToInvest," Money : ",this.moneyToInvest);
    this.companyService.getCampain(this.companyID,this.gameID,this.hoursToInvest, this.moneyToInvest)
    .subscribe( res =>{
      
      if(res['result'] === 'OK'){
        this.notifier.notify( 'success', 'Marketing Campain has succesfully run');
      }
      else
        this.notifier.notify( 'error', 'Error while getting Marketing Campain');

      this.hoursToInvest=0;
      this.moneyToInvest=0;
      this.ngOnInit();
    })
    
  }

  toggleCourses(person, status){

    this.labels=[];
    this.personalScore=[];
    this.marketScore=[];



    if(this.isTrends){
      person.PersonTrends.forEach( t=> {
        this.labels.push(t.name);
        this.personalScore.push(t.score);
        this.marketScore.push(this.marketTrends[t.name]);
      })
      this.lablesChart=["Personal Trends","Market Trends"];
    } else {

      let featuresTranscode={};
      person.features.forEach( s=> {
        featuresTranscode[s.name]=s.score;
      })      

      this.company['productFeatures'].forEach( f =>{
      this.labels.push(f.name);      
      this.marketScore.push(f.score);

      if(featuresTranscode[f.name] !== undefined)
        this.personalScore.push(featuresTranscode[f.name]);
      else
        this.personalScore.push(0);
      })
      this.lablesChart=["Personal Features","Product Features"];
      console.log(this.personalScore);
    }

    

    var _this=this;
    setTimeout( function(){_this.child.updateChart()},250);
    this.selectedPerson=person;    
    this.userDetails=status;
  }

  toggleChart(){
    
    this.isTrends= !this.isTrends;
    this.toggleCourses(this.selectedPerson,this.userDetails);
  }

  giveMeritIncrease(){
    console.log("You are givince merit increase : ", this.meritIncrease);
  }

  giveRetentiononus(){
    console.log("You are givince retention Bonus : ", this.retentionBonus);
    this.marketService.offerRetentionBonus(this.gameID, this.companyID, this.selectedPerson.ID, this.retentionBonus)
    .subscribe ( res =>{
      if(res['result'] === 'OK'){
        this.notifier.notify( 'success', 'Retention Bonus succesfully assigned');
      }
      else
        this.notifier.notify( 'error', 'Error while assigning the retention Bonus');

      this.ngOnInit();
    })    
  }

  removeOffer(candidateId){
    this.marketService.removeOffer(this.gameID, this.companyID, candidateId)
    .subscribe ( res =>{
      if(res['result'] === 'OK'){
        this.notifier.notify( 'success', 'Retention Bonus succesfully assigned');
      }
      else
        this.notifier.notify( 'error', 'Error while assigning the retention Bonus');

      this.ngOnInit();
    })    
  }

  featureSuggestion(){

    if(this.featureToImprove.length > 1){
      this.filterargs={name:this.featureToImprove}
      this.isFeatureSuggestion=true;
    } else {
      this.isFeatureSuggestion=false;
    }
  }  

  trendSuggestion(){

    if(this.trendToImprove.length > 1){
      this.filterargs={name:this.trendToImprove}
      this.isTrendSuggestion=true;
    } else {
      this.isTrendSuggestion=false;
    }
  }  

  enrollCourse(type){
    if(type === 1 ) this.featureToImprove = this.trendToImprove;

    this.marketService.enrollCourse(this.gameID, this.companyID, 
                                    this.selectedPerson.ID, 
                                    this.featureToImprove, 
                                    this.courseMoneyCost[this.courseIndexCost],
                                    this.courseHoursCost[this.courseIndexCost],
                                    this.courseIncreaseUpTo[this.courseIndexCost],
                                    type )
    .subscribe ( res =>{
      if(res['result'] === 'OK'){
        this.notifier.notify( 'success', 'Retention Bonus succesfully assigned');
        this.ngOnInit();
      }
      else
        this.notifier.notify( 'error', 'Error while assigning the retention Bonus');

      
    })  
  }

  confirmPerson(person){
    this.marketService.confirmOffer(this.gameID, this.companyID, person)
    .subscribe( res =>{
      if(res['result'] === 'OK'){
        this.notifier.notify( 'success', 'Person succesfully confirmed');
        this.ngOnInit();
      }
      else
        this.notifier.notify( 'error', 'Error while Confirming this person');
    })
  }

  discardPerson(person){
    this.marketService.declineOffer(this.gameID, this.companyID, person)
    .subscribe( res =>{
      if(res['result'] === 'OK'){
        this.notifier.notify( 'warning', 'Person succesfully declined, You payed the penalty');
        this.ngOnInit();
      }
      else
        this.notifier.notify( 'error', 'Error while declined this person');
    })
  }

  removeCampain(idx){
    console.log("Remove campain having index : ",idx);
    this.companyService.delCampain(this.companyID, this.gameID, idx)
    .subscribe( res =>{
      if(res['result'] === 'OK'){
        this.notifier.notify( 'warning', 'Campain removed');
        this.ngOnInit();
      }
      else
        this.notifier.notify( 'error', 'Error while removing campain');
    })    
  }

  improveFeature(){
    console.log("Improve feature ",this.featureToImprove," investing ",this.moneyToInvest);
    this.companyService.improveProductFeature(this.companyID, this.gameID, this.featureToImprove, this.moneyToInvest)
    .subscribe ( res =>{
      if(res['result'] === 'OK'){
        this.notifier.notify( 'success', 'You have succesfully increased your ',this.featureToImprove,' feature by ',this.moneyToInvest / 10,"%");        
        this.ngOnInit();
      }
      else
        this.notifier.notify( 'error', 'Error while increasing product feature');
    })
  }

}
