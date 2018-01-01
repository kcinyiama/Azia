import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { HomePage } from './../home/home';

import { ResponseCallback } from './../../interfaces/response-callback';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  onVerifyCredentials(f): void {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loading.present();
  }
}




