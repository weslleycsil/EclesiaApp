import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

//models
import { Credencial } from '../models/credencial';
import { Usuario } from '../models/user';

//providers
import { Push } from './push';
import { EventosProvider } from './eventos';
import { LocalProvider } from './local-provider';

//plugins
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';




@Injectable()
export class LoginProvider {

  public userProfile: any;
  public provedor: any;
  public usuario: Usuario;

  constructor(
    private local: LocalProvider,
    private push: Push,
    private afAuth: AngularFireAuth,
    private afData: AngularFireDatabase
  ) {
    this.userProfile = this.afData.database.ref('/userProfile');
    this.provedor = new firebase.auth.FacebookAuthProvider();
    this.usuario = new Usuario();

  }

  registrar(credencial: Credencial, usuario: Usuario): any{
    return firebase.auth().createUserWithEmailAndPassword(credencial.email,credencial.senha)
    .then((User) => {
      Push.getPushId(id => {
        //console.log(User);
        this.userProfile.child(User.uid).set({nome: usuario.nome, email: credencial.email, foto: "any", pushID: id});
      });
    }, error => {
      console.log(error);
    });
  }

  login(credencial: Credencial): any {
    return this.afAuth.auth.signInWithEmailAndPassword(credencial.email,credencial.senha);
  }

  logoff(){
    this.afAuth.auth.signOut();
  }

  resetPassword(credencial: Credencial): any {
    return this.afAuth.auth.sendPasswordResetEmail(credencial.email);
  }

  facebook(token, pushId, successCallback, errorCallback){
    console.log('token: ',token)
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(token);
    this.afAuth.auth.signInWithCredential(facebookCredential).then((success)=>{
      console.log(success);
      let data :any;
      data = success;
      this.setUserFace(data.providerData[0],pushId);
      successCallback();
    }).catch((error)=>{
      console.log("Firebase failure: ", error);
      errorCallback(error);
    });
  }

  private setUser(authData: any, pushID: string){
    this.usuario.nome = authData.user.displayName;
    this.usuario.email = authData.user.email;
    this.usuario.foto = authData.user.photoURL;
    this.usuario.uid = authData.user.uid;
    this.usuario.pushID = pushID;
    //console.log(this.usuario);
    this.saveUser(this.usuario);
  }
  private setUserFace(authData: any, pushID: string){
    this.usuario.nome = authData.displayName;
    this.usuario.email = authData.email;
    this.usuario.foto = authData.photoURL;
    this.usuario.uid = authData.uid;
    this.usuario.pushID = pushID;
    //console.log(this.usuario);
    this.saveUser(this.usuario);
  }
  updatePushID(){

  }

  private saveUser(user: Usuario){
    this.userProfile.child(user.uid).set({nome: user.nome, email: user.email, foto: user.foto, pushID: user.pushID});
  }

  checkAuthState(successCallback, errorCallback) {
    this.afAuth.authState.subscribe((res) => {
      successCallback(res);
    }, err=>  errorCallback(err));
  }

}
