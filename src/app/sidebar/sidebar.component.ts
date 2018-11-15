import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private companyName:string;
  
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.companyName = this.cookieService.get('companyName');
  }

}
