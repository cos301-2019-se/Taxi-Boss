import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../shared/driver.service';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  currentTheme: string;
  themeSubscription: any;
  
  constructor(public service:DriverService, private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
   }

  ngOnInit(){
    this.service.refreshList();
  }

}
