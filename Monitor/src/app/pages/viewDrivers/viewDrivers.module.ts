import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewDriversComponent } from './viewDrivers.component';
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
  ],
})
export class ViewDriversModule { }
