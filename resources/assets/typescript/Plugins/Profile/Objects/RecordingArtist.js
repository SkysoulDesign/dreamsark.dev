"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: RecordingArtist
 */
var RecordingArtist = (function (_super) {
    __extends(RecordingArtist, _super);
    function RecordingArtist() {
        _super.apply(this, arguments);
    }
    RecordingArtist.prototype.models = function () {
        return {
            character: '/models/RecordingArtist.json',
        };
    };
    return RecordingArtist;
}(BaseCharacter_1.BaseCharacter));
exports.RecordingArtist = RecordingArtist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjb3JkaW5nQXJ0aXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVjb3JkaW5nQXJ0aXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhCQUE0QixpQkFBaUIsQ0FBQyxDQUFBO0FBRTlDOztHQUVHO0FBQ0g7SUFBcUMsbUNBQWE7SUFBbEQ7UUFBcUMsOEJBQWE7SUFRbEQsQ0FBQztJQU5HLGdDQUFNLEdBQU47UUFDSSxNQUFNLENBQUM7WUFDSCxTQUFTLEVBQUUsOEJBQThCO1NBQzVDLENBQUE7SUFDTCxDQUFDO0lBRUwsc0JBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBcUMsNkJBQWEsR0FRakQ7QUFSWSx1QkFBZSxrQkFRM0IsQ0FBQSJ9