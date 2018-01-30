import { LoginProvider } from '../../providers/login-provider';
import { Credencial } from '../../models/credencial';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html'
})
export class ResetPage {
  credencial: Credencial;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loginProvider: LoginProvider,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) {
      this.credencial = new Credencial();
    }

  doReset(){
    this.loginProvider.resetPassword(this.credencial).then( authData => {
      this.navCtrl.pop();
      this.presentToast('middle');
    }, error => {
    this.loading.dismiss().then( () => {
      let alert = this.alertCtrl.create({
        message: "Ops... Algo está errado, por favor tente novamente",
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    });
  });

  this.loading = this.loadingCtrl.create({
    dismissOnPageChange: true,
  });
  }

  presentToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Um pedido para reset de senha foi enviado para o seu Email.',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: position
    });
    toast.present();
  }

}
