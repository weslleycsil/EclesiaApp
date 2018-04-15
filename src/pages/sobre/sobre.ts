import { Component } from '@angular/core';
import { NavController, ViewController, Platform} from 'ionic-angular';

import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchReview } from '@ionic-native/launch-review';


import { Versao } from '../../models/versao';




@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
})
export class SobrePage {

  private versao : Versao;

  constructor(
    private navCtrl: NavController,
    private appVersion: AppVersion,
    private viewCtrl: ViewController,
    private launchReview: LaunchReview,
    private plt: Platform,
    private iab: InAppBrowser) {

      this.versao = new Versao();
      if(this.plt.is('cordova')){
        this.getInfo();
      }

  }

  getInfo(){
    this.appVersion.getAppName().then((s) => {
      this.versao.nome = s;
    });
    this.appVersion.getVersionNumber().then((s) => {
      this.versao.versao = s;
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  rate(){
    var isSupported = this.launchReview.isRatingSupported();
    var appId;

    if(this.plt.is('ios')){
      appId = "1231238367";
    } else if(this.plt.is('android')){
      appId = "br.com.tecnicoweslley.eclesiaapp";
    }

    if(isSupported){
      this.launchReview.rating();
    }else{
      this.launchReview.launch();
    }

  }

  open(p){
    if(p === "legal"){
      this.iab.create('http://comunidadeeclesia.tk/legal.html','_system');
    }
    else if (p === "site"){
      this.iab.create('http://comunidadeeclesia.tk/','_system');
    }
    else if (p === "sitetw"){
      this.iab.create('http://twcreativs.com.br','_system');
    }

  }




}
