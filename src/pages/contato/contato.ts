import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NetworkProvider } from '../../providers/network-provider';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html'
})
export class ContatoPage {

  public contato: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public viewCtrl: ViewController,
    public alerCtrl: AlertController,
    public netInfo: NetworkProvider,
    public form: FormBuilder) {

      this.http = http;
      this.contato = form.group({
        nome:['',Validators.required],
        email:['',Validators.required],
        assunto:['',Validators.required],
        texto:['',Validators.required]
      });

    }

    enviarContato(){
    if(this.netInfo.isOnline()){
      this.enviar({
        "nome": this.contato.value.nome,
        "email": this.contato.value.email,
        "assunto": this.contato.value.assunto,
        "mensagem": this.contato.value.texto,
        "destinatario": "weslleycsil@gmail.com",
        "envio": true
      });
    } else {
      let alert = this.alerCtrl.create({
          title: 'Falha de Conexão',
          message: '<p>Infelizmente você não está conectado à Internet, portanto não será possivel enviar seu contato.<br><br>Por favor conecte-se à Internet para enviar o feedback.</p>',
          buttons: ['Ok']
        });
        alert.present();
    }
  }
  enviar(obj: Object) {
        let body = JSON.stringify(obj);
        this.http.post('https://twcreativs.com.br/projetoshtml/mailApi/mail.php', body)
        .subscribe(body => {
          //console.log(body);
          let alert = this.alerCtrl.create({
            title: 'Obrigado',
            message: '<p>Assim que possivel, estaremos retornando seu contato.</p>',
            buttons: ['Ok']
          });
          alert.present();
          this.close();
        }, error =>{
          //console.log(error);
          let alert = this.alerCtrl.create({
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
