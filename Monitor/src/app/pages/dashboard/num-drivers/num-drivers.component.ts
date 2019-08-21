import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../shared/driver.service';

@Component({
  selector: 'num-drivers',
  templateUrl: './num-drivers.component.html',
  styleUrls: ['./num-drivers.component.scss']
})
export class NumDriversComponent implements OnInit {

  constructor(public service:DriverService) { }

  ngOnInit() {
  }

}
