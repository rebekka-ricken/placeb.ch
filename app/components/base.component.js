System.register(['angular2/core', 'angular2/router', '../services/common/token.service', '../services/user.service', 'angular2/src/animate/animation_builder', "../pipes/localization.pipe"], function(exports_1, context_1) {
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
    var core_1, router_1, token_service_1, user_service_1, animation_builder_1, localization_pipe_1;
    var BaseComponent;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (localization_pipe_1_1) {
                localization_pipe_1 = localization_pipe_1_1;
            }],
        execute: function() {
            BaseComponent = (function () {
                function BaseComponent(router, userService, tokenHandler, ab, location) {
                    this.router = router;
                    this.userService = userService;
                    this.tokenHandler = tokenHandler;
                    this.ab = ab;
                    this.location = location;
                    this.pageStatus = false;
                    this.defaultLocale = 'en';
                    this.availableLocales = ['de', 'en'];
                    this.secureRoutes = ['/boxes', '/settings'];
                    this.params = {};
                    var browserLanguage = navigator.language ? navigator.language : navigator.browserLanguage;
                    if (browserLanguage && this.availableLocales.indexOf(browserLanguage.slice(0, 2)) > -1) {
                        this.locale = browserLanguage.slice(0, 2);
                    }
                    else {
                        this.locale = this.defaultLocale;
                    }
                }
                BaseComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.tokenHandler.getUserType() === 'guest'
                        && this.secureRoutes.indexOf(location.pathname) !== -1) {
                        window.location.href = '/';
                    }
                    this.getUser(false).then(function (user) {
                        _this.currentUser = user;
                    });
                };
                BaseComponent.prototype.ngAfterViewInit = function () {
                    if (document.querySelectorAll('.page').length) {
                        var animation = this.ab.css();
                        animation.setDuration(400);
                        animation
                            .setFromStyles({ opacity: 0 })
                            .setToStyles({ opacity: 1 });
                        animation.start(document.querySelectorAll('.page')[0]);
                    }
                };
                /**
                 * Checks if user is logged in
                 *
                 * @returns {boolean}
                 */
                BaseComponent.prototype.isLoggedIn = function () {
                    return !!(this.tokenHandler.getToken() && this.tokenHandler.isUser());
                };
                /**
                 * Get user promise
                 *
                 * @returns {any}
                 */
                BaseComponent.prototype.getUser = function (refresh) {
                    var _this = this;
                    if (refresh || (this.tokenHandler.isUser() && !this.userService.userData)) {
                        return this.userService.getCurrentUser()
                            .then(function (result) {
                            return result.json();
                        }).then(function (data) {
                            _this.userService.userData = data.user;
                            return Promise.resolve(data.user);
                        });
                    }
                    else {
                        return Promise.resolve(this.userService.userData);
                    }
                };
                /**
                 * Check of route is current
                 *
                 * @param route string
                 * @returns {boolean}
                 */
                BaseComponent.prototype.isCurrentRoute = function (route) {
                    return route === this.location.path();
                };
                BaseComponent = __decorate([
                    core_1.Component({
                        pipes: [localization_pipe_1.LocalizePipe],
                        providers: [router_1.Router, user_service_1.UserService] // Parent's instance
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService, token_service_1.Token, animation_builder_1.AnimationBuilder, router_1.Location])
                ], BaseComponent);
                return BaseComponent;
            }());
            exports_1("BaseComponent", BaseComponent);
        }
    }
});
//# sourceMappingURL=base.component.js.map