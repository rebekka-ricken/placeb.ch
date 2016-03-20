System.register(['../base.service', 'angular2/http', 'angular2/core', '../common/token.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var base_service_1, http_1, core_1, token_service_1;
    var Login;
    return {
        setters:[
            function (base_service_1_1) {
                base_service_1 = base_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            }],
        execute: function() {
            Login = (function (_super) {
                __extends(Login, _super);
                function Login(http, token) {
                    _super.call(this);
                    this.http = http;
                    this.token = token;
                }
                Login.prototype.getGuestAccessToken = function () {
                    return window.fetch("" + this.baseUrl + this.tokenSuffix + "?client_id=" + this.clientId + "&client_secret=" + this.clientSecret + "&grant_type=client_credentials", {
                        method: 'GET',
                        mode: 'cors'
                    });
                };
                Login.prototype.getUserAccessToken = function (username, password) {
                    return window.fetch("" + this.baseUrl + this.tokenSuffix, {
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
                    });
                };
                Login.prototype.getRefreshToken = function (refreshToken) {
                    return window.fetch("" + this.baseUrl + this.tokenSuffix + "?client_id=" + this.clientId + "&client_secret=" + this.clientSecret + "&grant_type=refresh_token&refresh_token=" + refreshToken, {
                        method: 'GET',
                        mode: 'cors'
                    });
                };
                Login.prototype.genericAuthReq = function (action, options) {
                    var grant_type_mapping = {
                        'getGuestAccessToken': 'client_credentials',
                        'getUserAcessToken': 'password',
                        'getRefreshToken': 'refresh_token'
                    };
                    var grantType = grant_type_mapping[action];
                    var req = '';
                    this.http.get("" + this.baseUrl + this.tokenSuffix + "?client_id=" + this.clientId + "&client_secret=" + this.clientSecret + "&grant_type=" + grantType);
                };
                Login = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, token_service_1.Token])
                ], Login);
                return Login;
            }(base_service_1.BaseService));
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=login.service.js.map