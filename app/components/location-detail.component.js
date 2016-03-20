System.register(['angular2/core', "../pipes/localization.pipe", "./base.component", "angular2/router", "../services/user.service", "angular2/src/animate/animation_builder", "../services/common/token.service"], function(exports_1, context_1) {
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
    var core_1, localization_pipe_1, base_component_1, router_1, user_service_1, animation_builder_1, token_service_1;
    var LocationDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localization_pipe_1_1) {
                localization_pipe_1 = localization_pipe_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            }],
        execute: function() {
            LocationDetailComponent = (function (_super) {
                __extends(LocationDetailComponent, _super);
                function LocationDetailComponent(tokenHandler, router, userService, ab, translator) {
                    _super.call(this, router, userService, tokenHandler, ab);
                    this.tokenHandler = tokenHandler;
                    this.router = router;
                    this.userService = userService;
                    this.ab = ab;
                    this.translator = translator;
                    this.toggle = new core_1.EventEmitter();
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], LocationDetailComponent.prototype, "location", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], LocationDetailComponent.prototype, "reservation", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], LocationDetailComponent.prototype, "info", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], LocationDetailComponent.prototype, "toggle", void 0);
                LocationDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'location',
                        templateUrl: 'app/templates/location-detail.tmpl.html',
                        pipes: [localization_pipe_1.LocalizePipe],
                        providers: [localization_pipe_1.LocalizePipe]
                    }), 
                    __metadata('design:paramtypes', [token_service_1.Token, router_1.Router, user_service_1.UserService, animation_builder_1.AnimationBuilder, localization_pipe_1.LocalizePipe])
                ], LocationDetailComponent);
                return LocationDetailComponent;
            }(base_component_1.BaseComponent));
            exports_1("LocationDetailComponent", LocationDetailComponent);
        }
    }
});
//# sourceMappingURL=location-detail.component.js.map