import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NgZone } from '@angular/core';

import { Storage } from '@ionic/storage';

//providers
import { LocalProvider } from './local-provider';
import { EventosProvider } from './eventos';

//plugins
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuth } from 'angularfire2/auth';


//libs
import * as Geolib from 'geolib';


@Injectable()
export class DadosProvider {

  private listReunioesSG = [];
  private listReunioesCF = [];
  private l;
  private zone: NgZone;
  private userCurrent;
  private userUid;

  constructor(
    private local: LocalProvider,
    private eventos: EventosProvider,
    private afData: AngularFireDatabase,
    private geolocation: Geolocation,
    private storage: Storage,
    private afAuth: AngularFireAuth,
  ) {

    this.zone = new NgZone({});
    //this.getCoords();
    this.atualizaIgreja();

    this.listReunioesSG = [
      {
        "dia": "Domingo",
        "reuniao": [{
            "foto": "",
            "horario": "9",
            "nome": "Escola Ministerial"
          },
          {
            "foto": "",
            "horario": "10",
            "nome": "Tadel"
          },
          {
            "foto": "",
            "horario": "18",
            "nome": "Culto de Celebração"
          }
        ]
      },
      {
        "dia": "Terça",
        "reuniao": [{
          "foto": "",
          "horario": "20",
          "nome": "Células de Terça"
        }]
      },
      {
        "dia": "Quinta",
        "reuniao": [{
          "foto": "",
          "horario": "20",
          "nome": "Culto de Avivamento"
        }]
      },
      {
        "dia": "Sexta",
        "reuniao": [{
          "foto": "",
          "horario": "20",
          "nome": "Células de Sexta"
        }]
      },
      {
        "dia": "Sábado",
        "reuniao": [{
          "foto": "",
          "horario": "19:30",
          "nome": "Programação Jovem"
        }]
      }
    ];
    this.listReunioesCF = [
      {
        "dia": "Domingo",
        "reuniao": [{
            "foto": "",
            "horario": "10",
            "nome": "Escola Ministerial"
          },
          {
            "foto": "",
            "horario": "11",
            "nome": "Tadel"
          },
          {
            "foto": "",
            "horario": "19",
            "nome": "Culto de Celebração"
          }
        ]
      },
      {
        "dia": "Terça",
        "reuniao": [{
          "foto": "",
          "horario": "20",
          "nome": "Células de Terça"
        }]
      }
    ];

    this.eventos.eventChangeIgreja
      .subscribe(event => {
        //console.log('verificando eventos...');
        if(event == true){
          //houve mudança
          this.atualizaIgreja()
        }
      });

    //this.getUser();
    }

  getUser(){
    this.afAuth.authState.subscribe((user: firebase.User) =>  this.userCurrent = user.uid, err => console.log(err))
  }

  getReunioes(){
    if(this.l == "sg"){
      return this.listReunioesSG;
    } else if(this.l == "cf"){
      return this.listReunioesCF;
    }
  }

  getMinisterio(){
    if(this.l == "sg"){
      return "Temos como missão amar a Deus sobre todas as coisas e servir as pessoas com Amor (Mt 22:37-39), ganhar almas, cuidar, discipular, batizá-las em nome do Pai do Filho e do Espirito Santo. \n Queremos ser referência de pregação da palavra onde estivermos estabelecidos e ter lares abertos para a propagação do Evangelho.";
    } else if(this.l == "cf"){
      return "Ainda sem conteudo";
    }
  }

  getPastor(){
    if(this.l == "sg"){

    } else if(this.l == "cf"){

    }
  }

  getYoutube(){
    if(this.l == "sg"){
      return "https://www.youtube.com/channel/UCRHjRWKrqcKl77f7x6wHKsQ";
    } else if(this.l == "cf"){
      return "https://www.google.com.br";
    }
  }

  getFace(){
    if(this.l == "sg"){
      return "https://www.facebook.com/eclesiacolubande/";
    } else if(this.l == "cf"){
      return "https://www.google.com.br";
    }
  }

  getConta(){
    if(this.l == "sg"){
      return "<p><strong>Comunidade Evangélica Eclesia</strong><br><br>Banco: 341 Itaú<br>AG.  6895<br>C.C. 26103-7<br>CNPJ:26.317.283/0001-93</p>";
    } else if(this.l == "cf"){
      return "<p>ver dados novos</p>";
    }
  }

  //VERIFICAR REPETICAO
  getEventos(successCallback, errorCallback){
    let link = "/"+this.l+"/events";
    let ref = this.afData.database.ref(link);
    let eventsList = [];

		ref.on('child_added', (snapshot) =>{
			this.zone.run( () =>{
				let objeto = snapshot.val();

        eventsList.push(objeto);

      });
      successCallback(eventsList);
    }, error => {
      errorCallback(error);
    });
  }

  getInfoMap(successCallback, errorCallback){
    let dados:any;
    let image: any;

    if(this.l == "sg"){
      dados = {
        lat: -22.83093,
        lng: -43.01562,
        telefone: '<p><strong>Igreja Eclesia - SG</strong><br><br>Tel: (21) 3583-2811</p>',
        endereco: '<p><strong>Igreja Eclesia - SG</strong><br><br>Rua José Mendonça de Campos,<br> N. 551 - Colubande<br>São Gonçalo - RJ</p>'
      }
      image = 'link 1';
    } else if(this.l == "cf"){
      dados = {
        lat: -22.83093,
        lng: -43.01562,
        telefone: '<p><strong>Igreja Eclesia - CF</strong><br><br>Tel: (21) 3583-2811</p>',
        endereco: '<p><strong>Igreja Eclesia - CF</strong><br><br>Rua,<br> N. <br>Cabo Frio - RJ</p>'
      }
      image = 'link 2';
    }
    successCallback({info: dados, link: image});
    errorCallback();
  }

  getBlogUrl(successCallback, errorCallback){
    let url: any;

    if(this.l == "sg"){
      url = "http://youngimpact.comunidadeeclesia.tk/wp-json/wp/v2/posts";
    } else if(this.l == "cf"){
      url = "";
    }
    successCallback(url);
    errorCallback();

  }

  getCelulas(successCallback, errorCallback){
    this.getLocation(coordenadas =>{
      this.getCel(coordenadas, ok => {
        successCallback(ok);
      }, err => errorCallback(err));

    }, err => errorCallback(err));

  }

  private getCel(coords,successCallback, errorCallback){
    let listCity = [];
    let celulasArray = [];

    this.getCidadesCel(cidades=>{
      const cidadesPromisses = cidades.map(cidade=>{
        let link = "/"+this.l+"/celulas/"+cidade+"/";
        let ref = this.afData.database.ref(link);
        let listCelulas = [];

        ref.on('value', celulasList => {
          celulasList.forEach( celula => {
            let cel;
            cel = celula.val();
            cel.distance = this.getDistance(coords,{latitude: Number(cel.latitude), longitude: Number(cel.longitude)});
            listCelulas.push(cel);
            celulasArray.push(cel);
            return false;
          })
        })

        listCity.push({
          cidade : cidade,
          celulas : listCelulas
        })

      });
      successCallback({list: listCity, array: celulasArray});
    },
    error => errorCallback(error));

  }

  private getCidadesCel(successCallback, errorCallback){
    let link = "/"+this.l+"/celulas/locais/";
    let ref = this.afData.database.ref(link);
    let cidades:any;

    ref.on('value', (snapshot) =>{
			this.zone.run( () =>{
        let objeto = snapshot.val();
        cidades = objeto;
      });
      successCallback(cidades);
    }, error => {
      errorCallback(error);
    });


  }

  private getDistance(origin, destination){
    let distance = Geolib.getDistance(origin, destination);
    //console.log(distance);
    return Geolib.convertUnit('km', distance, 2);
  }

  getCoords(){
    this.geolocation.getCurrentPosition().then(resp =>{
      this.storage.set('coords', {latitude: resp.coords.latitude, longitude: resp.coords.longitude}).then((change)=>{
      });
    });
  }

  geoLocation(successCallback, errorCallback){
    this.geolocation.getCurrentPosition().then(resp =>{
      successCallback({latitude: resp.coords.latitude, longitude: resp.coords.longitude})
    }, err => errorCallback(err));
  }

  getLocation(successCallback, errorCallback){
    this.storage.get('coords').then(done => {
      successCallback(done);
    }, err => errorCallback(err));
  }

  atualizaIgreja(){
    this.l = this.local.getIgreja();
    //console.log('Igreja Atualizada ',this.l);
    this.eventos.setChangeIgreja(false);
  }

  getNotifications(successCallback, errorCallback){
    let link = "/chats/"+this.userUid+"/";
    let ref = this.afData.database.ref(link);
    let chatList = [];

		ref.on('child_added', (snapshot) =>{
			this.zone.run( () =>{
				let objeto = snapshot.val();

        chatList.push(objeto);

      });
      successCallback(chatList);
    }, error => {
      errorCallback(error);
    });
  }

  getNewChats(successCallback, errorCallback){
    this.afAuth.authState.subscribe((user: firebase.User) =>  {
      this.userUid = user.uid;

      let link = "/userProfile/"+this.userUid+"/";
      let ref = this.afData.database.ref(link);

      let newChats: any;

      ref.on('value', (snapshot) =>{
          let objeto = snapshot.val();
          this.userCurrent = snapshot.val();

          newChats = objeto.chats;

        successCallback(newChats);
      }, error => {
        errorCallback(error);
      });
    }, err => console.log(err));

  }


}
