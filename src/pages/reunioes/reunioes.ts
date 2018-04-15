import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ReunioesViewPage } from '../reunioes-view/reunioes-view'

import { DadosProvider } from './../../providers/dados-provider';


@Component({
  selector: 'page-reunioes',
  templateUrl: 'reunioes.html'
})
export class ReunioesPage {
  public listReunioes = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dados: DadosProvider
  ) {
    this.listReunioes = this.dados.getReunioes();
  }

  verInfo(item) {
    this.navCtrl.push(ReunioesViewPage, {item});
  }


}
