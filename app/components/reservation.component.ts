import {
    Component, provide, OnInit, View, EventEmitter, Input, Output
} from 'angular2/core';
//import * as moment from 'moment';
import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, ROUTER_DIRECTIVES,Router,} from 'angular2/router';
import {Login} from '../services/auth/login.service';
import {Token} from '../services/common/token.service';
import {httpWrap} from '../services/common/http-wrapper.service';
import {UserService} from '../services/user.service';
import {CustomCurrencyPipe} from '../pipes/customCurrency.pipe';
import {BaseComponent} from "./base.component";
import {ParamsService} from '../services/params.service';
import {Reservation} from "../interfaces/reservation";
import {ControlGroup,Control,Validators, FormBuilder} from "angular2/common";
import {ExtendedValidators} from "../validators/extendedValidators";
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {NgZone} from 'angular2/core';
import {LocalizePipe} from "../pipes/localization.pipe";


declare var Stripe:any;
declare var alertify:any;
declare var ga:any;

@Component({
    selector: 'reservation',
    pipes: [CustomCurrencyPipe, LocalizePipe],
    templateUrl: 'app/templates/reservation.tmpl.html',
    providers: [LocalizePipe]
})
export class ReservationComponent extends BaseComponent implements OnInit {

    @Input() reservation;
    @Input() location;
    @Output() close = new EventEmitter();
    public zone:NgZone;


    public startDateControl:Control;
    public locationControl:Control;
    public durationControl:Control;
    public boxValueControl:Control;
    public includeInsuranceControl:Control;
    public cardControl:Control;

    public cardNumberControl:Control;
    public cardCVVControl:Control;
    public cardMonthControl:Control;
    public cardYearControl:Control;

    form:ControlGroup;

    public insuranceCost = 0;

    public paymentData = {
        number: undefined,
        cvv: undefined,
        month: undefined,
        year: undefined
    };

    public durationCost = 0;
    public includeInsurance = 1;
    public selectedDuration = 'default';
    public reservationTotal = 0;
    public isSending = false;
    public validationErrors = [];
    public errors = '';
    public isReservationOrderValid:boolean = false;

    public inputType = 'date';

    constructor(public router:Router,
                public userService:UserService,
                public tokenHandler:Token,
                private builder:FormBuilder,
                public ab:AnimationBuilder,
                public translator:LocalizePipe,
                public location : Location) {
        super(router, userService, tokenHandler, ab,location);

        if (/android/i.test(navigator.userAgent)) {
            this.inputType = 'text';
        }

        var today:any = new Date();
        var dd:any = today.getDate();
        var mm:any = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd.toString();
        }
        if (mm < 10) {
            mm = '0' + mm.toString();
        }

        today = yyyy + '-' + mm + '-' + dd;

        this.startDateControl = new Control(today, ExtendedValidators.required);
        this.locationControl = new Control();
        this.durationControl = new Control();
        this.boxValueControl = new Control('', ExtendedValidators.required);
        this.includeInsuranceControl = new Control();
        this.cardControl = new Control();
        this.cardNumberControl = new Control('', ExtendedValidators.required);
        this.cardCVVControl = new Control('', ExtendedValidators.required);
        this.cardMonthControl = new Control('', ExtendedValidators.required);
        this.cardYearControl = new Control('', ExtendedValidators.required);

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

        this.zone = new NgZone({enableLongStackTrace: false});
    }

    setDuration(val):void {
        this.selectedDuration = val;
        this.calculateOrder();
    }

    /**
     * Calculate reservation cost
     *
     * @param val
     */
    calculateOrder():void {

        if (this.selectedDuration != 'default') {
            var duration = this.reservation.durations.filter((item)=> {
                return item.id == this.selectedDuration;
            });

            this.durationCost = duration[0].price;
        }

        if (this.form.value.boxValue) {
            this.insuranceCost = Math.ceil(parseFloat(this.form.value.boxValue) / 10000) * 6;
        }
        if (this.includeInsurance) {
            this.reservationTotal = this.durationCost + this.insuranceCost;
        } else {
            this.reservationTotal = this.durationCost;
        }

    }

    /**
     * Create new Stripe token
     *
     * @param event
     */
    makeReservation(event) {
        event.preventDefault();
        this.isSending = true;
        Stripe.card.createToken(event.target, this.stripeCallback.bind(this));
    }

    /*
     * Create new reservation
     *
     * @param status stripe response code
     * @param res stripe response
     */

    stripeCallback(status, res) {
        if (res.error) {
            this.isSending = false;
            this.zone.run(() => {
                this.errors = res.error.message;
                alertify.notify(this.translator.transform('reservationCreatingError', [this.locale]), 'error', 5, function () {
                });
            });
        } else {
            this.zone.run(() => {

                delete this.form.value.cardNumber;
                delete this.form.value.cardCVV;
                delete this.form.value.cardMonth;
                delete this.form.value.cardYear;

                this.form.value.card = res.id;
                this.form.value.location = this.location.id;
                this.form.value.duration = this.selectedDuration;
                this.form.value.includeInsurance = !!this.includeInsurance;

                this.userService
                    .createUserReservations(this.currentUser.id, this.form.value)
                    .then((res) => {
                        if (res.status >= 200 && res.status < 300) {
                            this.isSending = false;
                            alertify.notify(this.translator.transform('reservationCreated', [this.locale]), 'success', 5, function () {
                            });
                            ga('send', 'event', 'boxes', 'book');
                            this.close.emit('created');
                            this.router.navigateByUrl('/boxes');
                        } else {
                            this.isSending = false;
                            alertify.notify(this.translator.transform('reservationCreatingError', [this.locale]), 'error', 5, function () {
                            });
                        }
                    })
                    .catch((err) => {
                        this.isSending = false;
                        alertify.notify(this.translator.transform('reservationCreatingError', [this.locale]), 'error', 5, function () {
                        });
                    });
            });
        }
    }
}
