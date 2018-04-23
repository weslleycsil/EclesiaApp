import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';

import { DadosProvider } from './../providers/dados-provider';
import { LoginProvider } from './../providers/login-provider';
import { Push } from '../providers/push';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dados: DadosProvider, login: LoginProvider, loading: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let load = loading.create({
        dismissOnPageChange: true
      });
      load.present();
      statusBar.styleDefault();
      splashScreen.hide();
      dados.getCoords();
      //Push.init();
      login.checkAuthState(res=>{
        if(res){
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
        load.dismiss();
      }, err => console.log(err));
    });
  }

}

