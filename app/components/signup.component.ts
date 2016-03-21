import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {Router,Location} from 'angular2/router';
import {Token} from '../services/common/token.service';
import {Signup} from '../services/auth/signup.service';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, ControlGroup, Control } from 'angular2/common';
import {Broadcaster} from '../services/broadcaster';
import {UserService} from '../services/user.service';
import {BaseComponent} from "./base.component";
import {CredentialsSignup} from "../interfaces/credentials-signup";
import {OnInit} from "angular2/core";
import {ExtendedValidators} from "../validators/extendedValidators";
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {isatty} from "tty";
import {isArray} from "rxjs/util/isArray";
import {ParamsService} from "../services/params.service";
import {LocalizePipe} from "../pipes/localization.pipe";
import {TermsService} from "../services/terms.service";
import {Login} from '../services/auth/login.service';


@Component({
    selector: 'signup',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: 'app/templates/signup.tmpl.html',
    pipes: [LocalizePipe],
    providers: [TermsService]
})
export class SignupComponent extends BaseComponent implements OnInit {
    @Input() opened;

    @Output() toggle = new EventEmitter();
    @Output() auth = new EventEmitter();

    public errors = {amount: 0, messages: undefined};
    public isAgreed = undefined;
    public terms = undefined;
    public validationInfo = '';

    private termsLinks = {
        "de": "https://www.placeb.ch/tc-de.pdf",
        "en": "https://www.placeb.ch/tc-en.pdf "
    };

    signUpForm:ControlGroup;
    email:Control = new Control("", Validators.compose([Validators.required, ExtendedValidators.email]));
    firstName:Control = new Control("", Validators.required);
    lastName:Control = new Control("", Validators.required);
    plainPassword:Control = new Control("", Validators.required);
    passwordConfirmation:Control = new Control("", Validators.required);

    constructor(protected tokenHandler:Token,
                public _signup:Signup,
                public router:Router,
                private paramsService:ParamsService,
                public broadcaster:Broadcaster,
                public termsServ:TermsService,
                public userService:UserService,
                public fb:FormBuilder,
                public ab:AnimationBuilder,
                public loginHandler:Login,
                public location:Location) {
        super(router, userService, tokenHandler, ab,location);

        this.terms = this.termsLinks[this.locale];

        this.signUpForm = fb.group({
            "email": this.email,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "plainPassword": this.plainPassword,
            "passwordConfirmation": this.passwordConfirmation
        }, {
            validator: ExtendedValidators.equals('plainPassword', 'passwordConfirmation')
        });

    }

    onSubmit(pass:string, passConfirmation:string) {

        delete this.signUpForm.value.passwordConfirmation;

        this._signup.createUser(this.signUpForm.value)
            .then((res) => {
                if (res.statusText.toLowerCase() === 'created' && (res.status >= 200 && res.status < 300)) {
                    return res.status;
                } else if (res.status === 400) {
                    return res.json();
                }
            })
            .then((res) => {
                if (typeof res === 'number' && (res >= 200 && res < 300 )) {
                    this.toggle.emit('');
                    this.loginHandler
                        .getUserAccessToken(this.signUpForm.value.email, this.signUpForm.value.plainPassword)
                        .then((res) => {
                            return typeof res === 'string' ? res : res.json();
                        })
                        .then((res)=> {
                            if ('error' in res) {
                                return;
                            }
                            this.tokenHandler.setToken(
                                res.access_token,
                                res.expires_in,
                                'user',
                                res.refresh_token
                            );
                            this
                                .userService
                                .getCurrentUser()
                                .then((result)=> {
                                    return result.json();
                                })
                                .then((result)=> {
                                    this.userService.userData = result.user;
                                    this.currentUser = result.user;
                                });
                        });
                } else if (res.code === 400 && res.message === 'Validation Failed') {
                    for (var p in res.errors.children) {
                        if ('errors' in res.errors.children[p]) {
                            for (var i = 0; i < res.errors.children[p].errors.length; i++) {
                                this.errors[p] = res.errors.children[p].errors[i];
                                this.errors.amount++;
                            }
                        }
                    }
                    if (this.errors.amount) {
                        var temp = [];

                        for (var p in this.errors) {
                            p !== 'amount' && p !== 'messages' && temp.push(this.errors[p]);
                        }

                        this.errors.messages = Array.isArray(temp.length) ? temp.join('. ') : temp;
                        this.validationInfo = this.errors.messages;
                    }
                }
            })
    }

}
