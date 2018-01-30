import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html'
})
export class SlidesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("slides");

  }

  start(){
    if(this.navParams.get('item')){
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot(HomePage);
    }

  }

}
