System.register(['./base.service', 'angular2/core', './common/token.service', './auth/login.service', './common/http-wrapper.service'], function(exports_1, context_1) {
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
    var base_service_1, core_1, token_service_1, login_service_1, http_wrapper_service_1;
    var LocationsService;
    return {
        setters:[
            function (base_service_1_1) {
                base_service_1 = base_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (http_wrapper_service_1_1) {
                http_wrapper_service_1 = http_wrapper_service_1_1;
            }],
        execute: function() {
            LocationsService = (function (_super) {
                __extends(LocationsService, _super);
                function LocationsService(
                    // public http: Http,
                    http, token, loginService) {
                    _super.call(this);
                    this.http = http;
                    this.token = token;
                    this.loginService = loginService;
                }
                LocationsService.prototype.getLocations = function () {
                    return this.http.get("" + this.baseUrl + this.locationsSuffix);
                };
                LocationsService.prototype.getSingleLocation = function (id) {
                    return this.http.get("" + this.baseUrl + this.locationsSuffix + "/" + id);
                };
                LocationsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_wrapper_service_1.httpWrap, token_service_1.Token, login_service_1.Login])
                ], LocationsService);
                return LocationsService;
            }(base_service_1.BaseService));
            exports_1("LocationsService", LocationsService);
        }
    }
});
//# sourceMappingURL=locations.service.js.map