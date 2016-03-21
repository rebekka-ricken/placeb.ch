System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Scroller;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Scroller = (function () {
                function Scroller() {
                }
                Scroller.prototype.init = function (sel, callbackHide, callbackShow) {
                    var el = document.querySelectorAll(sel)[0];
                    var elPos = el.getBoundingClientRect();
                    var elTopOffset = elPos.top;
                    var elHeight = el.clientHeight;
                    var elFullHeight = elHeight + elTopOffset;
                    window.onscroll = (function (e) {
                        if (window.scrollY >= elFullHeight) {
                            callbackHide(window.scrollY);
                        }
                        if (window.scrollY < elFullHeight) {
                            callbackShow(window.scrollY);
                        }
                    });
                };
                Scroller.prototype.dispose = function () {
                    window.onscroll = null;
                };
                Scroller = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Scroller);
                return Scroller;
            }());
            exports_1("Scroller", Scroller);
        }
    }
});
//# sourceMappingURL=scroller.service.js.map