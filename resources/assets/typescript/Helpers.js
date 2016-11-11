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
exports.extend = function (defaults) {
    var object = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        object[_i - 1] = arguments[_i];
    }
    for (var a in object) {
        for (var i in object[a]) {
            if (object[a].hasOwnProperty(i)) {
                defaults[i] = object[a][i];
            }
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
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
        if (p2)
            return p2.toUpperCase();
        return p1.toLowerCase();
    });
};
exports.captalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Firefox have an issue to submit form if its not appended to the body
 * @param form
 */
exports.submitForm = function (form) {
    document.body.appendChild(form);
    form.submit();
};
/**
 * Require a whole Folder
 *
 * @param requireContext
 * @returns {U[]}
 */
exports.requireAll = function (requireContext) {
    return requireContext.keys().map(requireContext);
};
//# sourceMappingURL=Helpers.js.map