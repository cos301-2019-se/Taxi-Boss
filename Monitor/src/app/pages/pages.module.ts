import { NgModule } from '@angular/core';
import { NbMenuModule, NbListModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { RegisterDriverModule } from './registerDriver/registerDriver.module';
import { ViewDriversModule } from './viewDrivers/viewDrivers.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    RegisterDriverModule,
    ViewDriversModule,
    NbListModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
