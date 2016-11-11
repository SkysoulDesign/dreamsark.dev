"use strict";
var Sort = (function () {
    function Sort(collection, algorithm) {
        if (algorithm === void 0) { algorithm = Sort.AUTOMATIC; }
        this.collection = collection;
        this.algorithm = algorithm;
    }
    Sort.prototype.sort = function (algorithm) {
        if (algorithm === void 0) { algorithm = this.algorithm; }
        return this.collection.sort(Sort[algorithm]);
    };
    Sort.random = function (a, b) { return Math.random() - 0.5; };
    Sort.w = function (a, b) { return b.width - a.width; };
    Sort.h = function (a, b) { return b.height - a.height; };
    Sort.a = function (a, b) { return b.area - a.area; };
    Sort.max = function (a, b) { return Math.max(b.width, b.height) - Math.max(a.width, a.height); };
    Sort.min = function (a, b) { return Math.min(b.width, b.height) - Math.min(a.width, a.height); };
    Sort.height = function (a, b) { return Sort.msort(a, b, ['h', 'w']); };
    Sort.width = function (a, b) { return this.msort(a, b, ['w', 'h']); };
    Sort.area = function (a, b) { return this.msort(a, b, ['a', 'h', 'w']); };
    Sort.maxside = function (a, b) { return this.msort(a, b, ['max', 'min', 'h', 'w']); };
    Sort.msort = function (a, b, criteria) {
        for (var _i = 0, criteria_1 = criteria; _i < criteria_1.length; _i++) {
            var sort = criteria_1[_i];
            var diff = Sort[sort](a, b);
            if (diff !== 0) {
                return diff;
            }
        }
        return 0;
    };
    Sort.AUTOMATIC = 'a';
    Sort.RANDOM = 'random';
    Sort.WIDTH = 'w';
    Sort.HEIGHT = 'h';
    Sort.MIN = 'min';
    Sort.MAX = 'max';
    Sort.MAX_HEIGHT = 'height';
    Sort.MAX_WIDTH = 'width';
    Sort.AREA = 'area';
    Sort.SIDE = 'maxside';
    return Sort;
}());
exports.Sort = Sort;
//# sourceMappingURL=Sort.js.map