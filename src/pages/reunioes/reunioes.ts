import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams
} from 'ionic-angular';

import {
  ReunioesViewPage
} from '../reunioes-view/reunioes-view'


@Component({
  selector: 'page-reunioes',
  templateUrl: 'reunioes.html'
})
export class ReunioesPage {
  public listReunioes = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.listReunioes = [{
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
  }

  verInfo(item) {
    this.navCtrl.push(ReunioesViewPage, {
      item
    });
  }


}
