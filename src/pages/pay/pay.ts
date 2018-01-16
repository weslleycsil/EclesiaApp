import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PayPalPayment } from '@ionic-native/paypal';

import { PayPalProvider } from './../../providers/pay-pal/pay-pal';

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pagamento: PayPalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }
  pagar(){
    this.pagamento.pagar(new PayPalPayment('10.10', 'USD', 'TV', 'sale'));
  }

}
