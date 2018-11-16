import { Component, OnInit, ViewChild } from '@angular/core';
import { PresalesService } from '../services/presales.service';
import { CompanyService } from '../services/company.service';
import { MarketService } from '../services/market.service';
import { CookieService } from 'ngx-cookie-service';
import { Presale } from '../shared/presale';
import { ChartsComponent } from '../charts/charts.component'
import { NotifierService } from 'angular-notifier';

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
  private marketScore=[];
  private notifier;

  private isTrend:boolean=true;
  private lableButton:string="Show Features";
  private companyID:string=null;
  private companyFeatures=[];
  private gameID: string=null;
  private presalesPeople=[];
  private offer=0;
  constructor(private presalesService: PresalesService,
              private companyService: CompanyService,
              private marketService: MarketService,
              private notifierService: NotifierService,
              private cookieService: CookieService) { 
    
              this.notifier = this.notifierService;
              }

  ngOnInit() {
    this.gameID = this.cookieService.get('gameID');
    this.companyID = this.cookieService.get('companyID');

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
      console.log(CompanyDet['data']);
      this.companyFeatures=CompanyDet['data']['ProductBasicFeatures'];
    } );

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
    this.marketScore=[];
    this.offer=this.selectedPerson['cost'];


    if(this.isTrend){
      this.selectedPerson['PersonTrends'].forEach( (t) =>{
        this.lablesChart=['Personal Trends','Market Trends'];
        this.labels.push(t.name);
        this.personalScore.push(t.score);
        this.marketScore.push(this.marketTrends[t.name])
      })
    }
    else {
      this.selectedPerson['features'].forEach( f =>{
        this.lablesChart=['Personal Features','Market Features'];
        this.labels.push(f.name);
        this.personalScore.push(f.score);
        this.companyFeatures.forEach( cf => {
          if(cf.name === f.name)
          this.marketScore.push(cf.score)
        })

      })
    }




    var _this=this;
    setTimeout( function(){_this.child.updateChart()},0)
    

  }

  
}
