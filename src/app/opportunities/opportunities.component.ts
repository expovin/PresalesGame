import { Component, OnInit } from '@angular/core';
import { OpportunitiesService } from '../services/opportunities.service'
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service'
import { Opportunity } from '../shared/oppy';
import picasso from 'picasso.js';
import PicassoCharts from '../shared/PicassoCharts.js';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css']
})
export class OpportunitiesComponent implements OnInit {

  private gameID: string=null;
  private opportunities=[];
  private plottigPoint=[];
  private selectedOppy={};
  private isOppySelected:boolean=false;

  constructor(private opportunitiesService: OpportunitiesService, 
              private cookieService: CookieService) { }

  ngOnInit() {

    this.gameID = this.cookieService.get('gameID');

    this.opportunitiesService.getOpportunities(this.gameID)
    .subscribe( res =>{
      this.opportunities=res['data'];

      this.plottigPoint.push(['Year', 'Month', 'Sales', 'Margin']);
      this.opportunities.forEach( o =>{
        this.plottigPoint.push(["FIX",o['CompanyName'],o['teoricalValue'],o['qualificationLevel']]);
      })

      picasso.chart({
        element: document.querySelector('#chartOpportunities'), // This is the element to render the chart in
        data: [{
          type: 'matrix',
          data: this.plottigPoint
        }],
        settings: PicassoCharts.scatterplot
      })
    })
  }

  SelectOppy(oppy){
    this.isOppySelected=true;
    this.selectedOppy=oppy;
  }
}
