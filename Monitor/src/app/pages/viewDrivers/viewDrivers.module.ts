import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ViewDriversComponent } from './viewDrivers.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbListModule,
  ],
  declarations: [
    ViewDriversComponent,
  ],
})
export class ViewDriversModule { }
