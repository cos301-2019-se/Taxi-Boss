import { Component, OnInit, OnDestroy } from '@angular/core';
import { DriverService } from '../../../shared/driver.service';
import { ViolationService } from '../../../shared/violation.service';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit, OnDestroy {
  numViolations: number;
  currentTheme: string;
  themeSubscription: any;

  constructor(public service:DriverService, public vService:ViolationService, private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
   }
 
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

  viewDrivers(){
    this.vService.viewViolations=false;
  }
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
