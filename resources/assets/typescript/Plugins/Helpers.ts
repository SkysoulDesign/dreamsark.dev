/**
 * Get Extension of file thought the path
 * @param path
 * @returns {any}
 */
export var extension = function (path):string {
    return path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2);
}

export var countKeys = function (object) {
    var count = 0;
    for (var k in object) if (object.hasOwnProperty(k)) ++count;
    return count;
}



export var random = (min,max)=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//cloud
//let l_Var = new findSuitObjectByProbability(0,totalValue);
//push as many as you want
//l_Var.addProbability()....
//l_Var.getIndex();
export class findSuitObjectByProbability{
    private m_ProbabilityWeightArray:Array<number> = [];
    private m_MaxValue = 0;
    addProbability(e_Weight){
        this.m_ProbabilityWeightArray.push(e_Weight);
        this.m_MaxValue += e_Weight;
    }
    getIndex():number{
        let l_TargetValue:number  = random(0,this.m_MaxValue);
        let l_Length:number = this.m_ProbabilityWeightArray.length;
        var l_CurrentValue:number = 0;
        for(let i:number = 0;i<l_Length;++i){
            var l_CurrentWeight:number = this.m_ProbabilityWeightArray[i];
            l_CurrentValue += l_CurrentWeight;
            if(l_CurrentValue >= l_TargetValue){
                return i;
            }
        }
        //it should't happen
        return -1;
    }
}
