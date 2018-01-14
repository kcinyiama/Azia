import { ENV } from './../../env';
import { Injectable } from '@angular/core';
import { AuthProvider } from './../auth/auth';
import { JournalModel } from './../../models/journal';
import { LabelProvider } from './../label/label';
import { UtilsProvider } from './../utils';
import { NetworkHttpProvider } from './../net/net-http';

import { ResponseCallback } from './../../interfaces/response-callback';

@Injectable()
export class JournalHttpProvider {

  constructor
  (
    private authProvider: AuthProvider,
    private utilsProvider: UtilsProvider,
    private netHttpProvider: NetworkHttpProvider
  )
  {}

  // TODO Replace with Web sockets

  getJournalData(callback: ({}: ResponseCallback) => void): void {
    const userEmail = this.utilsProvider.formatString(this.authProvider.getUser().email);
    const url = `${ENV.DATABASE_URL}/journals/${userEmail}.json`;

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

  saveJournalData(journal: JournalModel, callback: ({}: ResponseCallback) => void): any {
    const userEmail = this.utilsProvider.formatString(this.authProvider.getUser().email);
    const url = `${ENV.DATABASE_URL}/journals/${userEmail}/${journal.labelId}.json`;

    this.netHttpProvider.makeHttpPostRequest(url, journal, this.authProvider.getToken(),
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
      }
    );
  }

  updateJournalData(journal: JournalModel, callback:({}: ResponseCallback) => void): void {
    const userEmail = this.utilsProvider.formatString(this.authProvider.getUser().email);
    const url = `${ENV.DATABASE_URL}/journals/${userEmail}/${journal.labelId}.json`;

    this.netHttpProvider.makeHttpPutRequest(url, journal, this.authProvider.getToken(),
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

  deleteJournalData(journal: JournalModel, callback: ({}: ResponseCallback) => void): any {
    const userEmail = this.utilsProvider.formatString(this.authProvider.getUser().email);
    const url = `${ENV.DATABASE_URL}/journals/${userEmail}/${journal.labelId}/${journal.id}.json`;

    this.netHttpProvider.makeHttpPutRequest(url, {}, this.authProvider.getToken(),
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
      }
    );
  }
}
