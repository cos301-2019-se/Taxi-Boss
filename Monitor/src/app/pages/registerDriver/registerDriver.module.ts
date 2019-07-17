import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { RegisterDriverComponent } from './registerDriver.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbListModule,
  ],
  declarations: [
    RegisterDriverComponent,
  ],
})
export class RegisterDriverModule { }
