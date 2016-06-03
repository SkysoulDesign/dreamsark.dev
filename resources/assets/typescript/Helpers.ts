/**
 * For Loop
 */
export var forEach = (array:any, callback:Function, scope:any):void => {
    for (var i = 0; i < array.length; i++)
        callback.call(scope, i, array[i]);
};