import { Component, OnInit } from '@angular/core';
import { PresalesService } from '../services/presales.service'
import { CookieService } from 'ngx-cookie-service';
import picasso from 'picasso.js';
import PicassoCharts from '../shared/PicassoCharts.js';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  private gameID;
  private companyID;
  private marketTrends=[];

  constructor(private presalesService: PresalesService,
              private messageService: MessageService,
              private cookieService: CookieService) { }

  ngOnInit() {

    this.messageService.setPageStatus("Market");
    this.gameID = this.cookieService.get('gameID');
    this.companyID = this.cookieService.get('companyID');

    this.presalesService.getPresales(this.gameID)
    .subscribe( res =>{

      var _this=this;
      Object.keys(res['data'][Object.keys(res['data'])[0]]['marketTrends']).forEach(function(trend) {
        _this.marketTrends.push({name:trend, score:res['data'][Object.keys(res['data'])[0]]['marketTrends'][trend]})
      })    

      picasso.chart({
        element: document.querySelector('#chartMarketTrends'), // This is the element to render the chart in
        data: [{
          type: 'matrix',
          data: this.marketTrends
        }],
        settings: PicassoCharts.barchart
      })
    })

  }

}
