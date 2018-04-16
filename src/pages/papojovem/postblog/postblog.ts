import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


@Component({
  selector: 'page-postblog',
  templateUrl: 'postblog.html'
})
export class PostblogPage {
  post : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.post = navParams.get('item');
  }



}
