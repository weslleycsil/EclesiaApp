import { Injectable, EventEmitter } from "@angular/core";
@Injectable()
export class EventosProvider {

  eventChangeIgreja = new EventEmitter<any>();
  private changeIgreja: boolean;

  constructor() {
    this.changeIgreja = false;
    //console.log("Provider Evento")
  }
  getChangeIgreja() {
    return this.changeIgreja;
  }
  setChangeIgreja(val: boolean) {
    this.changeIgreja = val;
    this.eventChangeIgreja.emit(val);
    //console.log("Evento disparado")
  }
}
