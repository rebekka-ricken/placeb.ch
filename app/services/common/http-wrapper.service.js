System.register(['angular2/core', 'angular2/http', './token.service', '../auth/login.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, token_service_1, login_service_1;
    var httpWrap;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            httpWrap = (function () {
                function httpWrap(http, token, loginService) {
                    this.http = http;
                    this.token = token;
                    this.loginService = loginService;
                    this._updateToken = true;
                    this.reqBuffer = [];
                    this.isRefreshing = false;
                    this.concurrentReqs = 0;
                }
                httpWrap.prototype.getHeader = function (token) {
                    var authHeaders = new http_1.Headers();
                    authHeaders.append('Authorization', 'Bearer ' + token);
                    return authHeaders;
                };
                httpWrap.prototype.resolveToken = function () {
                    this.concurrentReqs++;
                    if (!localStorage.getItem('token')) {
                        this._updateToken = true;
                        this._userType = 'guest';
                        return this.loginService.getGuestAccessToken();
                    }
                    else if (this.token.getUserType() === 'guest' && !this.token.isValid()) {
                        this._updateToken = true;
                        this._userType = 'guest';
                        return this.loginService.getGuestAccessToken();
                    }
                    else if (this.token.getUserType() === 'user' && !this.token.isValid()) {
                        if (this.isRefreshing)
                            return Promise.resolve(false);
                        this._updateToken = true;
                        this._userType = 'user';
                        this.isRefreshing = true;
                        return this.loginService.getRefreshToken(this.token.getRefreshToken());
                    }
                    else if (this.token.isValid()) {
                        this._updateToken = false;
                        return Promise.resolve(this.token.getToken());
                    }
                };
                httpWrap.prototype.get = function (url) {
                    var _this = this;
                    return this
                        .resolveToken()
                        .then(function (res) {
                        if (res === false)
                            return Promise.resolve('concurrency');
                        return typeof res === 'string' && res ? res : res.json();
                    })
                        .then(function (json) {
                        if (json === 'concurrency')
                            return Promise.resolve('retry');
                        if (_this._updateToken) {
                            _this.token.setToken(json.access_token, json.expires_in, _this._userType, json.refresh_token);
                        }
                        _this.isRefreshing = false;
                        var init = {
                            method: 'GET',
                            headers: {
                                "Authorization": 'Bearer ' + _this.token.getToken()
                            },
                            mode: 'cors'
                        };
                        return window.fetch(url, init);
                    })
                        .catch(function (err) {
                        //console.log(`error ${err} sending request`);
                    });
                };
                httpWrap.prototype.patch = function (url, data) {
                    var _this = this;
                    return this
                        .resolveToken()
                        .then(function (res) {
                        return typeof res === 'string' ? res : res.json();
                    })
                        .then(function (json) {
                        if (_this._updateToken) {
                            _this.token.setToken(json.access_token, json.expires_in, _this._userType, json.refresh_token);
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
                        return window.fetch(url, init);
                    });
                };
                httpWrap.prototype.put = function (url, data) {
                    var _this = this;
                    return this
                        .resolveToken()
                        .then(function (res) {
                        return typeof res === 'string' ? res : res.json();
                    })
                        .then(function (json) {
                        if (_this._updateToken) {
                            _this.token.setToken(json.access_token, json.expires_in, _this._userType, json.refresh_token);
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
                        return window.fetch(url, init);
                    });
                };
                httpWrap.prototype.post = function (url, data) {
                    var _this = this;
                    return this
                        .resolveToken()
                        .then(function (res) {
                        return typeof res === 'string' ? res : res.json();
                    })
                        .then(function (json) {
                        if (_this._updateToken) {
                            _this.token.setToken(json.access_token, json.expires_in, _this._userType, json.refresh_token);
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
                        return window.fetch(url, init);
                    });
                };
                httpWrap.prototype.delete = function (url, data) {
                    var _this = this;
                    return this
                        .resolveToken()
                        .then(function (res) {
                        return typeof res === 'string' ? res : res.json();
                    })
                        .then(function (json) {
                        if (_this._updateToken) {
                            _this.token.setToken(json.access_token, json.expires_in, _this._userType, json.refresh_token);
                        }
                        var init = {
                            method: 'DELETE',
                            headers: {
                                "Authorization": 'Bearer ' + _this.token.getToken(),
                                "Content-type": "application/json"
                            },
                            mode: 'cors'
                        };
                        return window.fetch(url, init);
                    });
                };
                httpWrap = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, token_service_1.Token, login_service_1.Login])
                ], httpWrap);
                return httpWrap;
            }());
            exports_1("httpWrap", httpWrap);
        }
    }
});
//# sourceMappingURL=http-wrapper.service.js.map