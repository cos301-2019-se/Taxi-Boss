import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule} from 'ng2-smart-table';
import { NbIconModule } from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewDriversComponent } from './viewDrivers.component';
import { DriverListComponent } from './info-list/driver-list/driver-list.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { ViolationsListComponent } from './info-list/violations-list/violations-list.component';
import { InfoListComponent } from './info-list/info-list.component';
import { DriverPieComponent } from './driver-info/driver-pie/driver-pie.component';
// import { UserService } from '../../@core/mock/users.service';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbListModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbIconModule,
    NgxEchartsModule
  ],
  declarations: [
    ViewDriversComponent,
    DriverListComponent,
    DriverInfoComponent,
    ViolationsListComponent,
    InfoListComponent,
    DriverPieComponent,
  ],
})
export class ViewDriversModule { }
