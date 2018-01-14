import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { AuthProvider } from './../auth/auth';
import { ResponseCallback } from './../../interfaces/response-callback';

@Injectable()
export class NetworkHttpProvider {

  constructor
  (
    private http: Http
  )
  {}

  makeHttpPostRequest(url: string, data: any, token: string, responseCallback: (data: any) => void,
  errorCallback?: (data: any) => void): void {

    if (token == undefined) {
      if (errorCallback != null) {
        errorCallback('Token not found');
      }
      return;
    }

    const urlString: string = `${url}?` + this.buildParams(token).toString();

    console.log(urlString);

    this.http.post(urlString, data)
      .map(response => response.json())
      .subscribe(data => {
        responseCallback(data);
      },
      error => {
        if (errorCallback != undefined) {
          errorCallback(error);
        }
      }
    );
  }

  makeHttpGetRequest(url: string, token: string, responseCallback: (data: any) => void,
  errorCallback?: (data: any) => void): void {

    if (token == undefined) {
      if (errorCallback != null) {
        errorCallback('Token not found');
      }
      return;
    }

    const urlString: string = `${url}?` + this.buildParams(token).toString();

    console.log(urlString);

    this.http.get(urlString)
      .map(response => response.json())
      .subscribe(data => {
        responseCallback(data);
      },
      error => {
        if (errorCallback != undefined) {
          errorCallback(error);
        }
      }
    );
  }

  makeHttpPutRequest(url: string, data: any, token: string, responseCallback: (data: any) => void,
  errorCallback?: (data: any) => void): void {

    if (token == undefined) {
      if (errorCallback != null) {
        errorCallback('Token not found');
      }
      return;
    }

    const urlString: string = `${url}?` + this.buildParams(token).toString();

    console.log(urlString);

    this.http.put(urlString, data)
      .map(response => response.json())
      .subscribe(data => {
        responseCallback(data);
      },
      error => {
        if (errorCallback != undefined) {
          errorCallback(error);
        }
      }
    );
  }

  private buildParams(token: string): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    params.append('auth', token);

    return params;
  }
}
