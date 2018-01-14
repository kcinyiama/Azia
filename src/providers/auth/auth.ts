import { Injectable } from '@angular/core';

import { ResponseCallback } from './../../interfaces/response-callback';

@Injectable()
export class AuthProvider {

  private token: string;

  verifyCredentials(email: string, password: string, callback: ({}: ResponseCallback) => void): void {
    // firebase.auth().signInWithEmailAndPassword(email, password)
    // .then((response: any) => {
    //   this.getToken();

    //   callback({
    //     status: true,
    //     message: ''
    //   });
    // })
    // .catch((error: any) => {
    //   // TODO Show proper error messages
    //   callback({
    //     status: false,
    //     message: ''
    //   });
    // });
      callback({
        status: true,
        message: ''
      });
  }

  logout(): void {
    // firebase.auth().signOut();
    this.token = null;
  }

  getUser(): any {
    // return firebase.auth().currentUser;
  }

  getToken(): string {
    // firebase.auth().currentUser.getIdToken()
    // .then((token: string) => {
    //   this.token = token;
    // })
    // .catch((error: any) => {
    //   // Parse error
    // });

    return this.token;
  }
}



