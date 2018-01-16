import { Component } from '@angular/core';
import {NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-conta',
  templateUrl: 'conta.html',
})
export class ContaPage {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController) {
  }

  info(){
    let toast = this.toastCtrl.create({
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatibus quibusdam eum nihil optio, ullam accusamus magni, nobis suscipit reprehenderit, sequi quam amet impedit. Accusamus dolorem voluptates laborum dolor obcaecati.',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'middle'
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContaPage');
  }

}
