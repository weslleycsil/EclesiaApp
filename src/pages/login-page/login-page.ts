import { Credencial } from '../../models/credencial';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController} from 'ionic-angular';
import { ResetPage } from '../reset/reset';
import { SignupPage } from '../signup/signup';

import { NetworkProvider } from '../../providers/network-provider';
import { LoginProvider } from '../../providers/login-provider';
import { FacebookLogin } from '../../providers/facebook';
import { Push } from './../../providers/push';


@Component({
  selector: 'page-login',
  templateUrl: 'login-page.html'
})
export class LoginPage {
  credencial: Credencial;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public netInfo: NetworkProvider,
    public facebook: FacebookLogin,
    public push: Push
    ) {
      this.credencial = new Credencial;
    }

  ionViewDidLoad(){
    if(!this.netInfo.isOnline()){
      let alert = this.alertCtrl.create({
        title: 'Falha de Conexão',
        message: '<p>Infelizmente você não está conectado à Internet<br><br>Para um melhor aproveitamento, conecte-se à Internet.</p>',
        buttons: ['Ok']
      });
      alert.present();
      this.voltar();
    }
  }

  onReset() {
    this.navCtrl.push(ResetPage);
  }

  onSignUp() {
    this.navCtrl.push(SignupPage);
  }

  voltar(){
    this.navCtrl.pop();
  }

  loginUser(){
    this.loginProvider.loginUser(this.credencial).then( authData => {
      this.voltar();
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

  loginFacebook(){
    FacebookLogin.login(response => {
      Push.getPushId(id => {
        this.loginProvider.lFacebook(response.accessToken, id, () => {
          this.voltar();
        }, error => {
          alert(error);
        })
      });

    }, error => {
      alert(error.errorMessage);
    });
  }

  logarFace2(){
    this.loginProvider.loginFace();
    this.voltar();
  }


  presentToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Login efetuado com Sucesso!',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: position
    });
    toast.present();
  }

}
