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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDUSxpQkFBUyxHQUFHLFVBQVUsSUFBSTtJQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUMsQ0FBQTtBQUVVLGlCQUFTLEdBQUcsVUFBVSxNQUFNO0lBQ25DLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQztRQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxFQUFFLEtBQUssQ0FBQztJQUM1RCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FBQTtBQUlVLGNBQU0sR0FBRyxVQUFDLEdBQUcsRUFBQyxHQUFHO0lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDN0QsQ0FBQyxDQUFBO0FBRUQsT0FBTztBQUNQLDREQUE0RDtBQUM1RCwwQkFBMEI7QUFDMUIsNEJBQTRCO0FBQzVCLG1CQUFtQjtBQUNuQjtJQUFBO1FBQ1ksNkJBQXdCLEdBQWlCLEVBQUUsQ0FBQztRQUM1QyxlQUFVLEdBQUcsQ0FBQyxDQUFDO0lBbUIzQixDQUFDO0lBbEJHLG9EQUFjLEdBQWQsVUFBZSxRQUFRO1FBQ25CLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUM7SUFDaEMsQ0FBQztJQUNELDhDQUFRLEdBQVI7UUFDSSxJQUFJLGFBQWEsR0FBVyxjQUFNLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RCxJQUFJLFFBQVEsR0FBVSxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDO1FBQzNELElBQUksY0FBYyxHQUFVLENBQUMsQ0FBQztRQUM5QixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBVSxDQUFDLEVBQUMsQ0FBQyxHQUFDLFFBQVEsRUFBQyxFQUFFLENBQUMsRUFBQyxDQUFDO1lBQ2pDLElBQUksZUFBZSxHQUFVLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RCxjQUFjLElBQUksZUFBZSxDQUFDO1lBQ2xDLEVBQUUsQ0FBQSxDQUFDLGNBQWMsSUFBSSxhQUFhLENBQUMsQ0FBQSxDQUFDO2dCQUNoQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQztRQUNMLENBQUM7UUFDRCxvQkFBb0I7UUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUNMLGtDQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQXJCWSxtQ0FBMkIsOEJBcUJ2QyxDQUFBIn0=