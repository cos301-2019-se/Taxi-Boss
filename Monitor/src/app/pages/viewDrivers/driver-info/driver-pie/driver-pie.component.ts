import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ViolationService } from '../../../../shared/violation.service';
import { DriverService } from '../../../../shared/driver.service';

@Component({
  selector: 'driver-pie',
  templateUrl: './driver-pie.component.html',
  styleUrls: ['./driver-pie.component.scss']
})
export class DriverPieComponent implements AfterViewInit {
  options: any = {};
  themeSubscription: any;
  violationCategories: any={};
  formattedViolationList: any={};

  constructor(public theme: NbThemeService, public violationService: ViolationService,public driverService: DriverService) {
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
            data:  this.formattedViolationList,
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
    await this.violationService.getDriverViolationsPerCategory(this.driverService.driverDetails.numberPlate).then(res=>this.populateData());
  }

  populateData(){
    var formattedViolation;
    // console.log(this.violationService.getAllViolationsPerCategory);
    for (var i = 0; i <this.violationService.numDriverViolationsPerCategory.length; i++) {
      this.violationCategories.push(this.violationService.numDriverViolationsPerCategory[i].violationDescription);
      formattedViolation={
        value: this.violationService.numDriverViolationsPerCategory[i].count, 
        name: this.violationService.numDriverViolationsPerCategory[i].violationDescription
      }
      this.formattedViolationList.push(formattedViolation);
      // console.log(this.violationCategories[i]);
    }
  }
}