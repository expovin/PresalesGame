import { Component, OnInit } from '@angular/core';
import { OpportunitiesService } from '../services/opportunities.service'
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service'
import { Opportunity } from '../shared/oppy';


@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css']
})
export class OpportunitiesComponent implements OnInit {

  private gameID: string=null;
  private opportunities=[];

  constructor(private opportunitiesService: OpportunitiesService, 
              private cookieService: CookieService) { }

  ngOnInit() {

    this.gameID = this.cookieService.get('gameID');

    this.opportunitiesService.getOpportunities(this.gameID)
    .subscribe( res =>{
      this.opportunities=res['data'];
    })
  }

}
