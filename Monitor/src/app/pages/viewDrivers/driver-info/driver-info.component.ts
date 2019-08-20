import { Component, OnInit, HostListener, Input, Output } from '@angular/core';
import { Driver } from '../../../shared/driver.model';
import { DriverService } from '../../../shared/driver.service';
import { ViolationService } from '../../../shared/violation.service';
import { InfoListComponent } from '../info-list/info-list.component';
import { EventEmitter } from 'selenium-webdriver';

@Component({
  selector: 'driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit {
  numViolations: number;
  @Output() toggle: EventEmitter = new EventEmitter();
  constructor(private service:DriverService, private vService:ViolationService) { }
 
  ngOnInit() {
    this.service.driverDetails ={
      cellNumber : '',
      email : '',
      monitorEmail : '',
      name : '',
      numberPlate : '',
      password: '',
    }
    this.vService.numViolations=0;
    // this.vService.driverViolations.length=0;
  } 

  @HostListener('onClick')
  onClick(){
    this.toggle.emit;
  }

  update(){
    // this.vService.getDriverViolations(this.service.driverDetails);
    // if(this.vService.driverViolations.length!=null)
    //   this.numViolations=this.vService.driverViolations.length;
  }

}
