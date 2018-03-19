import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class FootballdataService {

  authToken = "f5f83dd8fbe14b72bb499461ef1ac003";

  private headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });

  constructor(public http: Http) {
    this.headers.append('X-auth-token', this.authToken);
  }

}
