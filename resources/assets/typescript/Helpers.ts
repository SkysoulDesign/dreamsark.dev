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
export var popByKey = (data:any[], key:string):any[] => {
    let value = data[key];
    delete data[key];
    return value;
};