import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { stringify } from '@angular/compiler/src/util';
import { ViolationService } from '../../../shared/violation.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'violations-bar',
  templateUrl: './violations-bar.component.html',
  styleUrls: ['./violations-bar.component.scss']
})
export class ViolationsBarComponent implements AfterViewInit, OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;
  noViolationsList: any;
  noViolations: any={};
  weekDays: any={};
  constructor(private theme: NbThemeService, private violationService:ViolationService) {
      this.noViolationsList=[];
      this.noViolations=new Array(7);
      this.weekDays=new Array(7);
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.getData().then(()=>{
        // console.log(this.noViolations);
        this.determineDays();
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.weekDays,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Violations',
            type: 'bar',
            barWidth: '60%',
            data: this.noViolations,
          },
        ],
      };
      
    });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(){
    // this.getData();
    // console.log(this.noViolations);
  }

  determineDays(){
    var day;
    var pipe = new DatePipe('en-US');
    for (var i = 0; i <this.violationService.numViolationsPerDayList.length; i++) {
      day=this.violationService.numViolationsPerDayList[i].date;
      this.weekDays[i]=pipe.transform(day,"EE");
    }
  }

  async getData(){
    await this.violationService.getNumViolationsPerDay().then(res=>this.populateData());
  }

  populateData(){
    for (var i = 0; i <this.violationService.numViolationsPerDayList.length; i++) {
      this.noViolations[i]=this.violationService.numViolationsPerDayList[i].count;
    }
  }
}
