/**
 * Get Extension of file thought the path
 * @param path
 * @returns {any}
 */
export var extension = function (path): string {
    return path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
}

export var countKeys = function (object) {
    var count = 0;
    for (var k in object) if (object.hasOwnProperty(k)) ++count;
    return count;
}

export var random = (min: number, max: number)=> {
    var l_ValueMin = min;
    var l_ValueMax = max;
    if (typeof(min) == "string")
        l_ValueMin = parseInt(min);
    if (typeof(max) == "string")
        l_ValueMax = parseInt(max);
    return Math.floor(Math.random() * (l_ValueMax - l_ValueMin + 1)) + l_ValueMin;
}

/**
 * Zip two arrays to an keyed object
 *  [1,2,3] [a,b,c] => {a:1, b:2, c:3}
 * @param values
 * @param keys
 * @returns {any}
 */
export var zip = function (values: any[], keys: any[]): {} {
    return Object.assign({}, ...keys.map((n, index) => ({[n]: values[index]})))
}

/**
 * Checker if obj is of a X type
 */
export class is {

    /**
     * Check if it's an Array
     */
    static Array(item: any): boolean {
        return Array.isArray(item);
    }

    /**
     * Check if it's an Object
     */
    static Object(item: any): boolean {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    }

    /**
     * Check if it's Null
     */
    static Null(item: any): boolean {
        return (item === null || item === undefined || item === 0 || item === '0');
    }

    /**
     * Check if it's a Function
     */
    static Function(item: any): boolean {
        return !!(item && item.constructor && item.call && item.apply);
    }

}


//cloud
//let l_Var = new findSuitObjectByProbability(0,totalValue);
//push as many as you want
//l_Var.addProbability()....
//l_Var.getIndex();
export class findSuitObjectByProbability {
    private m_ProbabilityWeightArray: Array<number> = [];
    private m_MaxValue: number = 0;

    addProbability(e_Weight: number) {
        var l_Weight = e_Weight;
        if (typeof(e_Weight) == "string")
            l_Weight = parseInt(e_Weight);
        this.m_ProbabilityWeightArray.push(l_Weight);
        this.m_MaxValue += l_Weight;
    }

    getIndex(): number {
        console.log("max value " + this.m_MaxValue);
        let l_TargetValue: number = random(0, this.m_MaxValue);
        console.log("target value " + l_TargetValue);
        let l_Length: number = this.m_ProbabilityWeightArray.length;
        var l_CurrentValue: number = 0;
        for (let i: number = 0; i < l_Length; ++i) {
            var l_CurrentWeight: number = this.m_ProbabilityWeightArray[i];
            l_CurrentValue += l_CurrentWeight;
            console.log("current value " + l_CurrentValue);
            if (l_CurrentValue >= l_TargetValue) {
                console.log("target index is " + i);
                return i;
            }
        }
        //it should't happen
        return -1;
    }
}
