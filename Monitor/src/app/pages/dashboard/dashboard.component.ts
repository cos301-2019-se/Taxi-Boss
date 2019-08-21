import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../shared/driver.service';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  constructor(public service:DriverService) { }

  ngOnInit(){
    this.service.refreshList();
  }

}
