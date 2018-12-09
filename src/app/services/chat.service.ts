import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const CHAT_URL = 'ws://itmil-ves:1337/';

export interface Message {
	type: string,
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
				let data = JSON.parse(response.data);
				return (data) 
			});
  }
  
}
