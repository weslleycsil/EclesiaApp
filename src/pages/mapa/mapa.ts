import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform  } from 'ionic-angular';

//provider
import { DadosProvider } from '../../providers/dados-provider';

//pluguins
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
declare var google: any;

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {
  celula: any;

  @ViewChild('map') mapElement: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public dados: DadosProvider,
    private launchNavigator: LaunchNavigator
  ) {
    this.celula = this.navParams.get('celula');

    platform.ready().then(()=> {
      this.loadMap();
    });
  }

  loadMap(){
    let latLng = new google.maps.LatLng(this.celula.latitude,this.celula.longitude );

    let mapEle = this.mapElement.nativeElement;

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    let map = new google.maps.Map(mapEle, mapOptions);

     var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: this.celula.Nome
      });

      var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+this.celula.Nome+'</h1>'+
      '<div id="bodyContent">'+
      '<p>Lider: '+this.celula.Lider+'</p>'+
      '<p>End: '+this.celula.Endereco+'</p>'+
      '</div>'+
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
  }

  verRota() {
    let coords = this.dados.getLocation();

    let options: LaunchNavigatorOptions = {
      start: [coords.latitude, coords.longitude]
    };

    this.launchNavigator.navigate([this.celula.latitude, this.celula.longitude], options).then(
      success => console.log('Navegador'),
      error => console.log(error)
    );
  }

}
