import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';

import { LabelModel } from './../models/label';

@Injectable()
export class UtilsProvider {

  constructor(private toastCtrl: ToastController) {}

  labelSelectedListener = new Subject<LabelModel>();

  formatString(str: string): string {
    return str.replace('.', '_');
  }

  generateUUID () { // Public Domain/MIT
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  showToast(message: string, duration: number = 3000): void {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
