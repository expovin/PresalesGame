import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service'
import { CookieService } from 'ngx-cookie-service';
import { PresalesService } from '../services/presales.service';
import { MarketService } from '../services/market.service';
import { Company } from '../shared/company';
import picasso from 'picasso.js';
import PicassoCharts from '../shared/PicassoCharts.js';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private closeResult: string;

  private companyID:string=null;
  private gameID: string=null;

  private company:Company;
  private team=[];
  private proposals=[];
  private marketTrends=[];
  private avgSatisfaction;
  private notifier;
  private labelBAM="Enable BAM";
  private labelTOP="Enable TOP";
  private hoursToInvest:number=0;
  private moneyToInvest:number=0;

  constructor(private companyService: CompanyService,
              private cookieService: CookieService,
              private notifierService: NotifierService,
              private presalesService: PresalesService,
              private marketService: MarketService) { this.notifier = this.notifierService; }

  ngOnInit() {
    this.companyID = this.cookieService.get('companyID');
    this.gameID = this.cookieService.get('gameID');


    this.marketService.getTeamAvgSatisfaction(this.gameID, this.companyID)
    .subscribe ( res =>{
      this.avgSatisfaction=res['data'];
    })


    this.companyService.getDetails(this.companyID,this.gameID)
    .subscribe( CompanyDet =>{
      this.company=CompanyDet['data'];

      CompanyDet['data']['presalesTeam'].forEach( p =>{
        this.presalesService.getPresale(p,this.gameID)
        .subscribe( person =>{
          this.team.push(person['data']['person']);
        })
      })
      
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

      this.ngOnInit();
    })
    
  }

}
