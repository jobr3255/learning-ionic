import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnotherPage } from './another';
import { MyNavbarComponentModule } from '../../components/my-navbar/my-navbar.module';

@NgModule({
  declarations: [
    AnotherPage,
  ],
  imports: [
    MyNavbarComponentModule,
    IonicPageModule.forChild(AnotherPage),
  ],
})
export class AnotherPageModule {}
