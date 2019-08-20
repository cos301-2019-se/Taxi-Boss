import { Component } from '@angular/core';
import { DriverService } from '../../shared/driver.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private service:DriverService) { }
}
