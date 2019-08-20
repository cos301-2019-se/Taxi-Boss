import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Driver } from '../../../../shared/driver.model';
import { DriverService } from '../../../../shared/driver.service';
import { ViolationService } from '../../../../shared/violation.service';
import { InfoListComponent } from '../info-list.component';


@Component({
  selector: 'driver-list',
  templateUrl: './driver-list.component.html',
})
export class DriverListComponent implements OnInit {
  list: Driver[];
  constructor(private service:DriverService, private vService: ViolationService) { }

  ngOnInit() {
    // this.service.getDrivers().subscribe(actionArray =>{
    //   this.list = actionArray.map(item=> {
    //     return {
    //       id:item.payload.doc.id,
    //       ...item.payload.doc.data() 
    //     } as Driver;
    //   })
    // });
    this.service.refreshList();
  }

  @Input() infolist: InfoListComponent;
  @HostListener('onSelect')
  onSelect(driv: Driver){
    this.service.driverDetails = driv;
    this.vService.getDriverViolations(this.service.driverDetails);
    // console.log(this.service.driverDetails.name);
  }

}
