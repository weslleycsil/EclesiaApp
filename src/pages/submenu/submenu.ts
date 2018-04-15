import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ToastController, ActionSheetController, Platform } from 'ionic-angular';

//pages
import { SobrePage } from '../sobre/sobre';
import { SlidesPage } from '../slides/slides';
import { FeedbackPage } from '../feedback/feedback';


//providers
//import { Local } from '../../providers/local';
import { LoginProvider } from '../../providers/login-provider';


@Component({
  selector: 'page-submenu',
  templateUrl: 'submenu.html'
})
export class SubmenuPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public login: LoginProvider,
    /*public local: Local*/) {}
  close() {
    this.viewCtrl.dismiss();
  }

  perfil(){
    this.close();
    //let modal = this.modalCtrl.create(PerfilModalPage);
    //modal.present();
  }

  sobre(){
    this.close();
    let modal = this.modalCtrl.create(SobrePage);
    modal.present();
  }

  sair(){
    this.login.logoff();
    this.close();
    this.presentToast('middle','Você Saiu com Sucesso.');
  }

  feed(){
    this.close();
    let modal = this.modalCtrl.create(FeedbackPage);
    modal.present();
  }

  intro(){
    this.close();
    let item = "a";
    this.navCtrl.push(SlidesPage,{item});
  }

  change(){

  }

  presentToast(position: string, texto: string) {
    let toast = this.toastCtrl.create({
      message: texto,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: position
    });
    toast.present();
  }

  verLogin(){
    return false;
  }
}
