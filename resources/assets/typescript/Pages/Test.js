"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractPage_1 = require("../Abstract/AbstractPage");
/**
 * Profile
 */
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.routes = [
            'user.profile.index',
        ];
    }
    Test.prototype.boot = function () {
        console.log('Im a test');
    };
    return Test;
}(AbstractPage_1.AbstractPage));
exports.Test = Test;
//# sourceMappingURL=Test.js.map