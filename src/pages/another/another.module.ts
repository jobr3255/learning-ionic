import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnotherPage } from './another';

@NgModule({
  declarations: [
    AnotherPage,
  ],
  imports: [
    IonicPageModule.forChild(AnotherPage),
  ],
})
export class AnotherPageModule {}
