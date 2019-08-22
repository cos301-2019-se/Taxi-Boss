import { Component, OnInit } from '@angular/core';
import { ViolationService } from '../../../../shared/violation.service';
import { DriverService } from '../../../../shared/driver.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'violations-list',
  templateUrl: './violations-list.component.html',
})
export class ViolationsListComponent{
  source: LocalDataSource;
  
  settings = {
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
  constructor(public violationService : ViolationService, private driverService : DriverService) {
    this.source=new LocalDataSource();

    this.violationService.getList(this.driverService.driverDetails).then((data)=>{
      this.source.load(data);
    });
  }
}
