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
        this.localize();
        new DateTimePicker(element, {
            allowInput: true,
            enableTime: true,
            minuteIncrement: 1,
            defaultDate: new Date()
        });
    }
    DateTime.prototype.localize = function () {
        DateTimePicker.init.prototype.l10n.weekdays = {
            shorthand: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            longhand: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        };
        DateTimePicker.init.prototype.l10n.months = {
            shorthand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            longhand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        };
    };
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