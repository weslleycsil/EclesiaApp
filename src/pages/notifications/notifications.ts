import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ViewNotificationsPage } from './viewnotifications/viewnotifications';

import { DadosProvider } from '../../providers/dados-provider';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  msgListRef: AngularFireList<any>;
  msgList1: Observable<any[]>;

  msgList: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dados: DadosProvider,
    private afData: AngularFireDatabase) {

      this.msgListRef = afData.list('/chats/8EKsrpPJpKUgsL4AxHJG3JxX0i23/');
      // Use snapshotChanges().map() to store the key
      this.msgList1 = this.msgListRef.snapshotChanges().map(changes => {
        console.log(changes)
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

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

  delete(key, msg){
    console.log('KEY:',key,'MSG:',msg)
  }


}
