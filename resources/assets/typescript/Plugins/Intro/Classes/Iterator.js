"use strict";
var Iterator = (function () {
    function Iterator() {
        var _this = this;
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i - 0] = arguments[_i];
        }
        this.components = [];
        this.pointer = 0;
        components.forEach(function (component) {
            for (var key in component) {
                _this.components.push({
                    key: key,
                    value: component[key]
                });
            }
        });
        console.log(this.components);
    }
    Iterator.prototype.next = function () {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            };
        }
        else {
            return {
                done: true
            };
        }
    };
    Iterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return Iterator;
}());
exports.Iterator = Iterator;
//# sourceMappingURL=Iterator.js.map