import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { InfoListComponent } from './info-list/info-list.component';

@Component({
  selector: 'ngx-viewDrivers',
  templateUrl: './viewDrivers.component.html',
})
export class ViewDriversComponent implements AfterViewInit{
  @ViewChild(InfoListComponent, {static:false}) infoListRef: InfoListComponent;

  ngAfterViewInit(){
    this.infoListRef.flipViolations=true;
  }
}
