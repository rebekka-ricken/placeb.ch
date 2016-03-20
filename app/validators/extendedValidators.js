System.register(["angular2/common"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var common_1;
    var ExtendedValidators;
    return {
        setters:[
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            ExtendedValidators = (function (_super) {
                __extends(ExtendedValidators, _super);
                function ExtendedValidators() {
                    _super.apply(this, arguments);
                }
                ExtendedValidators.duration = function (control) {
                    if (control.value != "" && control.value == "default") {
                        return { "defaultValue": true };
                    }
                    return null;
                };
                ExtendedValidators.email = function (control) {
                    var emailRE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                    if (!emailRE.test(control.value)) {
                        return { "emailInvalid": true };
                    }
                    return null;
                };
                ExtendedValidators.equals = function (src, val) {
                    return function (group) {
                        var srcControl = group.controls[src];
                        var valControl = group.controls[val];
                        if (srcControl.value !== valControl.value) {
                            return {
                                mismatched: true
                            };
                        }
                    };
                };
                return ExtendedValidators;
            }(common_1.Validators));
            exports_1("ExtendedValidators", ExtendedValidators);
        }
    }
});
//# sourceMappingURL=extendedValidators.js.map