"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: SoundEffect
 */
var SoundEffect = (function (_super) {
    __extends(SoundEffect, _super);
    function SoundEffect() {
        _super.apply(this, arguments);
    }
    SoundEffect.prototype.models = function () {
        return {
            character: '/models/SoundEffect.json',
        };
    };
    return SoundEffect;
}(BaseCharacter_1.BaseCharacter));
exports.SoundEffect = SoundEffect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU291bmRFZmZlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTb3VuZEVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4QkFBNEIsaUJBQWlCLENBQUMsQ0FBQTtBQUU5Qzs7R0FFRztBQUNIO0lBQWlDLCtCQUFhO0lBQTlDO1FBQWlDLDhCQUFhO0lBUTlDLENBQUM7SUFORyw0QkFBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsU0FBUyxFQUFFLDBCQUEwQjtTQUN4QyxDQUFBO0lBQ0wsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0FBQyxBQVJELENBQWlDLDZCQUFhLEdBUTdDO0FBUlksbUJBQVcsY0FRdkIsQ0FBQSJ9