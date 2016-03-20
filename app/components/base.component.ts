import {
    Component, View, OnInit, NgZone, AfterViewInit
} from 'angular2/core';

import {Location, RouteConfig, RouterLink, Router, ROUTER_PROVIDERS} from 'angular2/router';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Token} from '../services/common/token.service';
import {Login} from '../services/auth/login.service';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Broadcaster} from '../services/broadcaster';
import {UserService} from '../services/user.service';
import {LoggedInOutlet} from '../directives/logged-in-outlet';
import {httpWrap} from '../services/common/http-wrapper.service';
import {User} from '../interfaces/user';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {LocalizePipe} from "../pipes/localization.pipe";

@Component({
    pipes: [LocalizePipe],
    providers: [Router, UserService] // Parent's instance

})

export class BaseComponent implements OnInit, AfterViewInit {

    public currentUser:User;
    public pageStatus = false;
    public locale:string;
    public defaultLocale:string = 'en';
    public availableLocales = ['de', 'en'];
    private secureRoutes = ['/boxes', '/settings'];
    public params = {};

    constructor(public router:Router,
                public userService:UserService,
                protected tokenHandler:Token,
                public ab:AnimationBuilder) {

        if (this.availableLocales.indexOf(navigator.language.slice(0, 2)) > -1) {
            this.locale = navigator.language.slice(0, 2);

        } else {
            this.locale = this.defaultLocale;
        }
    }

    ngOnInit() {
        if (this.tokenHandler.getUserType() === 'guest'
            && this.secureRoutes.indexOf(location.pathname) !== -1) {
            window.location.href = '/';
        }

        this.getUser(false).then((user)=> {
            this.currentUser = user;
        });
    }

    ngAfterViewInit() {
        if (document.querySelectorAll('.page').length) {
            let animation = this.ab.css();
            animation.setDuration(400);
            animation
                .setFromStyles({opacity: 0})
                .setToStyles({opacity: 1});
            animation.start((document.querySelectorAll('.page')[0] as HTMLElement));
        }
    }


    /**
     * Checks if user is logged in
     *
     * @returns {boolean}
     */
    public isLoggedIn() {
        return !!(this.tokenHandler.getToken() && this.tokenHandler.isUser());
    }

    /**
     * Get user promise
     *
     * @returns {any}
     */
    public getUser(refresh:boolean):any {
        if (refresh || (this.tokenHandler.isUser() && !this.userService.userData)) {
            return this.userService.getCurrentUser()
                .then((result)=> {
                    return result.json();
                }).then((data)=> {
                    this.userService.userData = data.user;
                    return Promise.resolve(data.user);
                });
        } else {
            return Promise.resolve(this.userService.userData);
        }
    }

    /**
     * Check of route is current
     *
     * @param route string
     * @returns {boolean}
     */
    public isCurrentRoute(route:string) {
        return route === window.location.pathname;
    }
}
