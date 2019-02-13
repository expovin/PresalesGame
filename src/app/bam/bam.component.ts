import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { QrsService } from '../services/qrs.service';
import { CookieService } from 'ngx-cookie-service';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { Config } from '../shared/config';
@Component({
  selector: 'app-bam',
  templateUrl: './bam.component.html',
  styleUrls: ['./bam.component.css']
})
export class BamComponent implements OnInit {

  private iFrameUrl;
  private idxSheet:number=0;;
  private prog:number=0;
  private sheetConnect:string="&sheet=";
  private ticketConnect:string="&qlikTicket="
  private qsTrigram:string;

  constructor(private messageService: MessageService,
              private qrsService : QrsService,
              private cookieService: CookieService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.messageService.setPageStatus("BAM");

    this.qsTrigram = this.cookieService.get('trigram');
    this.qrsService.getQSToken(this.qsTrigram)
    .subscribe ( ticket =>{
      var baseUrl=Config.BaseUtl;
      var appId=Config.MAB.AppId; 
      var sheetId=Config.MAB.Sheets[this.idxSheet]; 
      var url=baseUrl+appId+this.sheetConnect+sheetId+this.ticketConnect+ticket.data.Ticket;
      this.iFrameUrl=this.sanitizer.bypassSecurityTrustResourceUrl(url);
    })
  }

  pageNext(){
    console.log("Next Page");
    this.qrsService.getQSToken(this.qsTrigram)
    .subscribe( ticket =>{
      let numEle = Config.MAB.Sheets.length;
      this.prog++;
      this.idxSheet=this.prog % numEle;
      var url=Config.BaseUtl+Config.MAB.AppId+this.sheetConnect+Config.MAB.Sheets[this.idxSheet]+this.ticketConnect+ticket.data.Ticket;
      this.iFrameUrl=this.sanitizer.bypassSecurityTrustResourceUrl(url);
      console.log(url);
    })

  }

  pagePrev(){
    console.log("Previous Page");
    this.qrsService.getQSToken(this.qsTrigram)
    .subscribe( ticket =>{
      let numEle = Config.MAB.Sheets.length;
      this.prog--;
      this.idxSheet=this.prog % numEle;
      var url=Config.BaseUtl+Config.MAB.AppId+this.sheetConnect+Config.MAB.Sheets[this.idxSheet]+this.ticketConnect+ticket.data.Ticket;
      this.iFrameUrl=this.sanitizer.bypassSecurityTrustResourceUrl(url);   
      console.log(url);
    })    
  }

}
