import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbInputModule, NbCheckboxModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { RegisterDriverComponent } from './registerDriver.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbListModule,
    NbInputModule,
    NbCheckboxModule,
  ],
  declarations: [
    RegisterDriverComponent,
  ],
})
export class RegisterDriverModule { }
