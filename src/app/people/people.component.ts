import { Component, OnInit, ViewChild } from '@angular/core';
import { PresalesService } from '../services/presales.service';
import { CompanyService } from '../services/company.service';
import { MarketService } from '../services/market.service';
import { CookieService } from 'ngx-cookie-service';
import { Presale } from '../shared/presale';
import { ChartsComponent } from '../charts/charts.component'
import { NotifierService } from 'angular-notifier';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @ViewChild(ChartsComponent) child:ChartsComponent;

  private selectedPerson={
    skills:[{score:0},{score:0},{score:0}]
  };
  private marketTrends={};
  private labels=[];
  private lablesChart=[];
  private personalScore=[];
  private avgTeamScore=[];
  private avgTeamScoreMax=[];
  private numPeople={};
  private notifier;
  private avgTeamTrends={};

  private isPersonSelected:boolean=false;
  private isTrend:boolean=true;
  private lableButton:string="Show Features";
  private companyID:string=null;
  private companyFeatures=[];
  private gameID: string=null;
  private presalesPeople=[];
  private offer=0;
  private companyNameDict={};
  private showEmployed:boolean;
  constructor(private presalesService: PresalesService,
              private companyService: CompanyService,
              private marketService: MarketService,
              private notifierService: NotifierService,
              private messageService: MessageService,
              private cookieService: CookieService) { 
    
              this.notifier = this.notifierService;
              }

  ngOnInit() {
    this.messageService.setPageStatus("People");
    this.gameID = this.cookieService.get('gameID');
    this.companyID = this.cookieService.get('companyID');

    var _this=this;
    this.companyService.getCompanies(this.gameID)
    .subscribe( Companies =>{
      Object.keys(Companies['data']).forEach(function(companyId) {
        _this.companyNameDict[companyId] = Companies['data'][companyId]['name'];
      })
    });
    
    
    this.presalesService.getPresales(this.gameID)
    .subscribe( res =>{
      this.marketTrends=res['data'][Object.keys(res['data'])[0]]['marketTrends'];
      var _this=this;
      Object.keys(res['data']).forEach(function(personID) {
        _this.presalesPeople.push(res['data'][personID]);
      });
    })



    this.companyService.getDetails(this.companyID,this.gameID)
    .subscribe( CompanyDet =>{
      this.companyFeatures=CompanyDet['data']['ProductBasicFeatures'];
    } );

    this.marketService.getTeamAvgTrends(this.gameID,this.companyID)
    .subscribe( res =>{
        this.avgTeamTrends=res['data'];
    } );    

  }

  onChangeShowEmpoyed(){
    console.log(this.showEmployed);
  }

  toggleChart(){
    this.isTrend = !this.isTrend;
    if(!this.isTrend)
      this.lableButton="Show Trends"
    else
      this.lableButton="Show Features"

   this.SelectPerson(this.selectedPerson);
  }

  placeOffer(){
    console.log("Stai Offrendo ",this.offer);

    this.marketService.placeOffer(this.gameID,this.companyID,this.selectedPerson['ID'],this.offer)
    .subscribe( res =>{
      console.log(res);
    } );

    this.notifier.notify( 'info', 'You placed an offer to '+this.selectedPerson['name'] );

  }




  SelectPerson(person){
    this.selectedPerson=person;
    this.labels=[];
    this.personalScore=[];
    this.avgTeamScore=[];
    this.avgTeamScoreMax=[];
    this.offer=this.selectedPerson['cost'];
    this.isPersonSelected=true;


    if(this.isTrend){
      this.selectedPerson['PersonTrends'].forEach( (t) =>{
        this.lablesChart=['Personal Trends','Avg Team Trends', 'Avg Team Trends Max'];
        this.labels.push(t.name);
        this.personalScore.push(t.score);
        this.avgTeamScore.push(this.avgTeamTrends[t.name][1]);
        this.avgTeamScoreMax.push(this.avgTeamTrends[t.name][0]);
        this.numPeople[t.name]=this.avgTeamTrends[t.name][2];
      })
    }
    else {
      this.selectedPerson['features'].forEach( f =>{
        this.lablesChart=['Personal Features','Market Features'];
        this.labels.push(f.name);
        this.personalScore.push(f.score);
        this.companyFeatures.forEach( cf => {
          if(cf.name === f.name)
          this.avgTeamScore.push(cf.score)
        })

      })
    }




    var _this=this;
    setTimeout( function(){_this.child.updateChart()},250)
    

  }

  
}
