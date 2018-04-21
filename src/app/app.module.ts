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
import { SubmenuPage } from './../pages/submenu/submenu';

//home 1
import { ReunioesPage } from '../pages/reunioes/reunioes';
import { CelulasPage } from '../pages/celulas/celulas'; //<------ Por Ultimo
import { AgendaPage } from '../pages/agenda/agenda';
import { LocalizarPage } from '../pages/localizar/localizar';


//home 2
import { IgrejaPage } from './../pages/igreja/igreja';
import { ContatoPage } from './../pages/contato/contato';
import { PapojovemPage } from './../pages/papojovem/papojovem';

//home 3


//outras
import { ContaPage } from './../pages/conta/conta';
import { PayPage } from './../pages/pay/pay';

//submenupages
import { SobrePage } from './../pages/sobre/sobre';
import { PerfilPage } from './../pages/perfil/perfil';
import { FeedbackPage } from './../pages/feedback/feedback';

//Subpages
import { MinisterioPage } from './../pages/ministerio/ministerio';
import { PastorPage } from './../pages/pastor/pastor';

import { AgendaViewPage } from '../pages/agenda-view/agenda-view';
import { ReunioesViewPage } from '../pages/reunioes-view/reunioes-view';
import { PostblogPage } from './../pages/papojovem/postblog/postblog';
import { ListCelulasPage } from './../pages/celulas/list/list';
import { ViewCelulaPage } from './../pages/celulas/list/view-celula/view-celula';

import { MapaPage } from '../pages/mapa/mapa';





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
import { Geolocation } from '@ionic-native/geolocation';


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
    ContatoPage,
    MinisterioPage,
    PastorPage,
    AgendaPage,
    AgendaViewPage,
    LocalizarPage,
    PapojovemPage,
    PostblogPage,
    ListCelulasPage,
    ViewCelulaPage,
    MapaPage
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
    ContatoPage,
    IgrejaPage,
    MinisterioPage,
    PastorPage,
    ReunioesPage,
    ReunioesViewPage,
    AgendaPage,
    AgendaViewPage,
    LocalizarPage,
    PapojovemPage,
    PostblogPage,
    ListCelulasPage,
    ViewCelulaPage,
    MapaPage
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
    DadosProvider,
    Geolocation
  ]
})
export class AppModule {}
