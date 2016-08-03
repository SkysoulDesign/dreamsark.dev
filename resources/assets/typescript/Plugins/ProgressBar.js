"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plugins_1 = require("./Plugins");
window['dreamsark'].exposes({
    ProgressBar: require("progressbar.js")
});
var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        _super.call(this);
    }
    return ProgressBar;
}(Plugins_1.Plugins));
exports.ProgressBar = ProgressBar;
/**
 * Auto install itself
 */
window['dreamsark'].install({
    ProgressBar: ProgressBar
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NCYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9ncmVzc0Jhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3QkFBc0IsV0FBVyxDQUFDLENBQUE7QUFFbEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN4QixXQUFXLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0NBQ3pDLENBQUMsQ0FBQztBQUVIO0lBQWlDLCtCQUFPO0lBRXBDO1FBQ0ksaUJBQU8sQ0FBQztJQUNaLENBQUM7SUFFTCxrQkFBQztBQUFELENBQUMsQUFORCxDQUFpQyxpQkFBTyxHQU12QztBQU5ZLG1CQUFXLGNBTXZCLENBQUE7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDeEIsYUFBQSxXQUFXO0NBQ2QsQ0FBQyxDQUFDIn0=