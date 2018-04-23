import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { EventosProvider } from './eventos';


@Injectable()
export class LocalProvider {
  private igreja: any;

  constructor(
    private storage: Storage,
    private eventos: EventosProvider) {
      //console.log('Provider Local');
      this.eventos.setChangeIgreja(false);
      this.verificaLocal()
  }

  private verificaLocal(){
    this.storage.get('igreja').then(done => {
      if (done == "" || !done) {
        //console.log("nenhuma igreja armazenada");
        this.storage.set('igreja', "sg");
        this.igreja = "sg";
        console.log("igreja: ",this.igreja);
      } else {
        //console.log("igreja ",done);
        this.igreja = done;
        //console.log("igreja: ",this.igreja);
      }
      this.eventos.setChangeIgreja(true);
    });
  }

  changeLocal(l){
    this.storage.set('igreja', l).then((change)=>{
      this.igreja = l;
      this.eventos.setChangeIgreja(true);
      //console.log("igreja Trocada ", change);
    });
  }

  getIgreja(): string{
    return this.igreja;
  }

}
