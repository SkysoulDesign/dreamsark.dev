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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhCQUE0QixpQkFBaUIsQ0FBQyxDQUFBO0FBRTlDOztHQUVHO0FBQ0g7SUFBNEIsMEJBQWE7SUFBekM7UUFBNEIsOEJBQWE7SUFRekMsQ0FBQztJQU5HLHVCQUFNLEdBQU47UUFDSSxNQUFNLENBQUM7WUFDSCxTQUFTLEVBQUUscUJBQXFCO1NBQ25DLENBQUE7SUFDTCxDQUFDO0lBRUwsYUFBQztBQUFELENBQUMsQUFSRCxDQUE0Qiw2QkFBYSxHQVF4QztBQVJZLGNBQU0sU0FRbEIsQ0FBQSJ9