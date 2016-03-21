System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NamesList;
    return {
        setters:[],
        execute: function() {
            NamesList = (function () {
                function NamesList() {
                    this.names = ['Dijkstra', 'Knuth', 'Turing', 'Hopper'];
                }
                NamesList.prototype.get = function () {
                    return this.names;
                };
                NamesList.prototype.add = function (value) {
                    this.names.push(value);
                };
                return NamesList;
            }());
            exports_1("NamesList", NamesList);
        }
    }
});
//# sourceMappingURL=NameList.js.map