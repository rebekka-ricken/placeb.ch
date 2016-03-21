System.register(['angular2/core', '../i18n/en', '../i18n/de'], function(exports_1, context_1) {
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
    var core_1, en_1, de_1;
    var LocalizePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (en_1_1) {
                en_1 = en_1_1;
            },
            function (de_1_1) {
                de_1 = de_1_1;
            }],
        execute: function() {
            LocalizePipe = (function () {
                function LocalizePipe() {
                    this.locales = {
                        'en': en_1.en,
                        'de': de_1.de
                    };
                }
                LocalizePipe.prototype.transform = function (value, args) {
                    var locale = args[0];
                    return this.locales[locale][value];
                };
                LocalizePipe = __decorate([
                    core_1.Pipe({
                        name: 'loc'
                    }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LocalizePipe);
                return LocalizePipe;
            }());
            exports_1("LocalizePipe", LocalizePipe);
        }
    }
});
//# sourceMappingURL=localization.pipe.js.map