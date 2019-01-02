import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { DOCUMENT } from '@angular/common';

export interface Message {
	type: string,
	message: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

	public messages: Subject<Message>;

	constructor(wsService: WebsocketService,
							@Inject(DOCUMENT) private document: Document) {
								
		const CHAT_URL = 'ws://'+this.document.location.hostname+':1337/';
		this.messages = <Subject<Message>>wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return (data) 
			});
  }
  
}
