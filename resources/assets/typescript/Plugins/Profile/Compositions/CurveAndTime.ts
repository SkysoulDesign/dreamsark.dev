//author cloud
import {forEach} from "../../../Helpers";


class CurveAndTimeData {
    public  m_PositionArray:THREE.Vector3[];
    public  m_TimeArray:number[];
    // private m_RestTime:number;
    private m_CurrentTime:number;
    private m_CurrentPosition:THREE.Vector3;
    private m_LODPositionArray:THREE.Vector3[];
    private m_LODTimeArray:number[];
    /**
     *
     * @param e_dbTime
     */
    GetPositionByTime = (e_dbTime:number):THREE.Vector3 => {
        if(1)
            return new THREE.Vector3(0,0,0);
        return null;
    };
    AddPoints(e_vPos,e_Time){
        this.m_PositionArray.push(e_vPos);
        this.m_TimeArray.push(e_Time);
    }
    // setTime(e_Time){
    //     this.m_Time = e_Time;
    // }
    DoLOD(e_iLOD){
        //for copy original data
        this.m_LODPositionArray = this.m_PositionArray.slice(0);
        this.m_LODTimeArray = this.m_TimeArray.slice(0);
        for(var i=0;i<e_iLOD;++i){
            this.m_LODPositionArray = this.IncreaseLOD(this.m_LODPositionArray);
            this.m_LODTimeArray = this.IncreaseLOD(this.m_LODTimeArray);
        }
    }
    IncreaseLOD(e_Array){
        let l_OldData = e_Array.sline(0);
        var l_NewArray = [];
        // keep the first point
        l_NewArray.push(l_OldData[0]);
        var	l_uiSize = l_OldData.length-1;
        for(let i=0;i<l_uiSize;++i)
        {
            //for data
            let l_OldDataValue1 = l_OldData[i];
            let l_OldDataValue2 = l_OldData[i+1];
            let l_NewData1;
            let l_NewData2;
            // average the 2 original points to create 2 new points. For each
            // CV, another 2 verts are created.
            if(l_OldDataValue1.x == undefined)
            {
                l_NewData1 = 0.75 * l_OldDataValue1 + 0.25 * l_OldDataValue2;
                l_NewData2 = 0.25 * l_OldDataValue1 + 0.75 * l_OldDataValue2;
            }else{
                l_NewData1.x = 0.75 * l_OldDataValue1.x + 0.25 * l_OldDataValue2.x;
                l_NewData1.y = 0.75 * l_OldDataValue1.y + 0.25 * l_OldDataValue2.y;
                l_NewData2 = 0.25 * l_OldDataValue1 + 0.75 * l_OldDataValue2;
            }

            l_NewArray.push(l_NewData1);
            l_NewArray.push(l_NewData2);

        }
        // keep the last point
        l_NewArray.push(l_OldData[l_OldData.size()-1]);
        return l_NewArray;
    }
}
