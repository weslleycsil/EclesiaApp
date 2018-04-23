import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ViewNotificationsPage } from './viewnotifications/viewnotifications';

import { DadosProvider } from '../../providers/dados-provider';


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  msgList: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dados: DadosProvider) {
      console.log(this.dados.getNotifications(not =>{

        this.msgList = not;
        console.log(this.msgList);
      }, err => console.log(err)));
      this.limpaNewsChats();
  }

  private verMsg(msg){
    this.navCtrl.push(ViewNotificationsPage, {notification: msg})
  }

  private limpaNewsChats(){

  }


}
