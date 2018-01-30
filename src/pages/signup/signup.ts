import { Usuario } from '../../models/user';
import { Credencial } from '../../models/credencial';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController  } from 'ionic-angular';

import { LoginProvider } from '../../providers/login-provider';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  credencial: Credencial;
  user: Usuario;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController)
    {
      this.credencial = new Credencial();
      this.user = new Usuario();
    }


  doRegister(){
    this.loginProvider.registrar(this.credencial,this.user).then( authData => {
      this.navCtrl.pop();
      this.presentToast('middle');
    }, error => {
      console.log(error);
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
      message: 'Usuário Cadastrado com Sucesso',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: position
    });
    toast.present();
  }

}
