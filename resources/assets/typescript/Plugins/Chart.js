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
    }
    return Chart;
}(Plugins_1.Plugins));
exports.Chart = Chart;
/**
 * Auto install itself
 */
window['dreamsark'].install({
    Chart: Chart
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3QkFBc0IsV0FBVyxDQUFDLENBQUE7QUFFbEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN4QixLQUFLLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0NBQ25DLENBQUMsQ0FBQztBQUVIO0lBQTJCLHlCQUFPO0lBRTlCO1FBQ0ksaUJBQU8sQ0FBQztJQUNaLENBQUM7SUFFTCxZQUFDO0FBQUQsQ0FBQyxBQU5ELENBQTJCLGlCQUFPLEdBTWpDO0FBTlksYUFBSyxRQU1qQixDQUFBO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3hCLE9BQUEsS0FBSztDQUNSLENBQUMsQ0FBQyJ9