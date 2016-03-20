import {BaseService} from '../base.service';
import {Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';

import {Token} from '../common/token.service';

@Injectable()
export class Login extends BaseService {

  constructor(public http: Http, public token: Token) {
    super();
  }

  getGuestAccessToken() {
    return (window as any).fetch(
      `${this.baseUrl}${this.tokenSuffix}?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`,
      {
        method: 'GET',
        mode: 'cors'
      }
    );
  }

  getUserAccessToken(username: string, password: string) {
    return (window as any).fetch(
        `${this.baseUrl}${this.tokenSuffix}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
              'username': username,
              'password': password,
              'grant_type': 'password',
              'client_id': this.clientId,
              'client_secret': this.clientSecret
          })
        }
    );
  }

  getRefreshToken(refreshToken: string) {
    return (window as any).fetch(
        `${this.baseUrl}${this.tokenSuffix}?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`,
        {
          method: 'GET',
          mode: 'cors'
        }
    );
  }

  genericAuthReq(action: string, options: any) {

    let grant_type_mapping = {
      'getGuestAccessToken': 'client_credentials',
      'getUserAcessToken': 'password',
      'getRefreshToken': 'refresh_token'
    };

    let grantType = grant_type_mapping[action];
    const req = '';
    this.http.get(
    `${this.baseUrl}${this.tokenSuffix}?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=${grantType}`
    )
  }

}