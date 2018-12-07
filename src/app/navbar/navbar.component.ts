import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { NotifierService } from 'angular-notifier';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';

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
  private notificationLable=['Disable Notification', 'Enable Notification'];
  private notificationLableIdx=0;
  private subscription: Subscription;
  private pageStatus:string;

  constructor(private notifierService: NotifierService,
              private companyService: CompanyService,
              private messageService: MessageService,
              private cookieService: CookieService) { 
              this.notifier = this.notifierService;

                this.subscription = this.messageService.getPageStatus()
                .subscribe( selectedState => {
                  this.pageStatus = selectedState;
                  console.log(this.pageStatus);
                })

              }

  ngOnInit() {      
    this.gameID = this.cookieService.get('gameID');
    this.companyID = this.cookieService.get('companyID');
    console.log("companyID from cookie : "+this.companyID);
  }

  toggleNotification(){
    this.isEnabledNotification= !this.isEnabledNotification;

    console.log("Notification Status : ",this.isEnabledNotification, " Lable : ",this.notificationLable[this.notificationLableIdx]);
    var _this=this;
    if(!this.isEnabledNotification){
      console.log("Abilito Notifiche");
      _this.notificationLableIdx=0;
      _this.stepNotify = setInterval(function(){ 
        _this.companyService.getMessage(_this.companyID,_this.gameID)
        .subscribe( res =>{
          if(res['data']){
            _this.notifier.notify( res['data']['type'], res['data']['msg'] );
          }
            
        } );
       }, 5000);
    } else {
      console.log("DisAbilito Notifiche");
      clearInterval(_this.stepNotify);
      _this.notificationLableIdx=1;
    }

  }

}
