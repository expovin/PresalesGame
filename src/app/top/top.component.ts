import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { PresalesService } from '../services/presales.service'
import { CookieService } from 'ngx-cookie-service';
import picasso from 'picasso.js';
import PicassoCharts from '../shared/PicassoCharts.js';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  private gameID;
  private companyID;
  private marketTrends=[];

  constructor(private messageService: MessageService,
              private presalesService: PresalesService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.messageService.setPageStatus("TOP");
    this.gameID = this.cookieService.get('gameID');
    this.companyID = this.cookieService.get('companyID');

    this.presalesService.getPresales(this.gameID)
    .subscribe( res =>{

      var _this=this;
      Object.keys(res['data'][Object.keys(res['data'])[0]]['marketTrends']).forEach(function(trend) {
        _this.marketTrends.push({name:trend, score:res['data'][Object.keys(res['data'])[0]]['marketTrends'][trend]})
      })  

      this.marketTrends.sort((a,b) => {return(b.score - a.score)});  

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
