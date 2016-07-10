/**
 * Get Extension of file thought the path
 * @param path
 * @returns {any}
 */
export var extension = function (path) {
    return path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2);
}

export var countKeys = function (object) {
    var count = 0;
    for (var k in object) if (object.hasOwnProperty(k)) ++count;
    return count;
}
