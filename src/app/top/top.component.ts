import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { QrsService } from '../services/qrs.service';
import { CookieService } from 'ngx-cookie-service';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { Config } from '../shared/config';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  private iFrameUrl;
  private idxSheet:number=0;;
  private prog:number=0;

  constructor(private messageService: MessageService,
              private qrsService : QrsService,
              private cookieService: CookieService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.messageService.setPageStatus("TOP");

    var trigram = this.cookieService.get('trigram');
    this.qrsService.getQSToken(trigram)
    .subscribe ( ticket =>{
      console.log(ticket);
      var baseUrl=Config.BaseUtl;
      var appId=Config.POT.AppId; 
      var sheetConnect="&sheet="
      var sheetId=Config.POT.Sheets[this.idxSheet]; 
      var ticketConnect="&qlikTicket="
      var url=baseUrl+appId+sheetConnect+sheetId+ticketConnect+ticket.data.Ticket;
      this.iFrameUrl=this.sanitizer.bypassSecurityTrustResourceUrl(url);
      console.log(this.iFrameUrl);
    })
  }

  pageNext(){
    console.log("Next Page");
    let numEle = Config.POT.Sheets.length;
    this.prog++;
    this.idxSheet=this.prog % numEle;
  }

  pagePrev(){
    console.log("Previous Page");
    let numEle = Config.POT.Sheets.length;
    this.prog--;
    this.idxSheet=this.prog % numEle;
  }

}
