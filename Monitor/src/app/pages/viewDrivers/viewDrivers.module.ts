import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewDriversComponent } from './viewDrivers.component';
import { DriverListComponent } from './info-list/driver-list/driver-list.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { ViolationsListComponent } from './info-list/violations-list/violations-list.component';
import { InfoListComponent } from './info-list/info-list.component';
// import { UserService } from '../../@core/mock/users.service';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbListModule,
    // UserService,
  ],
  declarations: [
    ViewDriversComponent,
    DriverListComponent,
    DriverInfoComponent,
    ViolationsListComponent,
    InfoListComponent,
  ],
})
export class ViewDriversModule { }
