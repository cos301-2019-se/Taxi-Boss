import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbTabsetModule, NbSelectModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { RegisterDriverModule } from '../registerDriver/registerDriver.module';
import { ViewDriversModule } from '../viewDrivers/viewDrivers.module';
import { ViolationsPieComponent } from './violations-pie/violations-pie.component';
import { ViolationsBarComponent } from './violations-bar/violations-bar.component';
import { NumDriversComponent } from './num-drivers/num-drivers.component';
import { RiskyDriverComponent } from './risky-driver/risky-driver.component';

@NgModule({
  imports: [
    NbTabsetModule,
    NbCardModule,
    ThemeModule,
    NbListModule,
    NbSelectModule,
    RegisterDriverModule,
    ViewDriversModule,
    NgxEchartsModule,
    NbIconModule
  ],
  declarations: [
    DashboardComponent,
    ViolationsPieComponent,
    ViolationsBarComponent,
    NumDriversComponent,
    RiskyDriverComponent,
  ],
})
export class DashboardModule { }
