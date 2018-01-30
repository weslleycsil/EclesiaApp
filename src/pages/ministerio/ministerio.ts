import { Dados } from '../../providers/dados';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-ministerio',
  templateUrl: 'ministerio.html'
})
export class MinisterioPage {
  public texto;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dados: Dados) {
      this.texto = this.dados.getMinisterio();
    }

  voltar(){
    this.navCtrl.parent.viewCtrl.dismiss();
  }

}
