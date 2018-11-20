import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class AppComponent {
  title = 'The Presales Game';

  private isElaborating:boolean=false;

  constructor(private chatService: ChatService){

    chatService.messages.subscribe(msg => {			
      console.log("Response from websocket: " + msg['type']+" - "+msg['msg']);
      if(msg['type'] === 'start'){
        this.isElaborating=true;
      }
        

      if(msg['type'] === 'end'){
        console.log("Finish , still wait 5 sec.");
        setTimeout(function(){this.isElaborating=false;window.location.reload();}, 5000);
        
      }
        
    });
  }
}
