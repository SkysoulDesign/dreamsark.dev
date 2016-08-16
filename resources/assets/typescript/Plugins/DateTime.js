"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plugins_1 = require("./Plugins");
window['dreamsark'].exposes({
    DateTimePicker: require("flatpickr")
});
var DateTime = (function (_super) {
    __extends(DateTime, _super);
    function DateTime(app, element, options) {
        if (options === void 0) { options = []; }
        _super.call(this);
        new DateTimePicker(element, {
            allowInput: true,
            enableTime: true,
            minuteIncrement: 1,
            defaultDate: new Date()
        });
    }
    return DateTime;
}(Plugins_1.Plugins));
exports.DateTime = DateTime;
/**
 * Auto install itself
 */
window['dreamsark'].install({
    DateTime: DateTime
});
//# sourceMappingURL=DateTime.js.map