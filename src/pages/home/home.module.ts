import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { MyNavbarComponentModule } from '../../components/my-navbar/my-navbar.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    MyNavbarComponentModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
