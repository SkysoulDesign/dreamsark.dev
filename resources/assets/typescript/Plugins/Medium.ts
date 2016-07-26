import {Plugins} from "./Plugins";
import {extend} from "../Helpers";

window['dreamsark'].exposes({
    MediumEditor: require("medium-editor")
});

import MediumEditorTables = require("medium-editor-tables")

export class Medium extends Plugins {

    private instance;

    private defaults = {
        disableExtraSpaces: true,
        buttonLabels: 'fontawesome',
        toolbar: {
            buttons: [
                'bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'table'
            ]
        },
        extensions: {
            table: new MediumEditorTables()
        }
    };

    constructor(app, element, options) {

        super();

        this.instance = new MediumEditor(
            element, extend(this.defaults, options)
        );

    }

}

/**
 * Auto install itself
 */
window['dreamsark'].install({
    Medium
});
