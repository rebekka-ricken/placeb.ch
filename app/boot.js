System.register(['angular2/platform/browser', './app', 'angular2/router', 'angular2-google-maps/core', './services/auth/login.service', 'angular2/http', './services/common/token.service', './services/common/http-wrapper.service', './components/login.component', './components/base.component', './services/categories.service', './services/broadcaster', './services/user.service', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, app_1, router_1, core_1, login_service_1, http_1, token_service_1, http_wrapper_service_1, login_component_1, base_component_1, categories_service_1, broadcaster_1, user_service_1, core_2;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (http_wrapper_service_1_1) {
                http_wrapper_service_1 = http_wrapper_service_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (categories_service_1_1) {
                categories_service_1 = categories_service_1_1;
            },
            function (broadcaster_1_1) {
                broadcaster_1 = broadcaster_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            core_2.enableProdMode();
            browser_1.bootstrap(app_1.App, [
                core_1.ANGULAR2_GOOGLE_MAPS_PROVIDERS,
                http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS,
                token_service_1.Token,
                http_wrapper_service_1.httpWrap,
                login_service_1.Login,
                login_component_1.LoginComponent,
                categories_service_1.CategoriesService,
                broadcaster_1.Broadcaster,
                user_service_1.UserService,
                base_component_1.BaseComponent,
                core_2.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
            ]).catch(function (err) { return console.error(err); });
        }
    }
});
//# sourceMappingURL=boot.js.map