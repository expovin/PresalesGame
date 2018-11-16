import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { NotifierService } from 'angular-notifier';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private notifier;
  private companyName:string;
  private companyID;
  private gameID;
  private isEnabledNotification:boolean=false;
  private stepNotify=null;

  constructor(private notifierService: NotifierService,
              private companyService: CompanyService,
              private cookieService: CookieService) { 
              this.notifier = this.notifierService;
              }

  ngOnInit() {      
    this.gameID = this.cookieService.get('gameID');
    this.companyID = this.cookieService.get('companyID');
    
  }

  toggleNotification(){
    this.isEnabledNotification=!this.isEnabledNotification;

    var _this=this;
    if(this.isEnabledNotification){
      this.stepNotify = setInterval(function(){ 
        _this.companyService.getMessage(_this.companyID,_this.gameID)
        .subscribe( res =>{
          console.log(res);
          if(res['data']){
            console.log(res['data']['type']+" - "+ res['data']['msg'])
            _this.notifier.notify( res['data']['type'], res['data']['msg'] );
          }
            
        } );
       }, 5000);
    } else {
      clearInterval(this.stepNotify);
      this.isEnabledNotification=null;
    }

  }

}
