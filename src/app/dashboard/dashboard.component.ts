import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  company={};

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    console.log("Getting Company details");
    this.company={};
    this.companyService.getDetails('8dc0d03351ad90c857d256635742f81f','m').subscribe( CompanyDet => this.company=CompanyDet);
    console.log(this.company);
  }

}
