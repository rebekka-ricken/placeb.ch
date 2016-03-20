import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptionsArgs} from 'angular2/http';
import {Token} from './token.service';
import {Login} from '../auth/login.service';

@Injectable()
export class httpWrap {

    private _userType:string;
    public _updateToken:boolean = true;

    public isRefreshing;
    public reqBuffer = [];
    public concurrentReqs:number;

    constructor(private http:Http, private token:Token, private loginService:Login) {
        this.isRefreshing = false;
        this.concurrentReqs = 0;
    }

    getHeader(token:string) {
        let authHeaders = new Headers();
        authHeaders.append('Authorization', 'Bearer ' + token);
        return authHeaders;
    }

    resolveToken() {
        this.concurrentReqs++;
        if (!localStorage.getItem('token')) {
            this._updateToken = true;
            this._userType = 'guest';
            return this.loginService.getGuestAccessToken();
        } else if (this.token.getUserType() === 'guest' && !this.token.isValid()) {
            this._updateToken = true;
            this._userType = 'guest';
            return this.loginService.getGuestAccessToken();
        } else if (this.token.getUserType() === 'user' && !this.token.isValid()) {
            if (this.isRefreshing) return Promise.resolve(false);
            this._updateToken = true;
            this._userType = 'user';
            this.isRefreshing = true;
            return this.loginService.getRefreshToken(this.token.getRefreshToken());
        } else if (this.token.isValid()) {
            this._updateToken = false;
            return Promise.resolve(this.token.getToken());
        }
    }

    get(url:string) {
        return this
            .resolveToken()
            .then((res) => {
                if (res === false) return Promise.resolve('concurrency');
                return typeof res === 'string' && res ? res : res.json();
            })
            .then((json) => {
                if (json === 'concurrency')
                    return Promise.resolve('retry');
                if (this._updateToken) {
                    this.token.setToken(
                        json.access_token,
                        json.expires_in,
                        this._userType,
                        json.refresh_token
                    );
                }
                this.isRefreshing = false;
                var init = {
                    method: 'GET',
                    headers: {
                        "Authorization": 'Bearer ' + this.token.getToken()
                    },
                    mode: 'cors'
                };
                return (window as any).fetch(url, init);

            })
            .catch((err) => {
                //console.log(`error ${err} sending request`);
            })
    }

    patch(url, data) {
        var _this = this;
        return this
            .resolveToken()
            .then(function (res) {
                return typeof res === 'string' ? res : res.json();
            })
            .then(function (json) {
                if (_this._updateToken) {
                    _this.token.setToken(
                        json.access_token,
                        json.expires_in,
                        _this._userType,
                        json.refresh_token
                    );
                }
                var init = {
                    method: 'PATCH',
                    headers: {
                        "Authorization": 'Bearer ' + _this.token.getToken(),
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data),
                    mode: 'cors'
                };
                return (window as any).fetch(url, init);

            });
    }

    put(url, data) {
        var _this = this;
        return this
            .resolveToken()
            .then(function (res) {
                return typeof res === 'string' ? res : res.json();
            })
            .then(function (json) {
                if (_this._updateToken) {
                    _this.token.setToken(
                        json.access_token,
                        json.expires_in,
                        _this._userType,
                        json.refresh_token
                    );
                }
                var init = {
                    method: 'PUT',
                    headers: {
                        "Authorization": 'Bearer ' + _this.token.getToken(),
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data),
                    mode: 'cors'
                };
                return (window as any).fetch(url, init);

            });
    }

    post(url, data) {
        var _this = this;
        return this
            .resolveToken()
            .then(function (res) {
                return typeof res === 'string' ? res : res.json();
            })
            .then(function (json) {
                if (_this._updateToken) {
                    _this.token.setToken(
                        json.access_token,
                        json.expires_in,
                        _this._userType,
                        json.refresh_token
                    );
                }
                var init = {
                    method: 'POST',
                    headers: {
                        "Authorization": 'Bearer ' + _this.token.getToken(),
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data),
                    mode: 'cors'
                };
                return (window as any).fetch(url, init);

            });
    }


    delete(url, data?) {
        var _this = this;
        return this
            .resolveToken()
            .then(function (res) {
                return typeof res === 'string' ? res : res.json();
            })
            .then(function (json) {
                if (_this._updateToken) {
                    _this.token.setToken(
                        json.access_token,
                        json.expires_in,
                        _this._userType,
                        json.refresh_token
                    );
                }
                var init = {
                    method: 'DELETE',
                    headers: {
                        "Authorization": 'Bearer ' + _this.token.getToken(),
                        "Content-type": "application/json"
                    },
                    mode: 'cors'
                };
                return (window as any).fetch(url, init);

            });
    }
}
