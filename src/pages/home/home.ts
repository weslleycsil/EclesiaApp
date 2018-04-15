import { Component } from '@angular/core';
import { NavController, PopoverController, AlertController, ToastController, ActionSheetController, Platform } from 'ionic-angular';

//pages
import { SobrePage } from './../sobre/sobre';

//plugins
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<{title: string, component: any}>;
  n = 9;

  constructor(
    public navCtrl: NavController,
    private iab: InAppBrowser,
    private popoverCtrl: PopoverController,
    public alerCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    private socialSharing: SocialSharing
  ) {
    this.pages = [
      //{ title: 'LoginPage', component: LoginPage},
      //{ title: 'Papojovem', component: PapojovemPage},
      //{ title: 'Celulas', component: CelulasPage},
      //{ title: 'Reunioes', component: ReunioesPage},
      //{ title: 'Agenda', component: AgendaPage},
      //{ title: 'Aigreja', component: IgrejaPage},
      //{ title: 'Comochegar', component: LocalizarPage},
      //{ title: 'Feedback', component: FeedbackPage},
      { title: 'Sobre', component: SobrePage},
      //{ title: 'Contato', component: ContatoPage}
    ]
  }

  search(page){
    for(var i = 0; i < this.pages.length; i++) {
      if(this.pages[i].title == page){
        return this.pages[i].component;
      }
    }

  }

  abrir(pagina){
    this.navCtrl.push(this.search(pagina));
  }

  share(){}
  presentPopover(ev) {}
  presentPop(ev) {}

  open(valor){
    if(valor === "youtube"){
      //this.iab.create(this.dados.getYoutube(),'_system');
    } else {
      //this.iab.create(this.dados.getFace(),'_system',);
    }

  }
  conta(){
    let alert = this.alerCtrl.create({
      title: 'Nossa Conta',
      message: '',//this.dados.getConta(),
      buttons: ['Ok']
    });
    alert.present();
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

  presentYoug() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Nossas Redes Sociais',
      buttons: [
        {
          text: 'Facebook',
          icon: !this.platform.is('ios') ? 'logo-facebook' : null,
          handler: () => {
            this.iab.create('https://www.facebook.com/Young-Impact-1700958203520403/','_system');
          }
        },{
          text: 'Youtube',
          icon: !this.platform.is('ios') ? 'logo-youtube' : null,
          handler: () => {
            this.iab.create('https://www.youtube.com/channel/UCfjB_KYnRPJwL2oUZTSLHJg','_system');
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

  verLogin(){
    return false;
  }

}
