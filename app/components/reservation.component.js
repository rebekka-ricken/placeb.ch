System.register(['angular2/core', 'angular2/router', '../services/common/token.service', '../services/user.service', '../pipes/customCurrency.pipe', "./base.component", "angular2/common", "../validators/extendedValidators", 'angular2/src/animate/animation_builder', "../pipes/localization.pipe"], function(exports_1, context_1) {
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
    var core_1, router_1, token_service_1, user_service_1, customCurrency_pipe_1, base_component_1, common_1, extendedValidators_1, animation_builder_1, core_2, localization_pipe_1;
    var ReservationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
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
            function (customCurrency_pipe_1_1) {
                customCurrency_pipe_1 = customCurrency_pipe_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (extendedValidators_1_1) {
                extendedValidators_1 = extendedValidators_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (localization_pipe_1_1) {
                localization_pipe_1 = localization_pipe_1_1;
            }],
        execute: function() {
            ReservationComponent = (function (_super) {
                __extends(ReservationComponent, _super);
                function ReservationComponent(router, userService, tokenHandler, builder, ab, translator, location) {
                    _super.call(this, router, userService, tokenHandler, ab, location);
                    this.router = router;
                    this.userService = userService;
                    this.tokenHandler = tokenHandler;
                    this.builder = builder;
                    this.ab = ab;
                    this.translator = translator;
                    this.location = location;
                    this.close = new core_1.EventEmitter();
                    this.insuranceCost = 0;
                    this.paymentData = {
                        number: undefined,
                        cvv: undefined,
                        month: undefined,
                        year: undefined
                    };
                    this.durationCost = 0;
                    this.includeInsurance = 1;
                    this.selectedDuration = 'default';
                    this.reservationTotal = 0;
                    this.isSending = false;
                    this.validationErrors = [];
                    this.errors = '';
                    this.isReservationOrderValid = false;
                    this.inputType = 'date';
                    if (/android/i.test(navigator.userAgent)) {
                        this.inputType = 'text';
                    }
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd.toString();
                    }
                    if (mm < 10) {
                        mm = '0' + mm.toString();
                    }
                    today = yyyy + '-' + mm + '-' + dd;
                    this.startDateControl = new common_1.Control(today, extendedValidators_1.ExtendedValidators.required);
                    this.locationControl = new common_1.Control();
                    this.durationControl = new common_1.Control();
                    this.boxValueControl = new common_1.Control('', extendedValidators_1.ExtendedValidators.required);
                    this.includeInsuranceControl = new common_1.Control();
                    this.cardControl = new common_1.Control();
                    this.cardNumberControl = new common_1.Control('', extendedValidators_1.ExtendedValidators.required);
                    this.cardCVVControl = new common_1.Control('', extendedValidators_1.ExtendedValidators.required);
                    this.cardMonthControl = new common_1.Control('', extendedValidators_1.ExtendedValidators.required);
                    this.cardYearControl = new common_1.Control('', extendedValidators_1.ExtendedValidators.required);
                    this.form = builder.group({
                        startDate: this.startDateControl,
                        location: this.locationControl,
                        duration: this.durationControl,
                        boxValue: this.boxValueControl,
                        includeInsurance: this.includeInsuranceControl,
                        card: this.cardControl,
                        cardNumber: this.cardNumberControl,
                        cardCVV: this.cardCVVControl,
                        cardMonth: this.cardMonthControl,
                        cardYear: this.cardMonthControl
                    });
                    this.zone = new core_2.NgZone({ enableLongStackTrace: false });
                }
                ReservationComponent.prototype.setDuration = function (val) {
                    this.selectedDuration = val;
                    this.calculateOrder();
                };
                /**
                 * Calculate reservation cost
                 *
                 * @param val
                 */
                ReservationComponent.prototype.calculateOrder = function () {
                    var _this = this;
                    if (this.selectedDuration != 'default') {
                        var duration = this.reservation.durations.filter(function (item) {
                            return item.id == _this.selectedDuration;
                        });
                        this.durationCost = duration[0].price;
                    }
                    if (this.form.value.boxValue) {
                        this.insuranceCost = Math.ceil(parseFloat(this.form.value.boxValue) / 10000) * 6;
                    }
                    if (this.includeInsurance) {
                        this.reservationTotal = this.durationCost + this.insuranceCost;
                    }
                    else {
                        this.reservationTotal = this.durationCost;
                    }
                };
                /**
                 * Create new Stripe token
                 *
                 * @param event
                 */
                ReservationComponent.prototype.makeReservation = function (event) {
                    event.preventDefault();
                    this.isSending = true;
                    Stripe.card.createToken(event.target, this.stripeCallback.bind(this));
                };
                /*
                 * Create new reservation
                 *
                 * @param status stripe response code
                 * @param res stripe response
                 */
                ReservationComponent.prototype.stripeCallback = function (status, res) {
                    var _this = this;
                    if (res.error) {
                        this.isSending = false;
                        this.zone.run(function () {
                            _this.errors = res.error.message;
                            alertify.notify(_this.translator.transform('reservationCreatingError', [_this.locale]), 'error', 5, function () {
                            });
                        });
                    }
                    else {
                        this.zone.run(function () {
                            delete _this.form.value.cardNumber;
                            delete _this.form.value.cardCVV;
                            delete _this.form.value.cardMonth;
                            delete _this.form.value.cardYear;
                            _this.form.value.card = res.id;
                            _this.form.value.location = _this.location.id;
                            _this.form.value.duration = _this.selectedDuration;
                            _this.form.value.includeInsurance = !!_this.includeInsurance;
                            _this.userService
                                .createUserReservations(_this.currentUser.id, _this.form.value)
                                .then(function (res) {
                                if (res.status >= 200 && res.status < 300) {
                                    _this.isSending = false;
                                    alertify.notify(_this.translator.transform('reservationCreated', [_this.locale]), 'success', 5, function () {
                                    });
                                    ga('send', 'event', 'boxes', 'book');
                                    _this.close.emit('created');
                                    _this.router.navigateByUrl('/boxes');
                                }
                                else {
                                    _this.isSending = false;
                                    alertify.notify(_this.translator.transform('reservationCreatingError', [_this.locale]), 'error', 5, function () {
                                    });
                                }
                            })
                                .catch(function (err) {
                                _this.isSending = false;
                                alertify.notify(_this.translator.transform('reservationCreatingError', [_this.locale]), 'error', 5, function () {
                                });
                            });
                        });
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ReservationComponent.prototype, "reservation", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ReservationComponent.prototype, "location", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ReservationComponent.prototype, "close", void 0);
                ReservationComponent = __decorate([
                    core_1.Component({
                        selector: 'reservation',
                        pipes: [customCurrency_pipe_1.CustomCurrencyPipe, localization_pipe_1.LocalizePipe],
                        templateUrl: 'app/templates/reservation.tmpl.html',
                        providers: [localization_pipe_1.LocalizePipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService, token_service_1.Token, common_1.FormBuilder, animation_builder_1.AnimationBuilder, localization_pipe_1.LocalizePipe, Location])
                ], ReservationComponent);
                return ReservationComponent;
            }(base_component_1.BaseComponent));
            exports_1("ReservationComponent", ReservationComponent);
        }
    }
});
//# sourceMappingURL=reservation.component.js.map