import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { HomePage } from './../home/home';

import { AuthProvider } from './../../providers/auth/auth';
import { ResponseCallback } from './../../interfaces/response-callback';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController
  ) {}

  onVerifyCredentials(f): void {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loading.present();

    this.authProvider.verifyCredentials(f.value.email, f.value.password, (r: ResponseCallback) => {
      loading.dismiss();

      if (!r.status) {
        this.toastCtrl.create({
          duration: 2000,
          message: 'Problem while signing you in'
        }).present();

        return;
      }

      this.navCtrl.setRoot(HomePage);
    });
  }
}






