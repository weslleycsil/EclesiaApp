import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ToastController, ActionSheetController, Platform, App } from 'ionic-angular';

//pages
import { SobrePage } from '../sobre/sobre';
import { SlidesPage } from '../slides/slides';
import { FeedbackPage } from '../feedback/feedback';
import { LoginPage } from '../login-page/login-page';
import { PerfilPage } from '../perfil/perfil';
import { NotificationsPage } from './../notifications/notifications';


//providers
import { LocalProvider } from '../../providers/local-provider';
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
    public local: LocalProvider,
    public app: App) {}
  close() {
    this.viewCtrl.dismiss();
  }

  perfil(){
    this.close();
    let modal = this.modalCtrl.create(PerfilPage);
    modal.present();
  }

  sobre(){
    this.close();
    let modal = this.modalCtrl.create(SobrePage);
    modal.present();
  }

  sair(){
    this.login.logoff();
    this.close();
    this.toLogin();
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
    this.close();
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Nossas Igrejas',
      buttons: [
        {
          text: 'São Gonçalo',
          icon: null,
          handler: () => {
            this.local.changeLocal("sg");
            this.presentToast('bottom','São Gonçalo');
          }
        },{
          text: 'Cabo Frio',
          icon: null,
          handler: () => {
            this.local.changeLocal("cf");
            this.presentToast('bottom','Cabo Frio');
          }
        },{
          text: 'Arraial do Cabo',
          icon: null,
          handler: () => {
            this.local.changeLocal("ac");
            this.presentToast('bottom','Arrail do Cabo');
          }
        },{
          text: 'Buzios',
          icon: null,
          handler: () => {
            this.local.changeLocal("bz");
            this.presentToast('bottom','Buzios');
          }
        },{
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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

  toLogin(){
    this.close();
    this.navCtrl.setRoot(LoginPage);
  }

  notifications(){
    this.close();
    this.app.getRootNav().push(NotificationsPage);
  }
}
