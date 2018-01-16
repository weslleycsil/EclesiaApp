import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//componentes
import { ExpandableComponent } from './../components/expandable/expandable';

//providers
import { PayPalProvider } from '../providers/pay-pal/pay-pal';

//paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SobrePage } from './../pages/sobre/sobre';
import { PerfilPage } from './../pages/perfil/perfil';
import { ContaPage } from './../pages/conta/conta';
import { PayPage } from './../pages/pay/pay';

//plugins
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchReview } from '@ionic-native/launch-review';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SobrePage,
    PerfilPage,
    ContaPage,
    ExpandableComponent,
    PayPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SobrePage,
    PerfilPage,
    ContaPage,
    ExpandableComponent,
    PayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppVersion,
    InAppBrowser,
    LaunchReview,
    PayPal,
    PayPalProvider
  ]
})
export class AppModule {}
