import { Component, OnInit, KeyValueDiffers, DoCheck, OnChanges, AfterViewInit, Input } from '@angular/core';
import { ViolationService } from '../../../../shared/violation.service';
import { DriverService } from '../../../../shared/driver.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Driver } from '../../../../shared/driver.model';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'violations-list',
  templateUrl: './violations-list.component.html',
})
export class ViolationsListComponent implements OnInit, AfterViewInit{
  source: LocalDataSource;
  settings: any = {};
  themeSubscription: any;
  constructor(private theme: NbThemeService,public violationService : ViolationService, private driverService : DriverService) {
    this.source=new LocalDataSource();
    // this.source.load(this.violationService.driverViolations);    
    // console.log(this.violationService.driverViolations);
    // this.generateList();
    // this.driverService._driverDetails.subscribe((driverChange) => {
    //   this.generateList();
    //   console.log(driverService.driverDetails);
    // })
  }
  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.generateList().then(()=>{this.settings = {
        hideSubHeader:true,
        actions:{
          add:false,
          edit:false,
          delete:false
        },
        columns: {
          violationDescription: {
            title: 'Description',
            type: 'string',
            filter: false
          },
          street: {
            title: 'Street',
            type: 'string',
            filter: false
          },
          city: {
            title: 'City',
            type: 'string',
            filter: false
          },
          province: {
            title: 'Province',
            type: 'string',
            filter: false
          },
          time: {
            title: 'Time',
            type: 'string',
            filter: false
          },
          date: {
            title: 'Date',
            type: 'string',
            filter: false
          },
        },
      };
    });  
    });
  }

  async generateList(){
    await this.violationService.getList(this.driverService.driverDetails).then((data)=>{
      // this.source.refresh();
      // this.source.load(data);
      this.source.load(this.violationService.driverViolations);
    });
  }
  // ngOnChanges(){
  //   this.generateList();
  // }
  ngOnInit(){
    // this.driverService._driverDetails.subscribe((driverChange) => {
    //   this.source.load(this.violationService.driverViolations);
    // });
  }
}
