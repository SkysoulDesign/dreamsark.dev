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
//# sourceMappingURL=Actor.js.map