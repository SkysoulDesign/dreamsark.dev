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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RQYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQWJzdHJhY3RQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtJQU9JLHNCQUFZLEdBQUc7UUFIUixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUdmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFFTSx5QkFBRSxHQUFULFVBQVUsS0FBUztRQUFuQixpQkFZQztRQVZHLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXpCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQ2YsVUFBQSxJQUFJO2dCQUNBLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBSSxJQUFNLENBQUMsQ0FBQyxDQUFBO1lBQzFDLENBQUMsQ0FDSixDQUFDO1FBRU4sQ0FBQztRQUNELHdDQUF3QztJQUM1QyxDQUFDO0lBRU0sMkJBQUksR0FBWCxVQUFZLEtBQVM7UUFDakIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBSUwsbUJBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDO0FBL0JxQixvQkFBWSxlQStCakMsQ0FBQSJ9