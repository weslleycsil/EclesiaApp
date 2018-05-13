import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform,  AlertController} from 'ionic-angular';

//plugins
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';

//providers
import { DadosProvider } from '../../providers/dados-provider';


declare var google: any;

@Component({
  selector: 'page-localizar',
  templateUrl: 'localizar.html'
})
export class LocalizarPage {
  online :any;
  dadosMap: any;
  link: any;

  @ViewChild('map') mapElement: ElementRef;

  constructor(
    public navCtrl: NavController,
    platform: Platform,
    public alerCtrl: AlertController,
    public dados: DadosProvider,
    private geolocation: Geolocation,
    private launchNavigator: LaunchNavigator,
    private callNumber: CallNumber
  ) {

    platform.ready().then(()=> {
      this.online = true;
      this.dados.getInfoMap((res)=>{
        this.dadosMap = res.info;
        this.link = res.link
      },(error)=>{
        console.log(error);
      });
      this.loadMap();
    });
  }

  loadImg():boolean{
    return this.online;
  }

  loadMap(){

    let latLng = new google.maps.LatLng(this.dadosMap.lat, this.dadosMap.lng);
    let mapEle = this.mapElement.nativeElement;

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let map = new google.maps.Map(mapEle, mapOptions);

     var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Eclesia'
      });
  }

  verRota(){
    this.geolocation.getCurrentPosition().then(result=>{

      let options: LaunchNavigatorOptions ={
        start: [result.coords.latitude,result.coords.longitude]
      };
      this.launchNavigator.navigate([this.dadosMap.lat, this.dadosMap.lng],options).then(
        success => console.log('Navegador'),
        error => console.log(error)
      );

    });
  }

  verTelefone(){
    let alert = this.alerCtrl.create({
      title: 'Nosso Contato',
      message: this.dadosMap.telefone,
      buttons: [{
        text: 'OK',
        handler: () => {}
      },
      {
        text: 'Ligar',
        handler: () => {
          this.callNumber.callNumber(this.dadosMap.numero, true)
            .then(res => console.log('Ligando', res))
            .catch(err => console.log('Error launching dialer', err));
        }
      }]
    });
    alert.present();
  }
  verEndereco(){
    let alert = this.alerCtrl.create({
      title: 'Onde Estamos',
      message: this.dadosMap.endereco,
      buttons: ['Ok']
    });
    alert.present();
  }


}
