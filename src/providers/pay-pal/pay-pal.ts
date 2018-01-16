import { Injectable } from '@angular/core';

import { PayPal, PayPalConfiguration } from '@ionic-native/paypal';

@Injectable()
export class PayPalProvider {

  constructor(
    private payPal: PayPal) {
    console.log('Hello PayPalProvider Provider');
  }

  payPalEnvironment: string = 'payPalEnvironmentSandbox';
  clientIDs = {
    "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
    "PayPalEnvironmentSandbox": "AfTdQzk2YrTLN_3y-WQro7jWdkHDcg3m7_DbdIjyHPpwY3KGNZpyt_yFQDR40t5UcGkerckMKUNix1-N"
  };

  pagar(payment){
    this.payPal.init(this.clientIDs).then(() => {
			this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				this.payPal.renderSinglePaymentUI(payment).then((response) => {
					alert(`Successfully paid. Status = ${response.response.state}`);
					console.log(response);
				}, () => {
					console.error('Error or render dialog closed without being successful');
				});
			}, () => {
				console.error('Error in configuration');
			});
		}, (error) => {
      console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
      console.log(error);
		});
  }

}
