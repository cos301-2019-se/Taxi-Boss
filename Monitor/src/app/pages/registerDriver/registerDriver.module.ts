import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbInputModule, NbCheckboxModule, NbButtonModule } from '@nebular/theme';
// import { DriverService } from 'src/app/shared/driver.service';
import { ThemeModule } from '../../@theme/theme.module';
import { RegisterDriverComponent } from './registerDriver.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbListModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    FormsModule
  ],
  declarations: [
    RegisterDriverComponent,
  ],
})
export class RegisterDriverModule {

 }
