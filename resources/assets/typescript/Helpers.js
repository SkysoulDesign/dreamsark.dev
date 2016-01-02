var DreamsArk;
(function (DreamsArk) {
    var Helpers;
    (function (Helpers) {
        Helpers.init = function (items) {
            if (items === void 0) { items = []; }
            /**
             * Init All items in a row
             */
            Helpers.each(items, function (item) {
                var component = new item, instance = component.instance;
                if (is.Function(component.configure))
                    component.configure();
                item.instance = instance ? instance : component;
            });
        };
        Helpers.query = function (element) {
            return document.querySelector(element);
        };
        Helpers.each = function (items, callback, context) {
            if (items === void 0) { items = []; }
            if (context === void 0) { context = DreamsArk; }
            if (is.Array(items))
                items.forEach(callback.bind(context));
            if (is.Object(items))
                Object.keys(items).forEach(function (name) {
                    callback.call(context, items[name], name);
                });
        };
        Helpers.func = function (obj) {
            return ;
            return obj;
        };
    })(Helpers = DreamsArk.Helpers || (DreamsArk.Helpers = {}));
})(DreamsArk || (DreamsArk = {}));
;
exports.For = function (max, callback, context, reverse) {
    if (context === void 0) { context = DreamsArk; }
    if (reverse === void 0) { reverse = false; }
    /**
     * if it's array of object
     */
    if (is.Array(max) || is.Object(max))
        max = exports.length(max);
    /**
     * Play for on Reverse
     */
    if (reverse === true) {
        for (var i = max - 1; i >= 0; i--)
            if (callback.call(context, i))
                break;
        return;
    }
    for (var i = 0; i < max; i++) {
        if (callback.call(context, i))
            break;
    }
};
exports.length = function (item) {
    if (item === void 0) { item = []; }
    if (is.Array(item))
        return item.length;
    if (is.Object(item)) {
        var length = 0;
        each(item, function () {
            length++;
        });
        return length;
    }
};
exports.contains = function (items, element) {
    if (is.Array(items))
        return items.indexOf(element) > -1;
    if (is.Object(items))
        console.log('is Object Please finish implementing this function');
    return false;
};
exports.reverse = function (items) {
    return items.sort(function (a, b) {
        return b - a;
    });
};
exports.filter = function (obj, list) {
    var result = {};
    each(obj, function (el, key) {
        if (exports.contains(list, key))
            result[key] = obj[key];
    });
    return result;
};
/**
 * Dom Utils
 */
exports.appendTo = function (element, domElement) {
    document.querySelector(element).appendChild(domElement);
};
exports.removeById = function (collection, id) {
    exports.For(collection, function (index) {
        if (collection[index].id === id)
            collection.splice(index, 1);
    });
};
exports.timeout = function (time, callback, context) {
    if (context === void 0) { context = DreamsArk; }
    return window.setTimeout(callback.bind(context), time * 1000);
};
exports.clone = function (obj, skip) {
    if (!is.Object(obj))
        return obj;
    var temp = {};
    each(obj, function (el, key) {
        /**
         * Skip Properties if it has been set
         */
        if (!is.Null(skip) && exports.contains(skip, key))
            return;
        temp[key] = exports.clone(obj[key], skip);
    }, this);
    return temp;
};
exports.map = function (obj, callback, context) {
    if (context === void 0) { context = DreamsArk; }
    var instance = {};
    /**
     * Loop on every property and set them accordingly
     */
    each(obj, function (el, index) {
        /**
         * if it's an object, map again
         */
        if (is.Object(el)) {
            return instance[index] = exports.map(el, callback, context);
        }
        else {
            /**
             * call Callback
             */
            instance[index] = callback.call(context, el, index);
        }
    }, this);
    return instance;
};
exports.deg2rad = function (degrees) {
    return (degrees * Math.PI / 180);
};
/**
 * Checker if obj is X type
 */
var is = (function () {
    function is() {
    }
    is.Array = function (item) {
        return Array.isArray(item);
    };
    is.Object = function (item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    };
    is.Null = function (item) {
        return (item === null || item === undefined || item === 0 || item === '0');
    };
    is.Function = function (item) {
        return !!(item && item.constructor && item.call && item.apply);
    };
    is.Image = function (item) {
        var ext = item.split('.').pop();
        return (ext === 'jpg' || ext === 'png');
    };
    is.OBJ = function (item) {
        var ext = item.split('.').pop();
        return (ext === 'obj');
    };
    return is;
})();
exports.is = is;
var random = (function () {
    function random() {
    }
    random.id = function (length, radix) {
        if (length === void 0) { length = 27; }
        if (radix === void 0) { radix = 36; }
        return (Math.random() + 1).toString(radix).substring(2, length + 2);
    };
    random.vector3 = function (x, y, z, distance, stick) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (distance === void 0) { distance = 0; }
        if (stick === void 0) { stick = false; }
        // Coordinates
        var u1 = Math.random() * 2 - 1, u2 = Math.random(), radius = Math.sqrt(1 - u1 * u1), theta = 2 * Math.PI * u2;
        // Stick to surface or disperse inside sphere
        if (!stick)
            distance = Math.random() * distance;
        return new THREE.Vector3(radius * Math.cos(theta) * distance + x, radius * Math.sin(theta) * distance + y, u1 * distance + z);
    };
    return random;
})();
exports.random = random;
var where = (function () {
    function where() {
    }
    where.id = function (collection, id) {
        var occurrence = [];
        each(collection, function (element) {
            if (element.id === id)
                occurrence = element;
        });
        return occurrence;
    };
    where.name = function (collection, id) {
        var occurrences = [];
        each(collection, function (element) {
            if (element.id === id)
                occurrences.push(element);
        });
        return exports.length(occurrences) > 0 ? occurrences[0] : occurrences;
    };
    return where;
})();
exports.where = where;
var math = (function () {
    function math() {
        this.calculator = function (origin, obj, operator) {
            var temp = {}, operators = {
                '-': function (a, b) {
                    return a - b;
                },
                '+': function (a, b) {
                    return a + b;
                },
                '*': function (a, b) {
                    return a * b;
                },
                '/': function (a, b) {
                    return a / b;
                }
            };
            if (is.Object(origin)) {
                each(origin, function (el, index) {
                    if (is.Object(el)) {
                        return temp[index] = this.calculator(el, is.Object(obj) ? obj[index] : obj, operator);
                    }
                    if (is.Object(obj)) {
                        if (is.Object(obj[index]))
                            return temp[index] = this.calculator(el, obj[index], operator);
                        return temp[index] = operators[operator](el, obj[index]);
                    }
                    temp[index] = operators[operator](el, obj);
                }, this);
                return temp;
            }
            return operators[operator](origin, obj);
        };
    }
    math.sub = function (origin, obj) {
        return (new math).calculator(origin, obj, '-');
    };
    math.add = function (origin, obj) {
        return (new math).calculator(origin, obj, '+');
    };
    math.multiply = function (origin, obj) {
        return (new math).calculator(origin, obj, '*');
    };
    math.divide = function (origin, obj) {
        return (new math).calculator(origin, obj, '/');
    };
    return math;
})();
exports.math = math;
//# sourceMappingURL=Helpers.js.map