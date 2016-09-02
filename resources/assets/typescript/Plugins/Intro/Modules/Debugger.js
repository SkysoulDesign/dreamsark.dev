"use strict";
var Stats = require("stats.js");
/**
 * Debugger Class
 */
var Debugger = (function () {
    function Debugger() {
        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
    }
    Debugger.prototype.boot = function (app) {
    };
    Debugger.prototype.update = function (time, delta) {
        this.stats.update();
    };
    return Debugger;
}());
exports.Debugger = Debugger;
//# sourceMappingURL=Debugger.js.map