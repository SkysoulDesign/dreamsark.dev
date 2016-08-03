"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: Director
 */
var Director = (function (_super) {
    __extends(Director, _super);
    function Director() {
        _super.apply(this, arguments);
    }
    Director.prototype.models = function () {
        return {
            character: '/models/Director.json',
        };
    };
    return Director;
}(BaseCharacter_1.BaseCharacter));
exports.Director = Director;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlyZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEaXJlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4QkFBNEIsaUJBQWlCLENBQUMsQ0FBQTtBQUU5Qzs7R0FFRztBQUNIO0lBQThCLDRCQUFhO0lBQTNDO1FBQThCLDhCQUFhO0lBUTNDLENBQUM7SUFORyx5QkFBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsU0FBUyxFQUFFLHVCQUF1QjtTQUNyQyxDQUFBO0lBQ0wsQ0FBQztJQUVMLGVBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBOEIsNkJBQWEsR0FRMUM7QUFSWSxnQkFBUSxXQVFwQixDQUFBIn0=