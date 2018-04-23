import { Credencial } from '../../models/credencial';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { ResetPage } from '../reset/reset';
import { SignupPage } from '../signup/signup';

import { LoginProvider } from '../../providers/login-provider';
import { FacebookProvider } from '../../providers/facebook';
import { Push } from './../../providers/push';


import { HomePage } from './../home/home';




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
    public facebook: FacebookProvider,
    public push: Push
    ) {
      this.credencial = new Credencial;
    }

  onReset() {
    this.navCtrl.push(ResetPage);
  }

  onSignUp() {
    this.navCtrl.push(SignupPage);
  }


  loginUser(){
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loginProvider.login(this.credencial).then( authData => {
      this.toHome();
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
          this.toHome();
          this.presentToast('Login efetuado com Sucesso!');
        }, (error) =>{
          this.loading.dismiss();
          this.presentToast('Ops... Houve um erro ao tentar Logar');
        });
      })
    }, error => {
      console.log(error);
    });
  }

  private toHome(){
    this.navCtrl.setRoot(HomePage);
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
