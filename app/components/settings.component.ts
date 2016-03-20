import {
    Component, provide, OnInit, View, EventEmitter
} from 'angular2/core';

import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {UserService} from '../services/user.service';
import {Token} from '../services/common/token.service';
import {Router} from 'angular2/router';
import {BaseComponent} from "./base.component";
import {User} from '../interfaces/user';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {LocalizePipe} from "../pipes/localization.pipe";

declare var alertify:any;
declare var ga:any;

@Component({
    directives: [],
    providers: [LocalizePipe],
    templateUrl: 'app/templates/settings.tmpl.html',
    pipes: [LocalizePipe],
})
export class SettingsComponent extends BaseComponent implements OnInit {


    public dataToUpdate:User = {};

    constructor(public userService:UserService, protected tokenHandler:Token, public router:Router, public ab:AnimationBuilder, public translator:LocalizePipe) {
        super(router, userService, tokenHandler, ab);
        ga('send', 'event', 'navigation', 'account');
        this.getUser(true).then((user)=> {
            this.currentUser = Object.assign({}, user);
            this.dataToUpdate = Object.assign({}, user);
        });
    }

    /**
     * Update user settings
     */
    updateSettings() {

        delete this.dataToUpdate.id;
        delete this.dataToUpdate.honorificTitle;

        this.userService.updateCurrentUser(this.currentUser.id, this.dataToUpdate)
            .then(()=> {
                alertify.notify(this.translator.transform('userdataSaved', [this.locale]), 'success', 5, function () {
                });
            }).catch(()=> {
            alertify.notify(this.translator.transform('userdataNotSaved', [this.locale]), 'error', 5, function () {
            });
        });
    }

    logOut() {
        this.tokenHandler.removeToken();
        this.currentUser = null;
        this.router.navigateByUrl('/');
    }
}
