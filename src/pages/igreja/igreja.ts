import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MinisterioPage } from '../ministerio/ministerio';
import { PastorPage } from '../pastor/pastor';

@Component({
  selector: 'page-igreja',
  templateUrl: 'igreja.html'
})
export class IgrejaPage {
  tab1: any;
  tab2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = MinisterioPage;
    this.tab2 = PastorPage;
  }

}
