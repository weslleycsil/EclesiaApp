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
  public listCelulasCity = [];
  public listCelulas = [];
  public celulasList:Array<any>;
  public showCity: boolean;
  public loading:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public dados: DadosProvider
  ) {
      this.showCity = true;
      this.dados.getCelulas((res)=>{
        this.listCelulasCity = res.list;
        this.listCelulas = res.array;
      },(error)=>console.log(error));

      console.log(this.listCelulas);
  }

  verInfo(p){

  }

  initializeItems(): void {
    this.celulasList = this.listCelulasCity;
    this.showCity = true;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.celulasList = this.listCelulas.filter((v) => {
      if(v.Nome && q) {
        if (v.Nome.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.celulasList.length);

  }

}
