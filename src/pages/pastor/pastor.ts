import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pastor',
  templateUrl: 'pastor.html'
})
export class PastorPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
  }


  voltar(){
    this.navCtrl.parent.viewCtrl.dismiss();
  }

}
