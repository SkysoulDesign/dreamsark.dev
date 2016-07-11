"use strict";
/**
 * Get Extension of file thought the path
 * @param path
 * @returns {any}
 */
exports.extension = function (path) {
    return path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2);
};
exports.countKeys = function (object) {
    var count = 0;
    for (var k in object)
        if (object.hasOwnProperty(k))
            ++count;
    return count;
};
//# sourceMappingURL=Helpers.js.map