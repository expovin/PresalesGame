import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elaboration',
  templateUrl: './elaboration.component.html',
  styleUrls: ['./elaboration.component.css']
})
export class ElaborationComponent implements OnInit {

  private progress:number=0;
  private step:number=5;
  private totTime:number=4000;
  private int;
  private interval;

  constructor() { }

  ngOnInit() {

    this.interval=this.totTime * this.step / 100 ;
/*
    this.int = setInterval( function(){
      this.progress +=this.step;
    }, this.interval);


    if (this.progress === 100)
      clearImmediate(this.int);
*/      
  }


}
