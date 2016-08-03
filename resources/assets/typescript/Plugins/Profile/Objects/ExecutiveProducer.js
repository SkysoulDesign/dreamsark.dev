"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCharacter_1 = require("./BaseCharacter");
/**
 * Character: ExecutiveProducer
 */
var ExecutiveProducer = (function (_super) {
    __extends(ExecutiveProducer, _super);
    function ExecutiveProducer() {
        _super.apply(this, arguments);
    }
    ExecutiveProducer.prototype.models = function () {
        return {
            character: '/models/ExecutiveProducer.json',
        };
    };
    return ExecutiveProducer;
}(BaseCharacter_1.BaseCharacter));
exports.ExecutiveProducer = ExecutiveProducer;
//# sourceMappingURL=ExecutiveProducer.js.map