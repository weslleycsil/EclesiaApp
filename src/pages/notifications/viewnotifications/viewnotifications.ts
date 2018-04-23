import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-viewnotifications',
  templateUrl: 'viewnotifications.html',
})
export class ViewNotificationsPage {

  private notification: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.notification = this.navParams.get('notification');
  }



}
