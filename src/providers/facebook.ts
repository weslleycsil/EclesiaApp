import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class FacebookProvider {
  constructor(private fb: Facebook){}
  user:any;

  login(successCallback, errorCallback) {
    this.fb.login(['public_profile', 'email']).then(response => {
      successCallback(response.authResponse);
    }, error => {
      errorCallback(error);
    })
  }

  getUserDetail(userid, successCallback, errorCallback) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        successCallback(res);
      })
      .catch(e => {
        errorCallback(e);
      });
  }

}
