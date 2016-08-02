"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: Animation
 */
var Animation = (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        _super.apply(this, arguments);
    }
    Animation.prototype.models = function () {
        return {
            character: '/models/Animation.json',
        };
    };
    return Animation;
}(BaseCharacter_1.BaseCharacter));
exports.Animation = Animation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhCQUE0QixpQkFBaUIsQ0FBQyxDQUFBO0FBRTlDOztHQUVHO0FBQ0g7SUFBK0IsNkJBQWE7SUFBNUM7UUFBK0IsOEJBQWE7SUFRNUMsQ0FBQztJQU5HLDBCQUFNLEdBQU47UUFDSSxNQUFNLENBQUM7WUFDSCxTQUFTLEVBQUUsd0JBQXdCO1NBQ3RDLENBQUE7SUFDTCxDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBK0IsNkJBQWEsR0FRM0M7QUFSWSxpQkFBUyxZQVFyQixDQUFBIn0=