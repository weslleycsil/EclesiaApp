import { Component, NgZone } from '@angular/core';
import {NavController,NavParams, LoadingController, ToastController, Platform} from 'ionic-angular';

//pages
import { MapaPage } from '../../../mapa/mapa';

//provider
import { DadosProvider } from '../../../../providers/dados-provider';

//pluguins
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';



@Component({
  selector: 'page-view-celula',
  templateUrl: 'view-celula.html'
})
export class ViewCelulaPage {
  celula: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dados: DadosProvider,
    private launchNavigator: LaunchNavigator) {
      this.celula = this.navParams.get('item');
  }

  verRota() {
    this.dados.geoLocation(coords =>{
      let options: LaunchNavigatorOptions = {
        start: [coords.latitude, coords.longitude]
      };

      this.launchNavigator.navigate([this.celula.latitude, this.celula.longitude], options).then(
        success => console.log('Navegador'),
        error => console.log(error)
      );

    }, err => console.log(err));
  }

  verMapa(celula) {
    this.navCtrl.push(MapaPage,{celula});

  }


}
