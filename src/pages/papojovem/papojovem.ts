import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

//pages
import { PostblogPage } from './postblog/postblog';

//providers
import { DadosProvider } from '../../providers/dados-provider';

@Component({
  selector: 'page-papojovem',
  templateUrl: 'papojovem.html'
})
export class PapojovemPage {
  private url: string;
  items: any;
  page: any;
  public loading:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private dados: DadosProvider
  ) {
      this.dados.getBlogUrl((res)=>{
        this.url = res;


      },(error)=>{
        console.log(error)
      });
    }


    ionViewDidEnter() {
      this.loading = this.loadingCtrl.create({
          content: 'Carregando...'
      });
      this.loading.present();

      this.page = '1';
      this.loadPosts( this.page ).then( data => {
        console.log('Posts loaded', data);
        this.items = data;
      });
    }

    post(item){
      this.navCtrl.push(PostblogPage,{item});
    }

    loadPosts( page ) {

      if( !page ) {
          let page = '1';
        }

      return new Promise(resolve => {
        this.http.get( this.url + '?page=' + page )
          .map(res => res)
          .subscribe(data => {
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            resolve( data );
          }, err => console.log(err),
          () => this.loading.dismiss());

      });
    }

    loadMore(infiniteScroll) {

	    this.page++;

	    this.loadPosts( this.page ).then( items => {
	      // Loads posts from WordPress API
        let length = items["length"];
        console.log(length);

	      if( length === 0 ) {
	        infiniteScroll.complete();
	        return;
	      }

	      for (var i = length - 1; i >= 0; i--) {
	        this.items.push( items[i] );
	      }

	      infiniteScroll.complete();
	    });
  	}

    vejaMais(size, value): any {
      if (value && value.length > size) {
        return value.substr(0, size) + "... - Veja mais";
      }
      return value;
    }







}
