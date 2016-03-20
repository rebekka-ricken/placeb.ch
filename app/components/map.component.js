System.register(['angular2/core', 'angular2/router', 'angular2-google-maps/core', '../services/locations.service', '../services/categories.service', '../services/box.service', '../components/location-detail.component', '../services/auth/login.service', '../services/common/token.service', '../components/login.component', '../components/reservation.component', '../pipes/filter.pipe', '../pipes/duration.pipe', '../services/user.service', "./base.component", '../components/info-popup.component', 'angular2/src/animate/animation_builder', '../pipes/localization.pipe', "../pipes/boxSize.pipe"], function(exports_1, context_1) {
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
    var core_1, router_1, core_2, locations_service_1, categories_service_1, box_service_1, location_detail_component_1, login_service_1, token_service_1, login_component_1, reservation_component_1, filter_pipe_1, duration_pipe_1, user_service_1, base_component_1, info_popup_component_1, animation_builder_1, localization_pipe_1, boxSize_pipe_1;
    var MapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (locations_service_1_1) {
                locations_service_1 = locations_service_1_1;
            },
            function (categories_service_1_1) {
                categories_service_1 = categories_service_1_1;
            },
            function (box_service_1_1) {
                box_service_1 = box_service_1_1;
            },
            function (location_detail_component_1_1) {
                location_detail_component_1 = location_detail_component_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (reservation_component_1_1) {
                reservation_component_1 = reservation_component_1_1;
            },
            function (filter_pipe_1_1) {
                filter_pipe_1 = filter_pipe_1_1;
            },
            function (duration_pipe_1_1) {
                duration_pipe_1 = duration_pipe_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (info_popup_component_1_1) {
                info_popup_component_1 = info_popup_component_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (localization_pipe_1_1) {
                localization_pipe_1 = localization_pipe_1_1;
            },
            function (boxSize_pipe_1_1) {
                boxSize_pipe_1 = boxSize_pipe_1_1;
            }],
        execute: function() {
            MapComponent = (function (_super) {
                __extends(MapComponent, _super);
                function MapComponent(_locationsService, _boxService, _loginService, _categoriesService, _token, _us, router, ab) {
                    _super.call(this, router, _us, _token, ab);
                    this._locationsService = _locationsService;
                    this._boxService = _boxService;
                    this._loginService = _loginService;
                    this._categoriesService = _categoriesService;
                    this._token = _token;
                    this._us = _us;
                    this.router = router;
                    this.ab = ab;
                    this.locationCurrent = null;
                    this.authModalOpened = false;
                    this.infoPopupOpened = false;
                    this.categoriesFetched = false;
                    this.categoriesStartedFetching = false;
                    this.locationSelected = false;
                    this.avAmount = false;
                    this.categories = [];
                    this.cats = {};
                    this.categorySelected = 'cat-m';
                    this.reservation = null;
                    this.evTabChange = new core_1.EventEmitter();
                    this.fadeOutAnimation = this.ab.css();
                    this.animationClass = '';
                    this.locTemp = null;
                    // Defaults:
                    this.zoom = 13;
                    this.lat = 47.39;
                    this.lng = 8.5;
                    this.markers = [];
                    this.boxes = [];
                    ga('send', 'event', 'navigation', 'find a box');
                    this.fadeOutAnimation
                        .setFromStyles({ opacity: 1, background: 'blue' })
                        .setToStyles({ opacity: 0, background: 'red' });
                    this.evTabChange.subscribe(function (data) {
                    });
                }
                MapComponent.prototype.ngOnInit = function () {
                    !this.markers.length && this.getMarkers();
                };
                /*
                * Get all locations
                *
                */
                MapComponent.prototype.getMarkers = function () {
                    var _this = this;
                    this
                        ._locationsService
                        .getLocations()
                        .then(function (res) {
                        if (res === 'retry')
                            throw new Error('retry');
                        if (res) {
                            return res.json();
                        }
                    })
                        .then(function (json) {
                        if (json) {
                            _this.markers = json.locations;
                        }
                    })
                        .catch(function (e) {
                        setTimeout(function () {
                            _this
                                ._locationsService
                                .getLocations()
                                .then(function (res) {
                                return res.json();
                            })
                                .then(function (res) {
                                _this.markers = res.locations;
                            });
                        }, 1000);
                    });
                };
                MapComponent.prototype.getBoxes = function (id) {
                    if (id === void 0) { id = null; }
                    return this._boxService.getBox(id);
                };
                /* Get categories
                * @param {number} id
                */
                MapComponent.prototype.getCategories = function (id) {
                    if (this.cats[id]) {
                        return Promise.resolve(this.cats[id]);
                    }
                    return this._categoriesService.getCategories(id);
                };
                MapComponent.prototype.clickedMarker = function (m) {
                    var _this = this;
                    this.categories = null;
                    this.locationCurrent = m;
                    this.categorySelected = 'cat-m';
                    this.categoriesStartedFetching = true;
                    this.locationSelected = true;
                    this
                        .getCategories(m.id)
                        .then(function (res) {
                        return Array.isArray(res) ? res : res.json();
                    })
                        .then(function (res) {
                        if (!res.categories) {
                            // if we already cached these categories
                            _this.categories = _this.cats[m.id];
                            _this.selectCategory('cat-m');
                        }
                        else {
                            // set current categories to the response array
                            _this.categories = res.categories;
                            // and cache them
                            _this.cats[m.id] = res.categories;
                            _this.categoriesFetched = true;
                            _this.selectCategory('cat-m');
                            _this.categoriesStartedFetching = false;
                        }
                        ga('send', 'event', 'locations', 'open');
                    });
                };
                MapComponent.prototype.mapClicked = function ($event) {
                    if (this.locationCurrent) {
                        this.locationCurrent = null;
                        return;
                    }
                };
                MapComponent.prototype.receiveToggle = function ($event) {
                    this.locationCurrent = null;
                    this.avAmount = false;
                    this.locationSelected = false;
                };
                MapComponent.prototype.toggleModal = function ($event) {
                    this.authModalOpened = false;
                };
                MapComponent.prototype.receiveClose = function (status) {
                    this.reservation = null;
                };
                MapComponent.prototype.closeReservation = function ($event) {
                    this.reservation = null;
                };
                MapComponent.prototype.openCategory = function (e, cat) {
                    this.reservation = cat;
                };
                MapComponent.prototype.openInfoPopup = function () {
                    this.infoPopupOpened = true;
                    this.locTemp = this.locationCurrent;
                    this.locationCurrent = null;
                };
                MapComponent.prototype.closeInfo = function () {
                    this.infoPopupOpened = false;
                    this.locationCurrent = this.locTemp;
                    this.locTemp = null;
                };
                MapComponent.prototype.selectCategory = function (e) {
                    this.evTabChange.emit('change');
                    this.categorySelected = e;
                    var catMapping = {
                        'cat-s': 'small',
                        'cat-m': 'medium',
                        'cat-l': 'large'
                    };
                    var res = this.categories.filter(function (item) {
                        return item.type === catMapping[e];
                    });
                    this.avAmount = res.length > 0;
                };
                MapComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        pipes: [filter_pipe_1.FilterPipe, duration_pipe_1.DurationPipe, localization_pipe_1.LocalizePipe, boxSize_pipe_1.BoxSizePipe],
                        directives: [core_2.ANGULAR2_GOOGLE_MAPS_DIRECTIVES, location_detail_component_1.LocationDetailComponent, router_1.ROUTER_DIRECTIVES, login_component_1.LoginComponent, reservation_component_1.ReservationComponent, info_popup_component_1.InfoPopupComponent],
                        providers: [locations_service_1.LocationsService, box_service_1.BoxService, login_service_1.Login, token_service_1.Token],
                        templateUrl: 'app/templates/map.tmpl.html'
                    }), 
                    __metadata('design:paramtypes', [locations_service_1.LocationsService, box_service_1.BoxService, login_service_1.Login, categories_service_1.CategoriesService, token_service_1.Token, user_service_1.UserService, router_1.Router, animation_builder_1.AnimationBuilder])
                ], MapComponent);
                return MapComponent;
            }(base_component_1.BaseComponent));
            exports_1("MapComponent", MapComponent);
        }
    }
});
//# sourceMappingURL=map.component.js.map