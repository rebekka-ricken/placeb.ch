import {
    Component, View, OnInit,
} from 'angular2/core';

import {Location, RouteConfig, RouterLink, Router, ROUTER_PROVIDERS} from 'angular2/router';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MapComponent} from './components/map.component';
import {SettingsComponent} from './components/settings.component';
import {BoxesComponent} from './components/boxes.component';
import {LoginComponent} from './components/login.component';
import {SignupComponent} from './components/signup.component';
import {LocationDetailComponent} from './components/location-detail.component';
import {Token} from './services/common/token.service';
import {Login} from './services/auth/login.service';
import {Signup} from './services/auth/signup.service';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Broadcaster} from './services/broadcaster';
import {UserService} from './services/user.service';
import {LoggedInOutlet} from './directives/logged-in-outlet';
import {httpWrap} from './services/common/http-wrapper.service';
import {BaseComponent} from "./components/base.component";
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {ParamsService} from "./services/params.service";
import {LocalizePipe} from "./pipes/localization.pipe";


@Component({
    pipes: [LocalizePipe],
    selector: 'app',
    templateUrl: 'app/templates/main.tmpl.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, LoginComponent, SignupComponent, LoggedInOutlet],
    providers: [Login, Signup, Token, ParamsService]
})
@RouteConfig([
    {path: '/', component: MapComponent, name: 'Home'},
    {path: '/settings', component: SettingsComponent, name: 'Settings'},
    {path: '/boxes', component: BoxesComponent, name: 'Boxes'}
])

export class App extends BaseComponent implements OnInit {

    public authModalOpened:boolean = false;
    public registrationModalOpened:boolean = false;

    constructor(public router:Router,
                //private _loginService:Login,
                private paramsService:ParamsService,
                protected tokenHandler:Token,
                //private _lc:LoginComponent,
                public userService:UserService,
                private http:httpWrap,
                public ab:AnimationBuilder) {
        super(router, userService, tokenHandler, ab);

        paramsService.eventEmmitter.subscribe((parameters)=> {
                this.params = parameters;
            }
        )
    }

    toggleModal($event) {
        this.authModalOpened = false;
    }

    toggleRegistrationModal($event) {
        this.registrationModalOpened = false;
    }
}
