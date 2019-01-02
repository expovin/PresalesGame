import { Component, OnInit } from '@angular/core';
import { OpportunitiesService } from '../services/opportunities.service'
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service'
import { Config } from '../shared/config.js';
import picasso from 'picasso.js';
import PicassoCharts from '../shared/PicassoCharts.js';
import { CompanyService } from '../services/company.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css']
})
export class OpportunitiesComponent implements OnInit {

  private gameID: string=null;
  private opportunities=[];
  private plottigPoint=[];
  private selectedOppy={};
  private isOppySelected:boolean=false;
  private companyID;
  private company;
  private notifier; 
  private lblValue="Enable";
  private lblQualification="Enable";
  private btnClassArray={};
  private config=Config;


  constructor(private opportunitiesService: OpportunitiesService, 
              private companyService: CompanyService,
              private notifierService: NotifierService,
              private messageService: MessageService,
              private cookieService: CookieService) { this.notifier = this.notifierService; }

  ngOnInit() {

    this.messageService.setPageStatus("Opportunities");
    this.gameID = this.cookieService.get('gameID');
    this.companyID = this.cookieService.get('companyID');

    this.companyService.getDetails(this.companyID,this.gameID)
    .subscribe( CompanyDet =>{
      this.company=CompanyDet['data'];
      this.modifyQualificationArray(0);
    })
    
    
    this.opportunitiesService.getOpportunities(this.gameID)
    .subscribe( res =>{
      this.opportunities=res['data'];

      this.plottigPoint.push(['Year', 'Month', 'Sales', 'Margin']);
      this.opportunities.forEach( o =>{
        this.plottigPoint.push(["FIX",o['CompanyName'],o['teoricalValue'],o['qualificationLevel']]);
      })

      picasso.chart({
        element: document.querySelector('#chartOpportunities'), // This is the element to render the chart in
        data: [{
          type: 'matrix',
          data: this.plottigPoint
        }],
        settings: PicassoCharts.scatterplot
      })
    })
  }

  SelectOppy(oppy){
    this.isOppySelected=true;
    this.selectedOppy=oppy;
  }

  toggleConstraint(type){
    

      if(!this.company.oppyConstraint.flgValue)
        this.lblValue="Disable";
      else
        this.lblValue="Enable";

      this.companyService.toggleValueConstraint(this.companyID,this.gameID)
      .subscribe( res =>{
        if(res['result'] === 'OK'){
          this.notifier.notify( 'success', 'Retention Bonus succesfully assigned');
        }
        else
          this.notifier.notify( 'error', 'Error while assigning the retention Bonus');
  
        this.ngOnInit();
      })


      if(!this.company.oppyConstraint.flgQualification)
        this.lblQualification="Disable";
      else
        this.lblQualification="Enable";

      this.companyService.toggleValueQualification(this.companyID,this.gameID)
      .subscribe( res =>{
        if(res['result'] === 'OK'){
          this.notifier.notify( 'success', 'Retention Bonus succesfully assigned');
        }
        else
          this.notifier.notify( 'error', 'Error while assigning the retention Bonus');
  
        this.ngOnInit();
      })
    
  }  

  changeConstraint(type){



      this.companyService.changeValueConstraint(this.companyID,this.gameID, this.company.oppyConstraint.Value)
      .subscribe( res =>{
        if(res['result'] === 'OK'){
          this.notifier.notify( 'success', 'Retention Bonus succesfully assigned');
        }
        else
          this.notifier.notify( 'error', 'Error while assigning the retention Bonus');
  
        this.ngOnInit();
      })

      console.log(this.company.oppyConstraint.Qualification);
      this.companyService.changeValueQualification(this.companyID,this.gameID, this.company.oppyConstraint.Qualification)
      .subscribe( res =>{
        if(res['result'] === 'OK'){
          this.notifier.notify( 'success', 'Retention Bonus succesfully assigned');
        }
        else
          this.notifier.notify( 'error', 'Error while assigning the retention Bonus');
  
        this.ngOnInit();
      })

  }

  modifyQualificationArray(level){

    if(level !== 0 ){
      var index = this.company.oppyConstraint.Qualification.indexOf(level);
      if (index > -1) {
        this.company.oppyConstraint.Qualification.splice(index, 1);
      } else {
        this.company.oppyConstraint.Qualification.push(level);
      }
    }


    this.btnClassArray={};
    for(var i=1; i<6; i++){
      if(this.company.oppyConstraint.Qualification.indexOf(i) !== -1)
        this.btnClassArray[i+"B"]="btn btn-success";
      else
        this.btnClassArray[i+"B"]="btn btn-danger";
    }
  }
}
