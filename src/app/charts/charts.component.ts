import { Component, OnInit, Input } from '@angular/core';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  private chart;
  @Input('labels') labels:[string];
  @Input('personalScore') personalScore:[number];
  @Input('avgTeamScore') avgTeamScore:[number];
  @Input('avgTeamScoreMax') avgTeamScoreMax:[number];
  @Input('numPeople') numPeople;
  @Input('lablesChart') lablesChart;



  constructor() { }

  ngOnInit() {
  }

  updateChart(){
    let title=this.lablesChart[0]+" vs. "+this.lablesChart[1];
    this.chart = new Chart({
      chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: title,
        x: -80
    },
/*
    tooltip: {
        formatter: function() {
            return 'The value for <b>' + this.x + '</b> is <b>' + this.y + '</b>, in series '+ this.series.name+' you already have '+this.title[this.x]+' people, in your tema';
        }
    },
    */

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: this.labels,
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        //gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
    },

    series: [{
        name: this.lablesChart[0],
        data: this.personalScore
    }, {
        name: this.lablesChart[1],
        data: this.avgTeamScore
    }, {
        name: this.lablesChart[2],
        data: this.avgTeamScoreMax
    }]
});  
  }

    
}
