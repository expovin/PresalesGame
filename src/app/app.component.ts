import { Component, OnInit, Injectable } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService ]
})

@Injectable()
export class AppComponent implements OnInit{ 
  title = 'The Presales Game';
  private companyID:string;
  private isFinish:boolean=false;
  private actions=[];
  private modalTitle:string;

  constructor(private chatService: ChatService,
              private cookieService: CookieService,
              private ngxSmartModalService: NgxSmartModalService,
              private spinner: NgxSpinnerService){

    this.chatService.messages.subscribe(
      msg => {			
        console.log(msg);
        if(msg['type'] === 'start'){
          this.isFinish=false;
          this.modalTitle=msg['msg'];
          this.ngxSmartModalService.getModal("modalMsgFromServer").open();
        }        
        if(msg['type'] === 'end'){
          this.isFinish=true;
          this.spinner.hide();
        }
        if(msg['type'] === 'actions'){
          this.actions.push(msg['msg']);
          console.log(this.actions);
        }
          
      },
      error =>{
        console.log("Error receiving webSocket message : ",error);
      },
      () =>{
        console.log("webSocket connection closed by Server side");
      }
    );
  }

  ngOnInit(){
      this.companyID = this.cookieService.get('companyID');
      var _this=this;
      setTimeout(function(){ _this.chatService.messages.next({type:'control', message:_this.companyID})}, 1000)
      this.spinner.show();
  }

  cleanStatus(){
    this.ngxSmartModalService.getModal('modalMsgFromServer').close();
    this.actions=[];
    window.location.reload()
  }
}
