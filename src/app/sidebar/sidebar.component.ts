import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private companyName:string;
  private companyID:string;
  private gameID:string;
  private companyDetails;
  private subscription: Subscription;
  
  constructor(private messageService: MessageService) { 
  
    this.subscription = this.messageService.getCompany()
    .subscribe( selectedState => {
      this.companyDetails = selectedState;
    })
  }

  ngOnInit() {
  
  }

}
