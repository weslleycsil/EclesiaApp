import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

//componentes
import { ExpandableComponent } from './../components/expandable/expandable';

//providers
import { PayPalProvider } from '../providers/pay-pal/pay-pal';
import { NetworkProvider } from '../providers/network-provider';
import { Push } from '../providers/push';
import { LoginProvider } from '../providers/login-provider';
import { FacebookProvider } from '../providers/facebook';
import { LocalProvider } from './../providers/local-provider';
import { EventosProvider } from './../providers/eventos';
import { DadosProvider } from '../providers/dados-provider';


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
import { FeedbackPage } from './../pages/feedback/feedback';
import { ContatoPage } from './../pages/contato/contato';



//plugins
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchReview } from '@ionic-native/launch-review';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';
//import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';


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
    SubmenuPage,
    FeedbackPage,
    ContatoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
    SubmenuPage,
    FeedbackPage,
    ContatoPage
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
    LoginProvider,
    FacebookProvider,
    AppVersion,
    InAppBrowser,
    LaunchReview,
    LaunchNavigator,
    SocialSharing,
    Network,
    LocalProvider,
    EventosProvider,
    DadosProvider
  ]
})
export class AppModule {}
