import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

//provider
import { DadosProvider } from '../../../providers/dados-provider';


@Component({
  selector: 'page-list-celulas',
  templateUrl: 'list.html'
})
export class ListCelulasPage {
  public show :boolean;
  public listCitys = [];
  public loading:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public dados: DadosProvider
  ) {
      this.dados.getCelulas((res)=>{
        this.listCitys = res;
        console.log(this.listCitys);
      },(error)=>console.log(error));
  }

  verInfo(p){

  }

}
