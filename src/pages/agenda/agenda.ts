import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { AgendaViewPage } from '../agenda-view/agenda-view';
import { DadosProvider } from '../../providers/dados-provider';

@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {
  @ViewChild(Slides) slides: Slides;
	public eventsList = [];
  public loading:any;


  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private dados: DadosProvider) {
      this.getSlides();
    }

  verInfo(item){
    this.navCtrl.push(AgendaViewPage,{item});
  }

  close() {
    this.navCtrl.pop();
  }

  getSlides(){
    this.dados.getEventos((res)=>{
      this.eventsList = res;
    },(error)=>{
      console.log(error)
    });
  }
}
