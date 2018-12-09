import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class AppComponent implements OnInit{ 
  title = 'The Presales Game';
  private companyID:string;
  private isFinish:boolean=false;
  private actions=[];
  private modalTitle:string;

  constructor(private chatService: ChatService,
              private cookieService: CookieService,
              private ngxSmartModalService: NgxSmartModalService){

    this.chatService.messages.subscribe(
      msg => {			
        if(msg['type'] === 'start'){
          this.isFinish=false;
          this.modalTitle=msg['msg'];
          this.ngxSmartModalService.getModal("modalMsgFromServer").open();
        }        
        if(msg['type'] === 'end'){
          this.isFinish=true;

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
      setTimeout(function(){ _this.chatService.messages.next({type:'control', message:_this.companyID})}, 500)
      
  }

  cleanStatus(){
    this.ngxSmartModalService.getModal('modalMsgFromServer').close();
    this.actions=[];
    window.location.reload()
  }
}
