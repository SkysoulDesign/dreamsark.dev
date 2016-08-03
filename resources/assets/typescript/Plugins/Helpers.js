"use strict";
/**
 * Get Extension of file thought the path
 * @param path
 * @returns {any}
 */
exports.extension = function (path) {
    return path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2);
};
exports.countKeys = function (object) {
    var count = 0;
    for (var k in object)
        if (object.hasOwnProperty(k))
            ++count;
    return count;
};
exports.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
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
        this.m_ProbabilityWeightArray.push(e_Weight);
        this.m_MaxValue += e_Weight;
    };
    findSuitObjectByProbability.prototype.getIndex = function () {
        var l_TargetValue = exports.random(0, this.m_MaxValue);
        var l_Length = this.m_ProbabilityWeightArray.length;
        var l_CurrentValue = 0;
        for (var i = 0; i < l_Length; ++i) {
            var l_CurrentWeight = this.m_ProbabilityWeightArray[i];
            l_CurrentValue += l_CurrentWeight;
            if (l_CurrentValue >= l_TargetValue) {
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