import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

//providers
import { DadosProvider } from '../../providers/dados-provider';

//pages
import { ListCelulasPage } from './list/list';



/*import { NetworkProvider } from '../../providers/network-provider';
import { CelulasMapPage } from '../celulas-map/celulas-map'; Launch Navigator
import { CelulasListPage } from '../celulas-list/celulas-list';*/

@Component({
  selector: 'page-celulas',
  templateUrl: 'celulas.html'
})
export class CelulasPage {
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public dados: DadosProvider,
    public alertCtrl: AlertController) {
    }

  ionViewDidLoad(){
    /*if(!this.netInfo.isOnline()){
      let alert = this.alertCtrl.create({
          title: 'Falha de Conexão',
          message: '<p>Infelizmente você não está conectado à Internet, portanto não será possivel carregar a lista de Células.<br><br>Para poder visualizar, conecte-se à Internet.</p>',
          buttons: ['Ok']
        });
        alert.present();
        this.close();
    }*/
  }

  verCelulas(){
    this.navCtrl.push(ListCelulasPage);
  }
  mapCelulas(){
    //this.navCtrl.push(CelulasMapPage);
  }
  close() {
    this.viewCtrl.dismiss();
  }

}
