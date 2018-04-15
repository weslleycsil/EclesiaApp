import { Credencial } from '../../models/credencial';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { ResetPage } from '../reset/reset';
import { SignupPage } from '../signup/signup';

import { NetworkProvider } from '../../providers/network-provider';
import { LoginProvider } from '../../providers/login-provider';
import { FacebookProvider } from '../../providers/facebook';
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
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public netInfo: NetworkProvider,
    public facebook: FacebookProvider,
    public push: Push
    ) {
      this.credencial = new Credencial;
    }

  ionViewDidLoad(){
    if(!this.netInfo.isOnline()){
        console.log('Infelizmente você não está conectado à Internet<br><br>Para um melhor aproveitamento, conecte-se à Internet.</p>');
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
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loginProvider.login(this.credencial).then( authData => {
      this.voltar();
      this.presentToast('Login efetuado com Sucesso!');
    }, error => {
      this.loading.dismiss();
      this.presentToast('Ops... Houve um erro ao tentar Logar');
    });
  }

  loginFacebook(){
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.facebook.login(response =>{
      Push.getPushId(id =>{
        this.loginProvider.facebook(response.authResponse.accessToken, id, ()=>{
          this.voltar();
          this.presentToast('Login efetuado com Sucesso!');
        }, (error) =>{
          this.loading.dismiss();
          this.presentToast('Ops... Houve um erro ao tentar Logar');
        });
      })
    }, error => {

    });
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'middle'
    });
    toast.present();
  }

}
