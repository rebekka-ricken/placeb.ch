System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var Token;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Token = (function () {
                function Token() {
                }
                Token.prototype.getToken = function () {
                    return localStorage.getItem('token')
                        ? JSON.parse(localStorage.getItem('token')).access_token
                        : null;
                };
                Token.prototype.getExpiryDate = function () {
                    return JSON.parse(localStorage.getItem('token')).expires;
                };
                Token.prototype.isUser = function () {
                    if (this.getToken()) {
                        return this.getUserType() === 'user';
                    }
                };
                Token.prototype.getUserType = function () {
                    return localStorage.getItem('token')
                        ? JSON.parse(localStorage.getItem('token')).user_type
                        : 'guest';
                };
                Token.prototype.getRefreshToken = function () {
                    return JSON.parse(localStorage.getItem('token')).refresh_token;
                };
                Token.prototype.setToken = function (accessToken, expiresIn, type, refreshToken) {
                    var now = Date.now();
                    //let expires = new Date(now + 2.6e9);
                    var expires = new Date((~~(now / 1000) + expiresIn) * 1000);
                    var token = {
                        access_token: accessToken,
                        refresh_token: refreshToken ? refreshToken : null,
                        expires: expires,
                        user_type: type
                    };
                    localStorage.setItem('token', JSON.stringify(token));
                };
                Token.prototype.removeToken = function () {
                    localStorage.removeItem('token');
                };
                Token.prototype.isValid = function () {
                    var now = new Date();
                    // console.log(now);
                    // console.log(new Date(this.getExpiryDate()));
                    return now < new Date(this.getExpiryDate());
                };
                Token = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Token);
                return Token;
            }());
            exports_1("Token", Token);
        }
    }
});
//# sourceMappingURL=token.service.js.map