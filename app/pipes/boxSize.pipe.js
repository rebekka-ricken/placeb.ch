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
    var BoxSizePipe;
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
            BoxSizePipe = (function () {
                function BoxSizePipe() {
                    /**
                     *
                     * @type Array
                     */
                    this.locales = {
                        'en': en_1.en,
                        'de': de_1.de
                    };
                    /**
                     * @type {number}
                     */
                    this.width = 0;
                    /**
                     * @type {number}
                     */
                    this.height = 0;
                    /**
                     * @type {number}
                     */
                    this.depth = 0;
                }
                /**
                 * @param value any
                 * @param args array
                 * @returns {string}
                 */
                BoxSizePipe.prototype.transform = function (value, args) {
                    var locale = args[0] ? args[0] : 'en';
                    this.width = value.width || value.avgWidth;
                    this.height = value.height || value.avgHeight;
                    this.depth = value.depth || value.avgDepth;
                    var volume = this.calculateVolume();
                    var area = this.calculateArea();
                    var size = this.getCm(this.width) + ' cm x ' + this.getCm(this.depth) + ' cm, ' + this.locales[locale]['height'] + ': ' + this.getCm(this.height) + ' cm; ';
                    return size + area + ' m2 / ' + volume + ' m3';
                };
                BoxSizePipe.prototype.calculateVolume = function () {
                    return (this.getMeters(this.depth) * this.getMeters(this.width) * this.getMeters(this.height)).toFixed(2);
                };
                BoxSizePipe.prototype.calculateArea = function () {
                    return (this.getMeters(this.depth) * this.getMeters(this.width)).toFixed(2);
                };
                BoxSizePipe.prototype.getCm = function (value) {
                    return Math.floor(value / 10);
                };
                BoxSizePipe.prototype.getMeters = function (value) {
                    return this.getCm(value) / 100;
                };
                BoxSizePipe = __decorate([
                    core_1.Pipe({
                        name: 'boxSize',
                    }), 
                    __metadata('design:paramtypes', [])
                ], BoxSizePipe);
                return BoxSizePipe;
            }());
            exports_1("BoxSizePipe", BoxSizePipe);
        }
    }
});
//# sourceMappingURL=boxSize.pipe.js.map