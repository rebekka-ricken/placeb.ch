System.register(['angular2/core', 'angular2/router', './components/map.component', './components/settings.component', './components/boxes.component', './components/login.component', './components/signup.component', './services/common/token.service', './services/auth/login.service', './services/auth/signup.service', 'angular2/common', './services/user.service', './directives/logged-in-outlet', './services/common/http-wrapper.service', "./components/base.component", 'angular2/src/animate/animation_builder', "./services/params.service", "./pipes/localization.pipe"], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, map_component_1, settings_component_1, boxes_component_1, login_component_1, signup_component_1, token_service_1, login_service_1, signup_service_1, common_1, user_service_1, logged_in_outlet_1, http_wrapper_service_1, base_component_1, animation_builder_1, params_service_1, localization_pipe_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (map_component_1_1) {
                map_component_1 = map_component_1_1;
            },
            function (settings_component_1_1) {
                settings_component_1 = settings_component_1_1;
            },
            function (boxes_component_1_1) {
                boxes_component_1 = boxes_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (signup_service_1_1) {
                signup_service_1 = signup_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (logged_in_outlet_1_1) {
                logged_in_outlet_1 = logged_in_outlet_1_1;
            },
            function (http_wrapper_service_1_1) {
                http_wrapper_service_1 = http_wrapper_service_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (params_service_1_1) {
                params_service_1 = params_service_1_1;
            },
            function (localization_pipe_1_1) {
                localization_pipe_1 = localization_pipe_1_1;
            }],
        execute: function() {
            App = (function (_super) {
                __extends(App, _super);
                function App(router, 
                    //private _loginService:Login,
                    paramsService, tokenHandler, 
                    //private _lc:LoginComponent,
                    userService, http, ab, location) {
                    var _this = this;
                    _super.call(this, router, userService, tokenHandler, ab, location);
                    this.router = router;
                    this.paramsService = paramsService;
                    this.tokenHandler = tokenHandler;
                    this.userService = userService;
                    this.http = http;
                    this.ab = ab;
                    this.location = location;
                    this.authModalOpened = false;
                    this.registrationModalOpened = false;
                    paramsService.eventEmmitter.subscribe(function (parameters) {
                        _this.params = parameters;
                    });
                }
                App.prototype.toggleModal = function ($event) {
                    this.authModalOpened = false;
                };
                App.prototype.toggleRegistrationModal = function ($event) {
                    this.registrationModalOpened = false;
                };
                App = __decorate([
                    core_1.Component({
                        pipes: [localization_pipe_1.LocalizePipe],
                        selector: 'app',
                        templateUrl: 'app/templates/main.tmpl.html',
                        directives: [common_1.CORE_DIRECTIVES, router_2.ROUTER_DIRECTIVES, login_component_1.LoginComponent, signup_component_1.SignupComponent, logged_in_outlet_1.LoggedInOutlet],
                        providers: [login_service_1.Login, signup_service_1.Signup, token_service_1.Token, params_service_1.ParamsService]
                    }),
                    router_1.RouteConfig([
                        { path: '/', component: map_component_1.MapComponent, name: 'Home' },
                        { path: '/settings', component: settings_component_1.SettingsComponent, name: 'Settings' },
                        { path: '/boxes', component: boxes_component_1.BoxesComponent, name: 'Boxes' }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, params_service_1.ParamsService, token_service_1.Token, user_service_1.UserService, http_wrapper_service_1.httpWrap, animation_builder_1.AnimationBuilder, router_1.Location])
                ], App);
                return App;
            }(base_component_1.BaseComponent));
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map