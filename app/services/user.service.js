System.register(['./base.service', 'angular2/core', './common/http-wrapper.service'], function(exports_1, context_1) {
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
    var base_service_1, core_1, http_wrapper_service_1;
    var UserService;
    return {
        setters:[
            function (base_service_1_1) {
                base_service_1 = base_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_wrapper_service_1_1) {
                http_wrapper_service_1 = http_wrapper_service_1_1;
            }],
        execute: function() {
            UserService = (function (_super) {
                __extends(UserService, _super);
                function UserService(http) {
                    _super.call(this);
                    this.http = http;
                    this.isUserFetched = false;
                    this.userData = null;
                }
                UserService.prototype.init = function (data) {
                    for (var p in data) {
                        if (this.userData.hasOwnProperty(p)) {
                            this.userData[p] = data[p];
                        }
                    }
                    this.isUserFetched = true;
                };
                UserService.prototype.getUser = function () {
                    return this.isUserFetched ? this.userData : 'no data';
                };
                UserService.prototype.getCurrentUser = function () {
                    return this.http.get("" + this.baseUrl + this.userSuffix);
                };
                UserService.prototype.updateCurrentUser = function (id, data) {
                    return this.http.patch("" + this.baseUrl + this.usersSuffix + id, data);
                };
                UserService.prototype.getUserReservations = function (id) {
                    return this.http.get("" + this.baseUrl + this.usersSuffix + id + this.reservationsSuffix);
                };
                UserService.prototype.getReservation = function (id) {
                    return this.http.get("" + this.baseUrl + this.apiSuffix + this.reservationsSuffix + "/" + id);
                };
                UserService.prototype.createUserReservations = function (id, data) {
                    return this.http.post("" + this.baseUrl + this.usersSuffix + id + this.reservationsSuffix, data);
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_wrapper_service_1.httpWrap])
                ], UserService);
                return UserService;
            }(base_service_1.BaseService));
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map