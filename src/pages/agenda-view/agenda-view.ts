import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';


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
    public platform: Platform,
    private photoViewer: PhotoViewer
    ) {
      this.event = this.navParams.get('item');
    }

  view(url){
    this.photoViewer.show(url);
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
