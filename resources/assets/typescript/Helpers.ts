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
export var extend = (defaults:{}, object:{}):{} => {

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
    return str.toLowerCase()
        .replace(/['"]/g, '')
        .replace(/\W+/g, ' ')
        .replace(/ (.)/g, function ($1) {
            return $1.toUpperCase();
        })
        .replace(/ /g, '');
}
