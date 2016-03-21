import {BaseService} from './base.service';
import {Location} from '../interfaces/location';
import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Token} from './common/token.service';
import {Login} from './auth/login.service';
import {Observable} from 'rxjs';

import {httpWrap} from './common/http-wrapper.service';


@Injectable()
export class LocationsService extends BaseService {

  constructor
  (
    // public http: Http,
    public http: httpWrap,
    public token: Token,
    public loginService: Login
  ) {
    super();
  }

  getLocations() {
    return this.http.get(
      `${this.baseUrl}${this.locationsSuffix}`
    );

  }

  getSingleLocation(id: string) {
    return this.http.get(
      `${this.baseUrl}${this.locationsSuffix}/${id}`
    );
  }

}
