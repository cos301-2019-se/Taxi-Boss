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
  formattedViolationList: any={};
  constructor(private theme: NbThemeService, private violationService:ViolationService) {
    this.violationCategories=new Array();
    this.formattedViolationList=new Array();
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
        series: [
          {
            name: 'Violations',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.formattedViolationList,
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
    var formattedViolation;
    // console.log(this.violationService.getAllViolationsPerCategory);
    for (var i = 0; i <this.violationService.numAllViolationsPerCategory.length; i++) {
      this.violationCategories.push(this.violationService.numAllViolationsPerCategory[i].violationDescription);
      formattedViolation={
        value: this.violationService.numAllViolationsPerCategory[i].count, 
        name: this.violationService.numAllViolationsPerCategory[i].violationDescription
      }
      this.formattedViolationList.push(formattedViolation);
      // console.log(this.violationCategories[i]);
    }
  }
}
