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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNkJBQTJCLDBCQUEwQixDQUFDLENBQUE7QUFFdEQ7O0dBRUc7QUFDSDtJQUEwQix3QkFBWTtJQUF0QztRQUEwQiw4QkFBWTtRQUUzQixXQUFNLEdBQUc7WUFDWixvQkFBb0I7U0FDdkIsQ0FBQTtJQU1MLENBQUM7SUFKRyxtQkFBSSxHQUFKO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBRUwsV0FBQztBQUFELENBQUMsQUFWRCxDQUEwQiwyQkFBWSxHQVVyQztBQVZZLFlBQUksT0FVaEIsQ0FBQSJ9