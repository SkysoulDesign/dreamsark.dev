"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: Actor
 */
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        _super.apply(this, arguments);
    }
    Actor.prototype.models = function () {
        return {
            character: '/models/Actor.json',
        };
    };
    return Actor;
}(BaseCharacter_1.BaseCharacter));
exports.Actor = Actor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSw4QkFBNEIsaUJBQWlCLENBQUMsQ0FBQTtBQUU5Qzs7R0FFRztBQUNIO0lBQTJCLHlCQUFhO0lBQXhDO1FBQTJCLDhCQUFhO0lBUXhDLENBQUM7SUFORyxzQkFBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsU0FBUyxFQUFFLG9CQUFvQjtTQUNsQyxDQUFBO0lBQ0wsQ0FBQztJQUVMLFlBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBMkIsNkJBQWEsR0FRdkM7QUFSWSxhQUFLLFFBUWpCLENBQUEifQ==