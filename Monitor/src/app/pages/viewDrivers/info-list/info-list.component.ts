import { Component, OnInit, HostBinding } from '@angular/core';
import { NbFlipCardComponent } from '@nebular/theme';

@Component({
  selector: 'info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.scss']
})
export class InfoListComponent implements OnInit {
  @HostBinding('class.flipViolations')
  flipViolations = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleCard() {
    this.flipViolations = !this.flipViolations;
  }
}
