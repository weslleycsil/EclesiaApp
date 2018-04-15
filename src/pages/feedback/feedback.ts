import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController, NavParams, ViewController, AlertController} from 'ionic-angular';

import { HttpClient } from '@angular/common/http';

import { NetworkProvider } from '../../providers/network-provider';


@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})

export class FeedbackPage {
  public starsOn = [];
  public starsOff = [];
  star: number = 3;
  public feedback: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public netInfo: NetworkProvider,
    public form: FormBuilder) {

      this.http = http;
      this.estrelas();

      this.feedback = form.group({
        nome:['',Validators.required],
        email:['',Validators.required],
        texto:['',Validators.required]
      });

  }

  estrelas(){
    this.starsOn = [];
    this.starsOff = [];
    for(var i = 0; i < this.star; i += 1){
      this.starsOn.push(i);
    }
    for(var i2 = this.star; i2 < 5; i2 += 1){
      this.starsOff.push(i2);
    }
  }

  mudar(){
    this.estrelas();
  }

  enviarFeed(){
    if(this.netInfo.isOnline()){
      this.enviar({
        "nome": this.feedback.value.nome,
        "email": this.feedback.value.email,
        "assunto": "Avaliação do App Eclesia",
        "mensagem": this.feedback.value.texto,
        "estrelas": this.star,
        "destinatario": "weslleycsil@gmail.com",
        "envio": true
      });
    } else {
      let alert = this.alertCtrl.create({
          title: 'Falha de Conexão',
          message: '<p>Infelizmente você não está conectado à Internet, portanto não será possivel enviar seu feedback.<br><br>Por favor conecte-se à Internet para enviar o feedback.</p>',
          buttons: ['Ok']
        });
        alert.present();
    }
  }
  enviar(obj: Object) {
        let body = JSON.stringify(obj);
        this.http.post('http://tecnicoweslley.com.br/projetoshtml/mailApi/mail2.php', body)
        .subscribe(body => {
          //console.log(body);
          let alert = this.alertCtrl.create({
            title: 'Obrigado',
            message: '<p>Seu Feedback será muito bem vindo!</p>',
            buttons: ['Ok']
          });
          alert.present();
          this.close();
        }, error =>{
          console.log(error);
          let alert = this.alertCtrl.create({
            title: 'Houve um Erro',
            message: '<p>Desculpe o inconveniente, estamos trabalhando para resolver esse problema.<br>Tente novamente mais tarde.</p>',
            buttons: ['Ok']
          });
          alert.present();
        });


  }

  close() {
    this.viewCtrl.dismiss();
  }


}
