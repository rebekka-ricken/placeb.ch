System.register(['angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1;
    var BaseService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            BaseService = (function () {
                function BaseService() {
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
                BaseService.prototype.getHeaders = function (token) {
                    var authHeaders = new http_1.Headers();
                    authHeaders.append('Authorization', 'Bearer ' + token);
                    return authHeaders;
                };
                return BaseService;
            }());
            exports_1("BaseService", BaseService);
        }
    }
});
//# sourceMappingURL=base.service.js.map