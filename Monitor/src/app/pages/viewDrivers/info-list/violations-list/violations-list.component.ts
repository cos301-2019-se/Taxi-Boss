import { Component, OnInit } from '@angular/core';
import { ViolationService } from '../../../../shared/violation.service';
import { DriverService } from '../../../../shared/driver.service';

@Component({
  selector: 'violations-list',
  templateUrl: './violations-list.component.html',
  styleUrls: ['./violations-list.component.scss']
})
export class ViolationsListComponent implements OnInit {

  constructor(public violationService : ViolationService, private driverService : DriverService) { }

  ngOnInit() {
    // this.violationService.getDriverViolations(this.driverService.driverDetails);
  }



}
