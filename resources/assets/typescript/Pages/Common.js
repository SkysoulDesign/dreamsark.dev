"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractPage_1 = require("../Abstract/AbstractPage");
/**
 * Common Page
 */
var Common = (function (_super) {
    __extends(Common, _super);
    function Common() {
        _super.apply(this, arguments);
        this.routes = ['*'];
    }
    Common.prototype.boot = function (app) {
        app.logger.info('This class {Common} will run on every request');
    };
    return Common;
}(AbstractPage_1.AbstractPage));
exports.Common = Common;
//# sourceMappingURL=Common.js.map