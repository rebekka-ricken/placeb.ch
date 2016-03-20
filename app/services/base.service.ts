import {Http, Headers} from 'angular2/http';
import {Token} from './common/token.service';

export class BaseService {
  protected baseUrl: string;
  protected tokenSuffix: string;
  protected locationsSuffix: string;
  protected boxSuffix: string;
  protected categoriesSuffix: string;
  protected userSuffix: string;
  protected usersSuffix: string;
  protected reservationsSuffix: string;
  protected registrationUrl: string;
  protected parametersUrl: string;
  protected termsUrl: string;
  protected apiSuffix: string;
  protected clientId: string;
  protected clientSecret: string;
  protected accessToken: string;
  protected expiresIn: number;
  protected tokenType: string;

  constructor() {
    this.baseUrl = 'https://api-staging.placeb.ch'; //'https://api-testing.placeb.ch';  //'http://placeb-dev.kindgeek.com';
    this.registrationUrl = this.baseUrl + '/api/v1/users';
    this.parametersUrl = this.baseUrl + '/api/v1/parameters';
    this.termsUrl = this.baseUrl + '/api/v1/texts/terms';
    this.tokenSuffix = '/oauth/v2/token';
    this.locationsSuffix = '/api/v1/locations';
    this.boxSuffix = '/api/v1/boxes/';
    this.categoriesSuffix = '/categories';
    this.userSuffix = '/api/v1/user';
    this.usersSuffix = '/api/v1/users/';
    this.apiSuffix = '/api/v1';
    this.reservationsSuffix = '/reservations';
    this.clientId = '3_3mt9dc9x63c4cccwockgg48sck084k8ggw4w08s4sw0csgwckg';
    this.clientSecret = '2p1pz3px4qsk8gcc0gok4wgogkcoo0w44gs8440k8wg8ccck4s';
    this.tokenType = 'bearer';
  }

  getHeaders(token) {
    let authHeaders = new Headers();
    authHeaders.append('Authorization', 'Bearer ' + token);
    return authHeaders;
  }

}
