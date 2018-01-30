import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


@Injectable()
export class Dados {

  public listReunioesSG = [];
  public listReunioesCF = [];
  public l;

  constructor(public storage: Storage) {
    console.log("Hello dados!");
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
    this.storage.get('igreja').then((value) => {
      this.l = value;
    }).catch((empty) => {
        console.log(empty);
    });
  }
  getReunioes(){
    this.getL();
    if(this.l == "sg"){
      return this.listReunioesSG;
    } else if(this.l == "cf"){
      return this.listReunioesCF;
    }
  }

  getMinisterio(){
    this.getL();
    if(this.l == "sg"){
      return "Temos como missão amar a Deus sobre todas as coisas e servir as pessoas com Amor (Mt 22:37-39), ganhar almas, cuidar, discipular, batizá-las em nome do Pai do Filho e do Espirito Santo. \n Queremos ser referência de pregação da palavra onde estivermos estabelecidos e ter lares abertos para a propagação do Evangelho.";
    } else if(this.l == "cf"){
      return "Ainda sem conteudo";
    }
  }

  getPastor(){
    this.getL();
    if(this.l == "sg"){

    } else if(this.l == "cf"){

    }
  }

  getYoutube(){
    this.getL();
    if(this.l == "sg"){
      return "https://www.youtube.com/channel/UCRHjRWKrqcKl77f7x6wHKsQ";
    } else if(this.l == "cf"){
      return "https://www.google.com.br";
    }
  }

  getFace(){
    this.getL();
    if(this.l == "sg"){
      return "https://www.facebook.com/eclesiacolubande/";
    } else if(this.l == "cf"){
      return "https://www.google.com.br";
    }
  }

  getConta(){
    this.getL();
    if(this.l == "sg"){
      return "<p><strong>Comunidade Evangélica Eclesia</strong><br><br>Banco: 341 Itaú<br>AG.  6895<br>C.C. 26103-7<br>CNPJ:26.317.283/0001-93</p>";
    } else if(this.l == "cf"){
      return "<p>ver dados novos</p>";
    }
  }

  getL(){
    console.log("obtendo L ");
    this.storage.get('igreja').then((value) => {
      this.l = value;
      console.log(value);
    }).catch((empty) => {
        console.log(empty);
    });
  }


}
