"use strict";
var AbstractPage = (function () {
    function AbstractPage(app) {
        this.routes = [];
        this.except = [];
        this.app = app;
    }
    AbstractPage.prototype.is = function (route) {
        var _this = this;
        if (route instanceof Array) {
            return !route.every(function (item) {
                return !(_this.route.match("^" + item));
            });
        }
        // return route.match(`^${this.route}`);
    };
    AbstractPage.prototype.only = function (route) {
        return !this.is(route);
    };
    return AbstractPage;
}());
exports.AbstractPage = AbstractPage;
//# sourceMappingURL=AbstractPage.js.map