"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plugins_1 = require("./Plugins");
var Helpers_1 = require("../Helpers");
window['dreamsark'].exposes({
    MediumEditor: require("medium-editor")
});
var MediumEditorTables = require("medium-editor-tables");
var Medium = (function (_super) {
    __extends(Medium, _super);
    function Medium(app, element, options) {
        _super.call(this);
        this.defaults = {
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
        this.instance = new MediumEditor(element, Helpers_1.extend(this.defaults, options));
    }
    return Medium;
}(Plugins_1.Plugins));
exports.Medium = Medium;
/**
 * Auto install itself
 */
window['dreamsark'].install({
    Medium: Medium
});
//# sourceMappingURL=Medium.js.map