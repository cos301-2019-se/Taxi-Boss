import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../shared/driver.service';

@Component({
  selector: 'risky-driver',
  templateUrl: './risky-driver.component.html',
  styleUrls: ['./risky-driver.component.scss']
})
export class RiskyDriverComponent implements OnInit {

  constructor(public service:DriverService) { }

  ngOnInit() {
  }

}
