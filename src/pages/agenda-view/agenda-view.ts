import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';


@Component({
  selector: 'page-agenda-view',
  templateUrl: 'agenda-view.html'
})
export class AgendaViewPage {
  event: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public platform: Platform
    ) {
      this.event = this.navParams.get('item');
    }

  presentToast(texto: string) {
    let toast = this.toastCtrl.create({
      message: texto,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'middle'
    });
    toast.present();
  }

}
