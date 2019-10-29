import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MyNavbarComponent } from './my-navbar';

@NgModule({
  declarations: [
    MyNavbarComponent,
  ],
  imports: [
    IonicPageModule.forChild(MyNavbarComponent),
  ],
  exports : [ MyNavbarComponent ]
})
export class MyNavbarComponentModule { }
