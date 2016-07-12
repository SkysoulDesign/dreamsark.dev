"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plugins_1 = require("./Plugins");
window['dreamsark'].exposes({
    Chart: require("easy-pie-chart")
});
var Chart = (function (_super) {
    __extends(Chart, _super);
    function Chart() {
        _super.call(this);
        console.log('Hello world');
    }
    return Chart;
}(Plugins_1.Plugins));
exports.Chart = Chart;
/**
 * Auto install itself
 */
window['dreamsark'].install(Chart);
//# sourceMappingURL=Chart.js.map