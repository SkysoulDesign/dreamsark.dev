"use strict";
/**
 * For Loop
 */
exports.forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++)
        callback.call(scope, i, array[i]);
};
/**
 * Pop array by key name
 *
 * @param data
 * @param key
 * @returns any[]
 */
exports.popByKey = function (data, key) {
    var value = data[key];
    delete data[key];
    return value;
};
//# sourceMappingURL=Helpers.js.map