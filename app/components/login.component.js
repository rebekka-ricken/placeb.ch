System.register(['angular2/core', 'angular2/router', '../services/common/token.service', '../services/auth/login.service', '../services/common/http-wrapper.service', 'angular2/common', '../services/user.service', "./base.component", 'angular2/src/animate/animation_builder', "../pipes/localization.pipe"], function(exports_1, context_1) {
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
    var core_1, router_1, token_service_1, login_service_1, http_wrapper_service_1, common_1, user_service_1, base_component_1, animation_builder_1, localization_pipe_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (http_wrapper_service_1_1) {
                http_wrapper_service_1 = http_wrapper_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (localization_pipe_1_1) {
                localization_pipe_1 = localization_pipe_1_1;
            }],
        execute: function() {
            LoginComponent = (function (_super) {
                __extends(LoginComponent, _super);
                function LoginComponent(tokenHandler, loginHandler, router, userService, ab, http, translator, location) {
                    _super.call(this, router, userService, tokenHandler, ab, location);
                    this.tokenHandler = tokenHandler;
                    this.loginHandler = loginHandler;
                    this.router = router;
                    this.userService = userService;
                    this.ab = ab;
                    this.http = http;
                    this.translator = translator;
                    this.location = location;
                    this.toggle = new core_1.EventEmitter();
                    this.auth = new core_1.EventEmitter();
                    this.errors = '';
                    this.state = 'login';
                    this.resetError = '';
                    this.credentials = {
                        username: undefined,
                        password: undefined,
                        email: undefined
                    };
                }
                LoginComponent.prototype.restorePassword = function (e) {
                    var _this = this;
                    e.preventDefault();
                    this.http.delete("https://api-staging.placeb.ch/api/v1/users/" + this.credentials.email + "/password")
                        .then(function (res) {
                        return res.json();
                    })
                        .then(function (res) {
                        console.log(res);
                        if ((res.code === 404 && res.message === "User not found!") || !(res.code >= 200 && res.code < 300)) {
                            _this.resetError = res.message;
                            alertify.notify(_this.translator.transform('passwordResetError', [_this.locale]), 'error', 5, function () {
                            });
                        }
                        else {
                            alertify.notify(_this.translator.transform('passwordResetSuccess', [_this.locale]), 'success', 5, function () {
                            });
                            _this.toggle.emit('');
                        }
                    })
                        .catch(function (err) {
                        // unexpected end of input when 204
                        if (/unexpected end/i.test(err.message)) {
                            alertify.notify(_this.translator.transform('passwordResetSuccess', [_this.locale]), 'success', 5, function () {
                            });
                            _this.toggle.emit('');
                        }
                    });
                };
                LoginComponent.prototype.change = function () {
                    this.errors = '';
                };
                LoginComponent.prototype.changeReset = function () {
                    this.resetError = '';
                };
                LoginComponent.prototype.login = function (event, username, password) {
                    var _this = this;
                    event.preventDefault();
                    if (!this.credentials.username || !this.credentials.password) {
                        this.errors = this.translator.transform('enterEmailPass', [this.locale]);
                        return;
                    }
                    this.loginHandler
                        .getUserAccessToken(this.credentials.username, this.credentials.password)
                        .then(function (res) {
                        return typeof res === 'string' ? res : res.json();
                    })
                        .then(function (res) {
                        if ('error' in res) {
                            _this.errors = _this.translator.transform(res.error_description, [_this.locale]);
                            _this.credentials.password = '';
                            return;
                        }
                        _this.tokenHandler.setToken(res.access_token, res.expires_in, 'user', res.refresh_token);
                        _this.userService.getCurrentUser()
                            .then(function (result) {
                            return result.json();
                        }).then(function (result) {
                            _this.userService.userData = result.user;
                            _this.currentUser = result.user;
                        });
                        _this.toggle.emit('');
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], LoginComponent.prototype, "opened", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], LoginComponent.prototype, "toggle", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], LoginComponent.prototype, "auth", void 0);
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        templateUrl: 'app/templates/login.tmpl.html',
                        pipes: [localization_pipe_1.LocalizePipe],
                        providers: [localization_pipe_1.LocalizePipe]
                    }), 
                    __metadata('design:paramtypes', [token_service_1.Token, login_service_1.Login, router_1.Router, user_service_1.UserService, animation_builder_1.AnimationBuilder, http_wrapper_service_1.httpWrap, localization_pipe_1.LocalizePipe, router_1.Location])
                ], LoginComponent);
                return LoginComponent;
            }(base_component_1.BaseComponent));
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map