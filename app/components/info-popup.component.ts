import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {LocalizePipe} from "../pipes/localization.pipe";
import {BaseComponent} from "./base.component";
import {Login} from "../services/auth/login.service";
import {Router,Location} from "angular2/router";
import {UserService} from "../services/user.service";
import {AnimationBuilder} from "angular2/src/animate/animation_builder";
import {Token} from "../services/common/token.service";

@Component({
    selector: 'info-popup',
    templateUrl: 'app/templates/info-popup.tmpl.html',
    pipes: [LocalizePipe],
    providers: [LocalizePipe]
})
export class InfoPopupComponent extends BaseComponent {
    @Input() open;
    @Output() toggle = new EventEmitter();

    constructor(protected tokenHandler:Token,
                public router:Router,
                public userService:UserService,
                public ab:AnimationBuilder,
                public translator:LocalizePipe,
                public location:Location) {
        super(router, userService, tokenHandler, ab, location);
    }
}