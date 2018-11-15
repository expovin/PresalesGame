import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service'



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private companyName:string;

  constructor(private messageService: MessageService) { }

  ngOnInit() {      

  }

}
