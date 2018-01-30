import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

@Component({
  selector: 'page-reunioes-view',
  templateUrl: 'reunioes-view.html'
})
export class ReunioesViewPage {

  dia: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dia = this.navParams.get('item');
  }

}
