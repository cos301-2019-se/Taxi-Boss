import { Component, OnInit, HostListener, Input, Output } from '@angular/core';
import { Driver } from '../../../shared/driver.model';
import { DriverService } from '../../../shared/driver.service';
import { ViolationService } from '../../../shared/violation.service';

@Component({
  selector: 'driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit {
  numViolations: number;
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

  onClick(){
    this.vService.viewViolations=true;
  }

  update(){
    // this.vService.getDriverViolations(this.service.driverDetails);
    // if(this.vService.driverViolations.length!=null)
    //   this.numViolations=this.vService.driverViolations.length;
  }

}
