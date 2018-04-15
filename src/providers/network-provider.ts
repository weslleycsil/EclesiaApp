import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

declare var Connection: any;
declare var navigator: any;

@Injectable()
export class NetworkProvider {

  onDevice: boolean;
  constructor(
    public platform: Platform,
    private network: Network
  ) {
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if(this.onDevice && navigator.connection){
      return navigator.connection.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if(this.onDevice && navigator.connection){
      return navigator.connection.type === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }

  isConnected(): boolean {
    let retorno;
    if(this.onDevice){
      this.network.onConnect().subscribe(() => {
        console.log('network connected!');
        retorno = true;
      }, error => {
        console.log(error);
        retorno = false;
      });
      return retorno;

    } else {
      return false;
    }

  }

  onDisconnected(): boolean {
    let retorno;
    if(this.onDevice){

      this.network.onDisconnect()
      .subscribe(() => {
        console.log('network was disconnected :-(');
        retorno = true;
      }, error => {
        console.log(error)
        retorno = false;
      });
      return retorno;

    } else {
      return false;
    }

  }

}
