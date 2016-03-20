System.register(['angular2/core', '../services/user.service', '../services/common/token.service', 'angular2/router', "./base.component", 'angular2/src/animate/animation_builder', "../pipes/localization.pipe"], function(exports_1, context_1) {
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
    var core_1, user_service_1, token_service_1, router_1, base_component_1, animation_builder_1, localization_pipe_1;
    var SettingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            SettingsComponent = (function (_super) {
                __extends(SettingsComponent, _super);
                function SettingsComponent(userService, tokenHandler, router, ab, translator) {
                    var _this = this;
                    _super.call(this, router, userService, tokenHandler, ab);
                    this.userService = userService;
                    this.tokenHandler = tokenHandler;
                    this.router = router;
                    this.ab = ab;
                    this.translator = translator;
                    this.dataToUpdate = {};
                    ga('send', 'event', 'navigation', 'account');
                    this.getUser(true).then(function (user) {
                        _this.currentUser = Object.assign({}, user);
                        _this.dataToUpdate = Object.assign({}, user);
                    });
                }
                /**
                 * Update user settings
                 */
                SettingsComponent.prototype.updateSettings = function () {
                    var _this = this;
                    delete this.dataToUpdate.id;
                    delete this.dataToUpdate.honorificTitle;
                    this.userService.updateCurrentUser(this.currentUser.id, this.dataToUpdate)
                        .then(function () {
                        alertify.notify(_this.translator.transform('userdataSaved', [_this.locale]), 'success', 5, function () {
                        });
                    }).catch(function () {
                        alertify.notify(_this.translator.transform('userdataNotSaved', [_this.locale]), 'error', 5, function () {
                        });
                    });
                };
                SettingsComponent.prototype.logOut = function () {
                    this.tokenHandler.removeToken();
                    this.currentUser = null;
                    this.router.navigateByUrl('/');
                };
                SettingsComponent = __decorate([
                    core_1.Component({
                        directives: [],
                        providers: [localization_pipe_1.LocalizePipe],
                        templateUrl: 'app/templates/settings.tmpl.html',
                        pipes: [localization_pipe_1.LocalizePipe],
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, token_service_1.Token, router_1.Router, animation_builder_1.AnimationBuilder, localization_pipe_1.LocalizePipe])
                ], SettingsComponent);
                return SettingsComponent;
            }(base_component_1.BaseComponent));
            exports_1("SettingsComponent", SettingsComponent);
        }
    }
});
//# sourceMappingURL=settings.component.js.map