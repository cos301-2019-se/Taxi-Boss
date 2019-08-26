import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../shared/driver.service';
import { NbThemeService } from '@nebular/theme';
import { ViolationService } from '../../shared/violation.service';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  currentTheme: string;
  themeSubscription: any;
  
  constructor(public dService:DriverService, private vService:ViolationService, private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
    // this.getAllData();
   }

  ngOnInit(){
    this.getAllData();
  }

  async getAllData(){
    await this.dService.refreshList();
    // await this.vService.getAllViolationsPerCategory();
  }
}
