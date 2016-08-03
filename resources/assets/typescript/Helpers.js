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
exports.requireAll = function (requireContext) {
    return requireContext.keys().map(requireContext);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHO0FBQ1EsZUFBTyxHQUFHLFVBQUMsS0FBUyxFQUFFLFFBQWlCLEVBQUUsS0FBUztJQUN6RCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1FBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFFRjs7Ozs7O0dBTUc7QUFDUSxnQkFBUSxHQUFHLFVBQUMsSUFBVSxFQUFFLEdBQVUsRUFBRSxRQUFhO0lBRXhELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDO0lBRXBCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDO0FBRWpCLENBQUMsQ0FBQTtBQUVEOzs7Ozs7R0FNRztBQUNRLGNBQU0sR0FBRyxVQUFDLFFBQVksRUFBRSxNQUFVO0lBRXpDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFFcEIsQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDUSxtQkFBVyxHQUFHLFVBQUMsR0FBVTtJQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU07UUFDdEUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBRVUsaUJBQVMsR0FBRyxVQUFDLEdBQVU7SUFDOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxrQkFBVSxHQUFHLFVBQUMsSUFBb0I7SUFFekMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWxCLENBQUMsQ0FBQTtBQUVVLGtCQUFVLEdBQUcsVUFBQyxjQUFjO0lBQ25DLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQSJ9