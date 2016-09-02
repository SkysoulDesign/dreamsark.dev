"use strict";
/**
 * Get Extension of file thought the path
 * @param path
 * @returns {any}
 */
exports.extension = function (path) {
    return path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
};
exports.countKeys = function (object) {
    var count = 0;
    for (var k in object)
        if (object.hasOwnProperty(k))
            ++count;
    return count;
};
exports.random = function (min, max) {
    var l_ValueMin = min;
    var l_ValueMax = max;
    if (typeof (min) == "string")
        l_ValueMin = parseInt(min);
    if (typeof (max) == "string")
        l_ValueMax = parseInt(max);
    return Math.floor(Math.random() * (l_ValueMax - l_ValueMin + 1)) + l_ValueMin;
};
/**
 * Zip two arrays to an keyed object
 *  [1,2,3] [a,b,c] => {a:1, b:2, c:3}
 * @param values
 * @param keys
 * @returns {any}
 */
exports.zip = function (values, keys) {
    return Object.assign.apply(Object, [{}].concat(keys.map(function (n, index) { return ((_a = {}, _a[n] = values[index], _a)); var _a; })));
};
/**
 * Checker if obj is of a X type
 */
var is = (function () {
    function is() {
    }
    /**
     * Check if it's an Array
     */
    is.Array = function (item) {
        return Array.isArray(item);
    };
    /**
     * Check if it's an Object
     */
    is.Object = function (item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    };
    /**
     * Check if it's Null
     */
    is.Null = function (item) {
        return (item === null || item === undefined || item === 0 || item === '0');
    };
    /**
     * Check if it's a Function
     */
    is.Function = function (item) {
        return !!(item && item.constructor && item.call && item.apply);
    };
    return is;
}());
exports.is = is;
//cloud
//let l_Var = new findSuitObjectByProbability(0,totalValue);
//push as many as you want
//l_Var.addProbability()....
//l_Var.getIndex();
var findSuitObjectByProbability = (function () {
    function findSuitObjectByProbability() {
        this.m_ProbabilityWeightArray = [];
        this.m_MaxValue = 0;
    }
    findSuitObjectByProbability.prototype.addProbability = function (e_Weight) {
        var l_Weight = e_Weight;
        if (typeof (e_Weight) == "string")
            l_Weight = parseInt(e_Weight);
        this.m_ProbabilityWeightArray.push(l_Weight);
        this.m_MaxValue += l_Weight;
    };
    findSuitObjectByProbability.prototype.getIndex = function () {
        console.log("max value " + this.m_MaxValue);
        var l_TargetValue = exports.random(0, this.m_MaxValue);
        console.log("target value " + l_TargetValue);
        var l_Length = this.m_ProbabilityWeightArray.length;
        var l_CurrentValue = 0;
        for (var i = 0; i < l_Length; ++i) {
            var l_CurrentWeight = this.m_ProbabilityWeightArray[i];
            l_CurrentValue += l_CurrentWeight;
            console.log("current value " + l_CurrentValue);
            if (l_CurrentValue >= l_TargetValue) {
                console.log("target index is " + i);
                return i;
            }
        }
        //it should't happen
        return -1;
    };
    return findSuitObjectByProbability;
}());
exports.findSuitObjectByProbability = findSuitObjectByProbability;
//# sourceMappingURL=Helpers.js.map