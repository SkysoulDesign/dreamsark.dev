"use strict";
var AbstractComposition = (function () {
    function AbstractComposition() {
    }
    AbstractComposition.prototype.boot = function (app) {
    };
    AbstractComposition.prototype.objects = function () {
        return false;
    };
    AbstractComposition.prototype.setup = function (app) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
    };
    ;
    AbstractComposition.prototype.update = function (scene, camera, characters, time, delta) {
    };
    return AbstractComposition;
}());
exports.AbstractComposition = AbstractComposition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDb21wb3NpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFic3RyYWN0Q29tcG9zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBO0lBQUE7SUFvQkEsQ0FBQztJQWpCRyxrQ0FBSSxHQUFKLFVBQUssR0FBRztJQUNSLENBQUM7SUFFRCxxQ0FBTyxHQUFQO1FBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBSUQsbUNBQUssR0FBTCxVQUFNLEdBQUc7UUFBRSxpQkFBVTthQUFWLFdBQVUsQ0FBVixzQkFBVSxDQUFWLElBQVU7WUFBVixnQ0FBVTs7SUFFckIsQ0FBQzs7SUFFRCxvQ0FBTSxHQUFOLFVBQU8sS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUs7SUFFN0MsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCcUIsMkJBQW1CLHNCQW9CeEMsQ0FBQSJ9