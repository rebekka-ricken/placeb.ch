import {
    Component, provide, OnInit, View, EventEmitter
} from 'angular2/core';

import {AnimationBuilder} from 'angular2/src/animate/animation_builder';

import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Scroller} from '../services/common/scroller.service';
import {Token} from '../services/common/token.service';
import {Router} from 'angular2/router';
import {UserService} from '../services/user.service';
import {FilterPipe} from '../pipes/filter.pipe';
import {AmountPipe} from '../pipes/amount.pipe';
import {CustomCurrencyPipe} from '../pipes/customCurrency.pipe';
import {BaseComponent} from "./base.component";
import {BoxSizePipe} from "../pipes/boxSize.pipe";
import {LocalizePipe} from "../pipes/localization.pipe";

declare var ga:any;

@Component({
    directives: [],
    providers: [Scroller],
    pipes: [FilterPipe, AmountPipe, CustomCurrencyPipe,BoxSizePipe,LocalizePipe],
    templateUrl: 'app/templates/boxes.tmpl.html'
})
export class BoxesComponent extends BaseComponent implements OnInit {

    public reservations = [];
    public categorySelected:string;
    public selectedBox:number = 0;
    public boxDetails = {};

    public amount:boolean = false;
    public reservationsFetched:boolean = false;

    public pageLoaded = false;

    constructor(public ab: AnimationBuilder, public router:Router, public userService:UserService, protected tokenHandler:Token) {
        super(router, userService, tokenHandler, ab);
        ga('send', 'event', 'navigation', 'my boxes');
        this.getUser(false)
            .then((user)=> {
                this.userService.getUserReservations(user.id).then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        this.reservationsFetched = true;
                        this.reservations = res.reservations;
                        this.selectCategory('current');
                    });
            });
    }

    selectCategory(e) {
        this.categorySelected = e;
        var res = this.reservations.filter((item) => {
            return item.status === e;
        });
        this.amount = res.length > 0;
    }

    openReservation($event, id) {
        if (this.selectedBox !== 0 && this.selectedBox == id) {
            this.selectedBox = 0;
        } else {
            this.selectedBox = id;
        }
    }
}
