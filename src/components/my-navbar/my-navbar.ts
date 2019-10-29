import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the MyNavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-navbar',
  templateUrl: 'my-navbar.html'
})
export class MyNavbarComponent {

  @Input() title: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello MyNavbarComponent Component');
  }

  goTo(page){
    this.navCtrl.setRoot(page);
  }

}
