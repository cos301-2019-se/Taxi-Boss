import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ViolationService } from '../../../shared/violation.service';

@Component({
  selector: 'violations-pie',
  templateUrl: './violations-pie.component.html',
  styleUrls: ['./violations-pie.component.scss']
})
export class ViolationsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  violationCategories: any={};
  violationCounts: any={};
  constructor(private theme: NbThemeService, private violationService:ViolationService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.getData().then(()=>{
        // console.log(this.violationCategories);
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.violationCategories,
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Violations',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: 'Germany' },
              { value: 310, name: 'France' },
              { value: 234, name: 'Canada' },
              { value: 135, name: 'Russia' },
              { value: 1548, name: 'USA' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  });
  }
  
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  async getData(){
    await this.violationService.getAllViolationsPerCategory().then(res=>this.populateData());
  }

  populateData(){
    for (var i = 0; i <this.violationService.getAllViolationsPerCategory.length; i++) {
      this.violationCategories[i]=this.violationService.numAllViolationsPerCategory[i].violationDescription;
      console.log(this.violationCategories[i]);
    }
  }
}
