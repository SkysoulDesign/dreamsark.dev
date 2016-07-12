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
exports.popByKey = function (data, key, defaults) {
    if (!data.hasOwnProperty(key))
        return defaults;
    var value = data[key];
    delete data[key];
    return value;
};
/**
 * Extend Object
 *
 * @param defaults
 * @param object
 * @returns {any}
 */
exports.extend = function (defaults, object) {
    for (var i in object) {
        if (object.hasOwnProperty(i)) {
            defaults[i] = object[i];
        }
    }
    return defaults;
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
exports.captalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
//# sourceMappingURL=Helpers.js.map