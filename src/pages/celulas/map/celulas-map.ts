import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform  } from 'ionic-angular';

//providers
import { DadosProvider } from '../../../providers/dados-provider';

//page
import { ViewCelulaPage } from './../list/view-celula/view-celula';

//models

import { Celula } from './../../../models/celula';


declare var google: any;

@Component({
  selector: 'page-celulas-map',
  templateUrl: 'celulas-map.html'
})

export class CelulasMapPage {
  @ViewChild('map') mapElement: ElementRef;
  public listcelulas = [];
  public map:any;
  public celula;
  mapViewOptions: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public dados: DadosProvider,) {
      this.celula = new Celula();

      platform.ready().then(()=> {
        this.dados.getCelulas(resp => {
          this.listcelulas = resp.array;
        }, err=> console.log(err));

      }, err => {
        console.log(err)
      }).then(()=>{
        setTimeout(() => {
          this.initPage();
        }, 1000);
      });

      /*this.mapViewOptions = {
        handleHeight: 50,
        thresholdFromBottom: 200,
        thresholdFromTop: 200,
        bounceBack: true,
        titulo: "EU Teste"
      };*/

    }

    initPage(){
      this.loadMap();
      setTimeout(() => {
        this.loadMarkers();
      }, 1000);
    }

    private loadMap(){
      this.dados.getLocation(coords=>{
        //console.log(coords);
        this.celula = this.getNear(coords);
        //console.log(this.celula);
        let latLng = new google.maps.LatLng(this.celula.latitude,this.celula.longitude);
        let mapEle = this.mapElement.nativeElement;

        let mapOptions = {
          center: latLng,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        }

        this.map = new google.maps.Map(mapEle, mapOptions);



      }, err => console.log(err));
    }

    loadMarkers(){
      //console.log(this.listcelulas.length)

      let markers = [];
      for(let local of this.listcelulas){

        let latLng = new google.maps.LatLng(local.latitude, local.longitude);


        markers.push({mark: new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: local.Nome
        }), celula: local});


      }
      //console.log(markers);
      //inserir ação nos markers
      let me = this;
      for(let marker of markers){
        marker.mark.setMap(this.map);
        marker.mark.addListener('click', function() {
          //abrir page da celula
          me.open(marker.celula);
        });
      }
    }
    open(item){
      this.navCtrl.push(ViewCelulaPage,{item});
    }

    getNear(origem){
      let menor: Celula;
      let distance = 100000000000;
      for(let celula of this.listcelulas){
        if(distance > celula.distance){
          distance = celula.distance;
          menor = celula;
        }
      };
      return menor;
    }


}
