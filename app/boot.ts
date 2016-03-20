import {bootstrap}    from 'angular2/platform/browser';
import {App} from './app';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {Login} from './services/auth/login.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Token} from './services/common/token.service';
import {httpWrap} from './services/common/http-wrapper.service';
import {LoginComponent} from './components/login.component';
import {BaseComponent} from './components/base.component';
import {CategoriesService} from './services/categories.service';
import {Broadcaster} from './services/broadcaster';
import {UserService} from './services/user.service';
import {enableProdMode} from 'angular2/core';

enableProdMode();

bootstrap(
    App,
    [
        ANGULAR2_GOOGLE_MAPS_PROVIDERS,
        HTTP_PROVIDERS, ROUTER_PROVIDERS,
        Token,
        httpWrap,
        Login,
        LoginComponent,
        CategoriesService,
        Broadcaster,
        UserService,
        BaseComponent
    ]
).catch(err => console.error(err));
