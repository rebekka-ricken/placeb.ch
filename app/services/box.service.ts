import {BaseService} from './base.service';
import {Box} from '../interfaces/box';
import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Token} from './common/token.service';

import {httpWrap} from './common/http-wrapper.service';

@Injectable()
export class BoxService extends BaseService {

    constructor(public http: httpWrap, public token: Token) {
      super();
    }

    getBox(id) {
      return this.http.get(
        `${this.baseUrl}${this.boxSuffix}${id}`);
      /*
      return this.http.get(
        `${this.baseUrl}${this.boxSuffix}${id}`, {
          headers: this.getHeaders(this.token.getToken())
        })
        */
    }

 }
