import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { AuthProvider } from './../../../providers/auth/auth';

@Component({
  templateUrl: './logout.html'
})
export class LogoutPopoverPage {

  constructor
  (
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private authProvider: AuthProvider
  )
  {}

  onLogout(): void {
    this.viewCtrl.dismiss();
    this.authProvider.logout();
  }
}



