import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';
import {Token} from '../services/common/token.service';
import {Login} from '../services/auth/login.service';
import {httpWrap} from '../services/common/http-wrapper.service';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import {Broadcaster} from '../services/broadcaster';
import {UserService} from '../services/user.service';
import {BaseComponent} from "./base.component";
import {CredentialsLogin} from '../interfaces/credentials-login';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {LocalizePipe} from "../pipes/localization.pipe";

declare var alertify:any;

@Component({
    selector: 'login',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: 'app/templates/login.tmpl.html',
    pipes: [LocalizePipe],
    providers: [LocalizePipe]
})
export class LoginComponent extends BaseComponent {
    @Input() opened;
    @Output() toggle = new EventEmitter();
    @Output() auth = new EventEmitter();

    public errors:string = '';
    public state:string = 'login';
    public resetError = '';

    public credentials:CredentialsLogin = {
        username: undefined,
        password: undefined,
        email: undefined
    };

    constructor(protected tokenHandler:Token,
                public loginHandler:Login,
                public router:Router,
                public userService:UserService,
                public ab:AnimationBuilder,
                public http:httpWrap,
                public translator:LocalizePipe) {
        super(router, userService, tokenHandler, ab);
    }

    restorePassword(e) {
        e.preventDefault();
        this.http.delete(`https://api-staging.placeb.ch/api/v1/users/${this.credentials.email}/password`)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res);
                if ((res.code === 404 && res.message === "User not found!") || !(res.code >= 200 && res.code < 300)) {
                    this.resetError = res.message;
                    alertify.notify(this.translator.transform('passwordResetError', [this.locale]), 'error', 5, function () {
                    });
                } else {
                    alertify.notify(this.translator.transform('passwordResetSuccess', [this.locale]), 'success', 5, function () {
                    });
                    this.toggle.emit('');
                }

            })
            .catch((err) => {
                // unexpected end of input when 204
                if (/unexpected end/i.test(err.message)) {
                    alertify.notify(this.translator.transform('passwordResetSuccess', [this.locale]), 'success', 5, function () {
                    });
                    this.toggle.emit('');
                }
            });
    }

    change() {
        this.errors = '';
    }

    changeReset() {
        this.resetError = '';
    }

    login(event, username, password) {
        event.preventDefault();

        if (!this.credentials.username || !this.credentials.password) {
            this.errors = this.translator.transform('enterEmailPass', [this.locale]);
            return;
        }

        this.loginHandler
            .getUserAccessToken(this.credentials.username, this.credentials.password)
            .then((res) => {
                return typeof res === 'string' ? res : res.json();
            })
            .then((res)=> {

                if ('error' in res) {
                    this.errors = this.translator.transform(res.error_description, [this.locale]);
                    this.credentials.password = '';
                    return;
                }
                this.tokenHandler.setToken(
                    res.access_token,
                    res.expires_in,
                    'user',
                    res.refresh_token
                );
                this.userService.getCurrentUser()
                    .then((result)=> {
                        return result.json();
                    }).then((result)=> {
                    this.userService.userData = result.user;
                    this.currentUser = result.user;
                });

                this.toggle.emit('');
            });
    }
}
