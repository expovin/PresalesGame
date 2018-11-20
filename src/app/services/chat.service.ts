import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const CHAT_URL = 'ws://localhost:1337/';

export interface Message {
	author: string,
	message: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				console.log(response.data);
				let data = JSON.parse(response.data);
				return (data) 
			});
  }
  
}
