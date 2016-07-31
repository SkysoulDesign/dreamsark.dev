/**
 * For Loop
 */
export var forEach = (array:any, callback:Function, scope:any):void => {
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
export var popByKey = (data:any[], key:string, defaults?:any):any[] => {

    if (!data.hasOwnProperty(key))
        return defaults;

    let value = data[key];
    delete data[key];
    return value;

}

/**
 * Extend Object
 *
 * @param defaults
 * @param object
 * @returns {any}
 */
export var extend = (defaults:any, object:any):any => {

    for (let i in object) {
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
export var toCamelCase = (str:string) => {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
}

export var captalize = (str:string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Firefox have an issue to submit form if its not appended to the body
 * @param form
 */
export var submitForm = (form:HTMLFormElement) => {

    document.body.appendChild(form);
    form.submit();

}

export var requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext);
}
