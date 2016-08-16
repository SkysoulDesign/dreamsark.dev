import {Plugins} from "./Plugins";

window['dreamsark'].exposes({
    DateTimePicker: require("flatpickr")
});

export class DateTime extends Plugins {

    constructor(app, element, options = []) {

        super();
        new DateTimePicker(element, {
            allowInput: true,
            enableTime: true,
            minuteIncrement: 1,
            defaultDate: new Date()
        });

    }

}

/**
 * Auto install itself
 */
window['dreamsark'].install({
    DateTime
});
