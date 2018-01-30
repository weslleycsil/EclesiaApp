import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Network } from "ionic-native";

declare var Connection: any;
declare var navigator: any;

@Injectable()
export class NetworkProvider {

  onDevice: boolean;
  constructor(public platform: Platform) {
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

}
