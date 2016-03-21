System.register(['angular2/core', 'angular2/common', 'angular2/router', '../services/common/token.service', '../services/auth/signup.service', '../services/broadcaster', '../services/user.service', "./base.component", "../validators/extendedValidators", 'angular2/src/animate/animation_builder', "../services/params.service", "../pipes/localization.pipe", "../services/terms.service", '../services/auth/login.service'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, token_service_1, signup_service_1, common_2, broadcaster_1, user_service_1, base_component_1, extendedValidators_1, animation_builder_1, params_service_1, localization_pipe_1, terms_service_1, login_service_1;
    var SignupComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
                common_2 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (signup_service_1_1) {
                signup_service_1 = signup_service_1_1;
            },
            function (broadcaster_1_1) {
                broadcaster_1 = broadcaster_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (extendedValidators_1_1) {
                extendedValidators_1 = extendedValidators_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (params_service_1_1) {
                params_service_1 = params_service_1_1;
            },
            function (localization_pipe_1_1) {
                localization_pipe_1 = localization_pipe_1_1;
            },
            function (terms_service_1_1) {
                terms_service_1 = terms_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            SignupComponent = (function (_super) {
                __extends(SignupComponent, _super);
                function SignupComponent(tokenHandler, _signup, router, paramsService, broadcaster, termsServ, userService, fb, ab, loginHandler, location) {
                    _super.call(this, router, userService, tokenHandler, ab, location);
                    this.tokenHandler = tokenHandler;
                    this._signup = _signup;
                    this.router = router;
                    this.paramsService = paramsService;
                    this.broadcaster = broadcaster;
                    this.termsServ = termsServ;
                    this.userService = userService;
                    this.fb = fb;
                    this.ab = ab;
                    this.loginHandler = loginHandler;
                    this.location = location;
                    this.toggle = new core_1.EventEmitter();
                    this.auth = new core_1.EventEmitter();
                    this.errors = { amount: 0, messages: undefined };
                    this.isAgreed = undefined;
                    this.terms = undefined;
                    this.validationInfo = '';
                    this.termsLinks = {
                        "de": "https://www.placeb.ch/tc-de.pdf",
                        "en": "https://www.placeb.ch/tc-en.pdf "
                    };
                    this.email = new common_2.Control("", common_1.Validators.compose([common_1.Validators.required, extendedValidators_1.ExtendedValidators.email]));
                    this.firstName = new common_2.Control("", common_1.Validators.required);
                    this.lastName = new common_2.Control("", common_1.Validators.required);
                    this.plainPassword = new common_2.Control("", common_1.Validators.required);
                    this.passwordConfirmation = new common_2.Control("", common_1.Validators.required);
                    this.terms = this.termsLinks[this.locale];
                    this.signUpForm = fb.group({
                        "email": this.email,
                        "firstName": this.firstName,
                        "lastName": this.lastName,
                        "plainPassword": this.plainPassword,
                        "passwordConfirmation": this.passwordConfirmation
                    }, {
                        validator: extendedValidators_1.ExtendedValidators.equals('plainPassword', 'passwordConfirmation')
                    });
                }
                SignupComponent.prototype.onSubmit = function (pass, passConfirmation) {
                    var _this = this;
                    delete this.signUpForm.value.passwordConfirmation;
                    this._signup.createUser(this.signUpForm.value)
                        .then(function (res) {
                        if (res.statusText.toLowerCase() === 'created' && (res.status >= 200 && res.status < 300)) {
                            return res.status;
                        }
                        else if (res.status === 400) {
                            return res.json();
                        }
                    })
                        .then(function (res) {
                        if (typeof res === 'number' && (res >= 200 && res < 300)) {
                            _this.toggle.emit('');
                            _this.loginHandler
                                .getUserAccessToken(_this.signUpForm.value.email, _this.signUpForm.value.plainPassword)
                                .then(function (res) {
                                return typeof res === 'string' ? res : res.json();
                            })
                                .then(function (res) {
                                if ('error' in res) {
                                    return;
                                }
                                _this.tokenHandler.setToken(res.access_token, res.expires_in, 'user', res.refresh_token);
                                _this
                                    .userService
                                    .getCurrentUser()
                                    .then(function (result) {
                                    return result.json();
                                })
                                    .then(function (result) {
                                    _this.userService.userData = result.user;
                                    _this.currentUser = result.user;
                                });
                            });
                        }
                        else if (res.code === 400 && res.message === 'Validation Failed') {
                            for (var p in res.errors.children) {
                                if ('errors' in res.errors.children[p]) {
                                    for (var i = 0; i < res.errors.children[p].errors.length; i++) {
                                        _this.errors[p] = res.errors.children[p].errors[i];
                                        _this.errors.amount++;
                                    }
                                }
                            }
                            if (_this.errors.amount) {
                                var temp = [];
                                for (var p in _this.errors) {
                                    p !== 'amount' && p !== 'messages' && temp.push(_this.errors[p]);
                                }
                                _this.errors.messages = Array.isArray(temp.length) ? temp.join('. ') : temp;
                                _this.validationInfo = _this.errors.messages;
                            }
                        }
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SignupComponent.prototype, "opened", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SignupComponent.prototype, "toggle", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SignupComponent.prototype, "auth", void 0);
                SignupComponent = __decorate([
                    core_1.Component({
                        selector: 'signup',
                        directives: [common_2.CORE_DIRECTIVES, common_2.FORM_DIRECTIVES],
                        templateUrl: 'app/templates/signup.tmpl.html',
                        pipes: [localization_pipe_1.LocalizePipe],
                        providers: [terms_service_1.TermsService]
                    }), 
                    __metadata('design:paramtypes', [token_service_1.Token, signup_service_1.Signup, router_1.Router, params_service_1.ParamsService, broadcaster_1.Broadcaster, terms_service_1.TermsService, user_service_1.UserService, common_1.FormBuilder, animation_builder_1.AnimationBuilder, login_service_1.Login, router_1.Location])
                ], SignupComponent);
                return SignupComponent;
            }(base_component_1.BaseComponent));
            exports_1("SignupComponent", SignupComponent);
        }
    }
});
//# sourceMappingURL=signup.component.js.map