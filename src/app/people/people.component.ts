import { Component, OnInit, ViewChild } from '@angular/core';
import { PresalesService } from '../services/presales.service';
import { CompanyService } from '../services/company.service';
import { CookieService } from 'ngx-cookie-service';
import { Presale } from '../shared/presale';
import { ChartsComponent } from '../charts/charts.component'



@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @ViewChild(ChartsComponent) child:ChartsComponent;

  private selectedPerson={
    skills:[{score:0},{score:0},{score:0}]
  };
  private marketTrends={};
  private labels=[];
  private lablesChart=[];
  private personalScore=[];
  private marketScore=[];

  private isTrend:boolean=true;
  private lableButton:string="Show Features";
  private companyID:string=null;
  private gameID: string=null;
  private presalesPeople=[];
  constructor(private presalesService: PresalesService,
              private companyService: CompanyService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.gameID = this.cookieService.get('gameID');
    this.companyID = this.cookieService.get('companyID');
    this.presalesService.getPresales(this.gameID)
    .subscribe( res =>{
      //this.presalesPeople = res['data'];

      this.marketTrends=res['data'][Object.keys(res['data'])[0]]['marketTrends'];
      console.log(this.marketTrends);
      var _this=this;
      Object.keys(res['data']).forEach(function(personID) {
        _this.presalesPeople.push(res['data'][personID])
      });
    })

/*
    this.companyService(this.companyID, this.gameID)
    .subscribe( res =>{

    })
*/
  }

  toggleChart(){
    this.isTrend = !this.isTrend;
    if(!this.isTrend)
      this.lableButton="Show Trends"
    else
      this.lableButton="Show Features"

   this.SelectPerson(this.selectedPerson);
  }

  SelectPerson(person){
    this.selectedPerson=person;
    this.labels=[];
    this.personalScore=[];
    this.marketScore=[];


    if(this.isTrend){
      this.selectedPerson['PersonTrends'].forEach( (t) =>{
        this.lablesChart=['Personal Trends','Market Trends'];
        this.labels.push(t.name);
        this.personalScore.push(t.score);
        this.marketScore.push(this.marketTrends[t.name])
      })
    }
    else {
      this.selectedPerson['features'].forEach( f =>{
        this.lablesChart=['Personal Features','Market Features'];
        this.labels.push(f.name);
        this.personalScore.push(f.score);
      })
    }




    var _this=this;
    setTimeout( function(){_this.child.updateChart()},0)
    

  }

  
}
