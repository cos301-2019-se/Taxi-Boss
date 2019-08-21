import { Component, OnInit, HostBinding } from '@angular/core';
import { ViolationService } from '../../../shared/violation.service';

@Component({
  selector: 'info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.scss']
})
export class InfoListComponent implements OnInit {

  constructor(public vService: ViolationService) {
  }

  ngOnInit() {
    this.vService.viewViolations=false;
  }

  viewDrivers(){
    this.vService.viewViolations=false;
  }
}
