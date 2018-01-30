import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class Push {
    static init(){
        var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
            //isso será executado sempre que o usuario abrir a mensagem
        };

        window["plugins"].OneSignal
        .startInit("6ef7c987-b4d6-4821-8eba-ed72bf2a2313", "228173217601")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    }

    static getPushId(successCallback) {
      window["plugins"].OneSignal.getIds(ids => {
        successCallback(ids.userId);
      });
    }
}
