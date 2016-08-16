import {Plugins} from "./Plugins";

window['dreamsark'].exposes({
    DateTimePicker: require("flatpickr")
});

export class DateTime extends Plugins {

    constructor(app, element, options = []) {

        super();

        this.localize()

        new DateTimePicker(element, {
            allowInput: true,
            enableTime: true,
            minuteIncrement: 1,
            defaultDate: new Date()
        });

    }

    private localize() {

        DateTimePicker.init.prototype.l10n.weekdays = {
            shorthand: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            longhand: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        };

        DateTimePicker.init.prototype.l10n.months = {
            shorthand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            longhand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        };

    }
}

/**
 * Auto install itself
 */
window['dreamsark'].install({
    DateTime
});
