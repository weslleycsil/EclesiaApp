import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//componentes
import { ExpandableComponent } from './../components/expandable/expandable';

//providers
import { PayPalProvider } from '../providers/pay-pal/pay-pal';
import { NetworkProvider } from '../providers/network-provider';
import { Push } from '../providers/push';
import { Dados } from '../providers/dados';
import { LoginProvider } from '../providers/login-provider';
import { FacebookProvider } from '../providers/facebook';

//paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SobrePage } from './../pages/sobre/sobre';
import { PerfilPage } from './../pages/perfil/perfil';
import { ContaPage } from './../pages/conta/conta';
import { PayPage } from './../pages/pay/pay';
import { CelulasPage } from '../pages/celulas/celulas';
import { ReunioesPage } from '../pages/reunioes/reunioes';
import { ReunioesViewPage } from '../pages/reunioes-view/reunioes-view';
import { IgrejaPage } from './../pages/igreja/igreja';
import { SubmenuPage } from './../pages/submenu/submenu';

//plugins
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchReview } from '@ionic-native/launch-review';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';
//import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';


//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyCixxMQwUqZvjwgaclFOl7jaNGaY1GzKlk",
    authDomain: "appeclesia-5a1bd.firebaseapp.com",
    databaseURL: "https://appeclesia-5a1bd.firebaseio.com",
    storageBucket: "appeclesia-5a1bd.appspot.com",
    messagingSenderId: "228173217601"
};



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SobrePage,
    PerfilPage,
    ContaPage,
    ExpandableComponent,
    PayPage,
    CelulasPage,
    ReunioesPage,
    ReunioesViewPage,
    IgrejaPage,
    SubmenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SobrePage,
    PerfilPage,
    ContaPage,
    ExpandableComponent,
    PayPage,
    CelulasPage,
    SubmenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PayPal,
    PayPalProvider,
    NetworkProvider,
    Push,
    Dados,
    LoginProvider,
    FacebookProvider,
    AppVersion,
    InAppBrowser,
    LaunchReview,
    LaunchNavigator,
    SocialSharing
  ]
})
export class AppModule {}
