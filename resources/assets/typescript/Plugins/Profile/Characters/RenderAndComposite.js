"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: RenderAndComposite
 */
var RenderAndComposite = (function (_super) {
    __extends(RenderAndComposite, _super);
    function RenderAndComposite() {
        _super.apply(this, arguments);
    }
    RenderAndComposite.prototype.models = function () {
        return {
            character: '/models/RenderAndComposite.json',
        };
    };
    return RenderAndComposite;
}(BaseCharacter_1.BaseCharacter));
exports.RenderAndComposite = RenderAndComposite;
//# sourceMappingURL=RenderAndComposite.js.map