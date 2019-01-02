import { Component, OnInit } from '@angular/core';
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

  constructor(private messageService: MessageService) { }

  ngOnInit() {

    this.messageService.setPageStatus("Market");


  }

}
