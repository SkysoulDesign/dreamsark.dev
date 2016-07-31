"use strict";
var AbstractComposition = (function () {
    function AbstractComposition() {
    }
    AbstractComposition.prototype.boot = function (app) {
    };
    AbstractComposition.prototype.objects = function () {
        return false;
    };
    AbstractComposition.prototype.setup = function (app) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
    };
    ;
    AbstractComposition.prototype.update = function (scene, camera, characters, time, delta) {
    };
    return AbstractComposition;
}());
exports.AbstractComposition = AbstractComposition;
//# sourceMappingURL=AbstractComposition.js.map