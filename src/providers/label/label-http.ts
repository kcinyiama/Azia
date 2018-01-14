import { ENV } from './../../env';
import { LabelModel } from './../../models/label';
import { Injectable } from '@angular/core';
import { NetworkHttpProvider } from './../net/net-http';
import { UtilsProvider } from './../utils';
import { AuthProvider } from './../auth/auth';

import { ResponseCallback } from './../../interfaces/response-callback';

@Injectable()
export class LabelHttpProvider {

  // TODO Remove boilerplate

  constructor
  (
    private authProvider: AuthProvider,
    private utilsProvider: UtilsProvider,
    private netHttpProvider: NetworkHttpProvider
  )
  {}

  getLabelData(callback:({}: ResponseCallback) => void): void {
    const userEmail = this.utilsProvider.formatString(this.authProvider.getUser().email);
    const url = `${ENV.DATABASE_URL}/labels/${userEmail}.json`;

    this.netHttpProvider.makeHttpGetRequest(url, this.authProvider.getToken(),
    (data: any) => {
      callback({
        status: true,
        message: '',
        extras: data
      });
    },
    (error: any) => {
      callback({
        status: false,
        message: error
      });
    });
  }

  saveLabelData(label: LabelModel, callback:({}: ResponseCallback) => void): void {
    const userEmail = this.utilsProvider.formatString(this.authProvider.getUser().email);
    const url = `${ENV.DATABASE_URL}/labels/${userEmail}.json`;

    this.netHttpProvider.makeHttpPostRequest(url, label, this.authProvider.getToken(),
    (data: any) => {
      callback({
        status: true,
        message: '',
        extras: data
      });
    },
    (error: any) => {
      callback({
        status: false,
        message: error
      });
    });
  }

  updateLabelData(label: LabelModel, callback:({}: ResponseCallback) => void): void {
    const userEmail = this.utilsProvider.formatString(this.authProvider.getUser().email);
    const url = `${ENV.DATABASE_URL}/labels/${userEmail}/${label.id}.json`;

    this.netHttpProvider.makeHttpPutRequest(url, label, this.authProvider.getToken(),
    (data: any) => {
      callback({
        status: true,
        message: '',
        extras: data
      });
    },
    (error: any) => {
      callback({
        status: false,
        message: error
      });
    });
  }

  deleteLabelData(label: LabelModel, callback:({}: ResponseCallback) => void): void {
    const userEmail = this.utilsProvider.formatString(this.authProvider.getUser().email);
    let url = `${ENV.DATABASE_URL}/labels/${userEmail}/${label.id}.json`;

    // Delete the labels
    this.netHttpProvider.makeHttpPutRequest(url, {}, this.authProvider.getToken(),
    (data: any) => {

      url = `${ENV.DATABASE_URL}/journals/${userEmail}/${label.id}.json`;

      // Delete the journals associated with the labels
      this.netHttpProvider.makeHttpPostRequest(url, {}, this.authProvider.getToken(),
      (data: any) => {
        callback({
          status: true,
          message: '',
          extras: data
        });
      },
      (error: any) => {
        callback({
          status: false,
          message: error
        });
      });
    },
    (error: any) => {
      callback({
        status: false,
        message: error
      });
    });
  }
}








