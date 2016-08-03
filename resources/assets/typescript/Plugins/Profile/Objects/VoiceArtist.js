"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: VoiceArtist
 */
var VoiceArtist = (function (_super) {
    __extends(VoiceArtist, _super);
    function VoiceArtist() {
        _super.apply(this, arguments);
    }
    VoiceArtist.prototype.models = function () {
        return {
            character: '/models/VoiceArtist.json',
        };
    };
    return VoiceArtist;
}(BaseCharacter_1.BaseCharacter));
exports.VoiceArtist = VoiceArtist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVm9pY2VBcnRpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJWb2ljZUFydGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4QkFBNEIsaUJBQWlCLENBQUMsQ0FBQTtBQUU5Qzs7R0FFRztBQUNIO0lBQWlDLCtCQUFhO0lBQTlDO1FBQWlDLDhCQUFhO0lBUTlDLENBQUM7SUFORyw0QkFBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsU0FBUyxFQUFFLDBCQUEwQjtTQUN4QyxDQUFBO0lBQ0wsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0FBQyxBQVJELENBQWlDLDZCQUFhLEdBUTdDO0FBUlksbUJBQVcsY0FRdkIsQ0FBQSJ9