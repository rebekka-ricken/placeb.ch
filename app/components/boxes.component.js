System.register(['angular2/core', 'angular2/src/animate/animation_builder', 'angular2/router', '../services/common/scroller.service', '../services/common/token.service', '../services/user.service', '../pipes/filter.pipe', '../pipes/amount.pipe', '../pipes/customCurrency.pipe', "./base.component", "../pipes/boxSize.pipe", "../pipes/localization.pipe"], function(exports_1, context_1) {
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
    var core_1, animation_builder_1, router_1, scroller_service_1, token_service_1, router_2, user_service_1, filter_pipe_1, amount_pipe_1, customCurrency_pipe_1, base_component_1, boxSize_pipe_1, localization_pipe_1;
    var BoxesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (scroller_service_1_1) {
                scroller_service_1 = scroller_service_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (filter_pipe_1_1) {
                filter_pipe_1 = filter_pipe_1_1;
            },
            function (amount_pipe_1_1) {
                amount_pipe_1 = amount_pipe_1_1;
            },
            function (customCurrency_pipe_1_1) {
                customCurrency_pipe_1 = customCurrency_pipe_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (boxSize_pipe_1_1) {
                boxSize_pipe_1 = boxSize_pipe_1_1;
            },
            function (localization_pipe_1_1) {
                localization_pipe_1 = localization_pipe_1_1;
            }],
        execute: function() {
            BoxesComponent = (function (_super) {
                __extends(BoxesComponent, _super);
                function BoxesComponent(ab, router, userService, tokenHandler, location) {
                    var _this = this;
                    _super.call(this, router, userService, tokenHandler, ab, location);
                    this.ab = ab;
                    this.router = router;
                    this.userService = userService;
                    this.tokenHandler = tokenHandler;
                    this.location = location;
                    this.reservations = [];
                    this.selectedBox = 0;
                    this.boxDetails = {};
                    this.amount = false;
                    this.reservationsFetched = false;
                    this.pageLoaded = false;
                    ga('send', 'event', 'navigation', 'my boxes');
                    this.getUser(false)
                        .then(function (user) {
                        _this.userService.getUserReservations(user.id).then(function (res) {
                            return res.json();
                        })
                            .then(function (res) {
                            _this.reservationsFetched = true;
                            _this.reservations = res.reservations;
                            _this.selectCategory('current');
                        });
                    });
                }
                BoxesComponent.prototype.selectCategory = function (e) {
                    this.categorySelected = e;
                    var res = this.reservations.filter(function (item) {
                        return item.status === e;
                    });
                    this.amount = res.length > 0;
                };
                BoxesComponent.prototype.openReservation = function ($event, id) {
                    if (this.selectedBox !== 0 && this.selectedBox == id) {
                        this.selectedBox = 0;
                    }
                    else {
                        this.selectedBox = id;
                    }
                };
                BoxesComponent = __decorate([
                    core_1.Component({
                        directives: [],
                        providers: [scroller_service_1.Scroller],
                        pipes: [filter_pipe_1.FilterPipe, amount_pipe_1.AmountPipe, customCurrency_pipe_1.CustomCurrencyPipe, boxSize_pipe_1.BoxSizePipe, localization_pipe_1.LocalizePipe],
                        templateUrl: 'app/templates/boxes.tmpl.html'
                    }), 
                    __metadata('design:paramtypes', [animation_builder_1.AnimationBuilder, router_2.Router, user_service_1.UserService, token_service_1.Token, router_1.Location])
                ], BoxesComponent);
                return BoxesComponent;
            }(base_component_1.BaseComponent));
            exports_1("BoxesComponent", BoxesComponent);
        }
    }
});
//# sourceMappingURL=boxes.component.js.map