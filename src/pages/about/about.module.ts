import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { MyNavbarComponentModule } from '../../components/my-navbar/my-navbar.module';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    MyNavbarComponentModule,
    IonicPageModule.forChild(AboutPage),
  ],
})
export class AboutPageModule {}
