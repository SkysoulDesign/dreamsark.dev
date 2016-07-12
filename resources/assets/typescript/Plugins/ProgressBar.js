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
window['dreamsark'].install(ProgressBar);
//# sourceMappingURL=ProgressBar.js.map