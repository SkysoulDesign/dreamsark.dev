"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: Editor
 */
var Editor = (function (_super) {
    __extends(Editor, _super);
    function Editor() {
        _super.apply(this, arguments);
    }
    Editor.prototype.models = function () {
        return {
            character: '/models/Editor.json',
        };
    };
    return Editor;
}(BaseCharacter_1.BaseCharacter));
exports.Editor = Editor;
//# sourceMappingURL=Editor.js.map