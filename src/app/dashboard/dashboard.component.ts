import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service'
import { CookieService } from 'ngx-cookie-service';
import { PresalesService } from '../services/presales.service';
import { MarketService } from '../services/market.service';
import { Company } from '../shared/company';
import picasso from 'picasso.js';
import barChart from '../shared/barChart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private companyID:string=null;
  private gameID: string=null;

  private company:Company;
  private team=[];
  private marketTrends=[];
  private avgSatisfaction;

  constructor(private companyService: CompanyService, 
              private cookieService: CookieService,
              private presalesService: PresalesService,
              private marketService: MarketService) { }

  ngOnInit() {
    this.companyID = this.cookieService.get('companyID');
    this.gameID = this.cookieService.get('gameID');


    this.marketService.getTeamAvgSatisfaction(this.companyID, this.companyID)
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
      


      picasso.chart({
        element: document.querySelector('#chartProductFeatures'), // This is the element to render the chart in
        data: [{
          type: 'matrix',
          data: this.company['productFeatures']
        }],
        settings: barChart
      })
    } );
    


  }

}
