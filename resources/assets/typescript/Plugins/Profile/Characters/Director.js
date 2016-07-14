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
//# sourceMappingURL=Director.js.map