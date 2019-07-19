import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbInputModule, NbCheckboxModule, NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { RegisterDriverComponent } from './registerDriver.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbListModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
  ],
  declarations: [
    RegisterDriverComponent,
  ],
})
export class RegisterDriverModule { }
