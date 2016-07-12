"use strict";
var AbstractPage = (function () {
    function AbstractPage(app) {
        this.routes = [];
        this.except = [];
        this.app = app;
    }
    AbstractPage.prototype.is = function (route) {
        if (route instanceof Array) {
            return route.includes(this.route);
        }
        return this.route === route;
    };
    AbstractPage.prototype.only = function (route) {
        return !this.is(route);
    };
    return AbstractPage;
}());
exports.AbstractPage = AbstractPage;
//# sourceMappingURL=AbstractPage.js.map