"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: ArtDirector
 */
var ArtDirector = (function (_super) {
    __extends(ArtDirector, _super);
    function ArtDirector() {
        _super.apply(this, arguments);
    }
    ArtDirector.prototype.models = function () {
        return {
            character: '/models/ArtDirector.json',
        };
    };
    return ArtDirector;
}(BaseCharacter_1.BaseCharacter));
exports.ArtDirector = ArtDirector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJ0RGlyZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBcnREaXJlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4QkFBNEIsaUJBQWlCLENBQUMsQ0FBQTtBQUU5Qzs7R0FFRztBQUNIO0lBQWlDLCtCQUFhO0lBQTlDO1FBQWlDLDhCQUFhO0lBUTlDLENBQUM7SUFORyw0QkFBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsU0FBUyxFQUFFLDBCQUEwQjtTQUN4QyxDQUFBO0lBQ0wsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0FBQyxBQVJELENBQWlDLDZCQUFhLEdBUTdDO0FBUlksbUJBQVcsY0FRdkIsQ0FBQSJ9