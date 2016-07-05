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
/**
 * Convert String to CamelCase
 *
 * @param str
 * @returns {string}
 */
exports.toCamelCase = function (str) {
    return str.toLowerCase()
        .replace(/['"]/g, '')
        .replace(/\W+/g, ' ')
        .replace(/ (.)/g, function ($1) {
        return $1.toUpperCase();
    })
        .replace(/ /g, '');
};
//# sourceMappingURL=Helpers.js.map