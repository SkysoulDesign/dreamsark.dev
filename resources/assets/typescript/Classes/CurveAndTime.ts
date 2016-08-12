//author cloud

export class ThreeLines
{
    private m_Line:THREE.Line;
    private m_LineGeometry:THREE.Geometry;
    private m_LineMaterial:THREE.LineBasicMaterial;
    private m_PointGeometry:THREE.Geometry;
    private m_PointsMaterial:THREE.PointsMaterial;
    private m_Points:THREE.Points;
    private m_TextMaterial:THREE.MeshPhongMaterial;
    private m_TextArray;
    constructor(){
        this.m_Line = null;
        this.m_LineGeometry = new THREE.Geometry();
        this.m_LineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});

        this.m_PointGeometry = new THREE.Geometry();
        this.m_PointsMaterial = new THREE.PointsMaterial( { size: 3, sizeAttenuation: false ,color:0xff0000} );

        this.m_TextMaterial = null;//new THREE.MeshPhongMaterial({color:0x888800});
        this.m_TextArray = [];
    }
    SetHintPoint(e_PointsArray){
        this.m_PointGeometry.vertices = [];
        for(let i=0;i<this.m_TextArray.length;++i){
            let l_Mesh:THREE.Mesh = this.m_TextArray[i];
            if(l_Mesh.parent)
                l_Mesh.parent.remove(l_Mesh);
        }
        this.m_TextArray = [];
        if( e_PointsArray && e_PointsArray.length) {
            var l_Length = e_PointsArray.length;
            for(let i=0;i<l_Length;++i){
                let l_Pos:THREE.Vector3 =  e_PointsArray[i];
                this.m_PointGeometry.vertices.push(l_Pos);
                if(this.m_TextMaterial) {
                    let l_TextGeo = new THREE.TextGeometry(i.toString());
                    let l_TextMesh = new THREE.Mesh(l_TextGeo, this.m_TextMaterial);
                    l_TextMesh.position.set(l_Pos.x, l_Pos.y, l_Pos.z);
                    this.m_TextArray.push(l_TextMesh);
                }
            }
            this.m_Points = new THREE.Points( this.m_PointGeometry , this.m_PointsMaterial );
        }
    }
    SetLines(e_PointsArray,e_bAddToPoints){
        this.m_LineGeometry.vertices = [];
        if(e_bAddToPoints)
            this.m_PointGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
        if( e_PointsArray && e_PointsArray.length) {
            var l_Length = e_PointsArray.length;
            for(let i=0;i<l_Length;++i){
                let l_Pos:THREE.Vector3 =  e_PointsArray[i];
                this.m_LineGeometry.vertices.push(l_Pos);
            }
            this.m_Line = new THREE.Line(this.m_LineGeometry,this.m_LineMaterial);
            if(e_bAddToPoints){
                this.m_Points = new THREE.Points( this.m_LineGeometry , this.m_PointsMaterial );
            }
        }
    }
    BindScene(e_Scene){
        e_Scene.add(this.m_Line);
        e_Scene.add(this.m_Points);
        for(let i=0;i<this.m_TextArray.length;++i){
            let l_Mesh:THREE.Mesh = this.m_TextArray[i];
            e_Scene.add(l_Mesh);
        }
    }
    unBinedScene(e_Scene){
        e_Scene.remove(this.m_Line);
        e_Scene.remove(this.m_Points);
        for(let i=0;i<this.m_TextArray.length;++i){
            let l_Mesh:THREE.Mesh = this.m_TextArray[i];
            e_Scene.remov(l_Mesh);
        }
    }
}

export class HintIndexCallback{
    public  m_iIndex;
    public  m_Callback;
    public  m_bTouched;
    public  m_CurrentPos;
    constructor(){
        this.m_iIndex = -1;
        this.m_Callback = null;
        this.m_bTouched = false;
        this.m_CurrentPos = new THREE.Vector3(0,0,0);
    }
}

export class CurveAndTimeData {
    public  m_PositionArray;//THREE.Vector3[]
    public  m_TimeArray:number[];
    // private m_RestTime:number;
    private m_fPastTime:number;
    private m_iCurrentWorkingIndex:number;
    private m_CurrentData;//vector3
    //
    private m_LODPositionArray:THREE.Vector3[];
    private m_LODTimeArray:number[];
    private m_LOD:number;
    private m_bDataChanged:boolean;
    public  m_bLoop:boolean;
    public  m_bUpdateWithLiner:boolean;
    public  m_bEnd:boolean;
    public  m_CurrentLERP:number;
    //just for debug test
    public m_ThreeLines:ThreeLines;
    private m_HintIndexCallbackArray:HintIndexCallback[];
    constructor(){
        this.m_HintIndexCallbackArray = [];
        this.m_bDataChanged = false;
        this.m_LOD = 1;
        this.m_bLoop = false;
        this.m_bUpdateWithLiner = true;
        this.m_PositionArray = [];
        this.m_TimeArray = [];
        this.m_bEnd = true;
        this.m_ThreeLines = new ThreeLines();
    }
    ClearHintIndexTouched(){
        for(let l_Data in this.m_HintIndexCallbackArray){
            let l_HintIndexCallbackArray = this.m_HintIndexCallbackArray[l_Data];
            l_HintIndexCallbackArray.m_bTouched = false;
        }
    }
    AddHiontIndexCallbackFunction(e_iIndex,e_Callback){
        if(this.m_LOD!=1){
            if(this.m_LODPositionArray) {
                let l_Rate = this.m_LODPositionArray.length/this.m_PositionArray.length;
                e_iIndex *= l_Rate;
                e_iIndex = Math.round(e_iIndex);
            }
        }
        if(this.m_HintIndexCallbackArray && !this.m_HintIndexCallbackArray[e_iIndex]){
            let l_HintIndexCallback = new HintIndexCallback();
            l_HintIndexCallback.m_bTouched = false;
            l_HintIndexCallback.m_Callback = e_Callback;
            l_HintIndexCallback.m_iIndex = e_iIndex;
            this.m_HintIndexCallbackArray[e_iIndex] = l_HintIndexCallback;
            return true;
        }
        return false;
    }
    /**
     *
     * @param e_dbTime
     */
    GetPosition(){
        return this.m_CurrentData;
    };
    TimeScale(e_ScaleRate){
        for(let i = 0;i<this.m_TimeArray.length;++i){
            this.m_TimeArray[i] *= e_ScaleRate;
        }
        this.m_LODTimeArray = this.m_TimeArray.slice(0);
        for(let i=0;i<this.m_LOD-1;++i){
            this.m_LODTimeArray = this.IncreaseLOD(this.m_LODTimeArray);
        }
    }
    MakeLODToOriginal(){
        if(this.m_LODPositionArray && this.m_PositionArray && this.m_LODPositionArray.length != this.m_PositionArray.length) {
            this.m_PositionArray = this.m_LODPositionArray.slice(0);
            this.m_TimeArray = this.m_LODTimeArray.slice(0);
            this.m_LODTimeArray = [];
            this.m_LODPositionArray = [];
            this.SetLOD(this.m_LOD);
        }
    }
    Repeat(e_RepeatTimes){
        let l_LastIndex = this.m_TimeArray.length;
        if(l_LastIndex > 1 && e_RepeatTimes > 1 ){
            let l_EndTime = this.m_TimeArray[l_LastIndex-1];
            let l_NewLastIndex = l_LastIndex*e_RepeatTimes;
            for(let i=1;i<e_RepeatTimes;++i) {
                for (let j = 0; j < l_LastIndex; ++j) {
                    this.m_PositionArray.push(this.m_PositionArray[j]);
                    this.m_TimeArray.push(this.m_TimeArray[j]+l_EndTime);
                }
                l_EndTime += l_EndTime;
            }
            this.m_LODTimeArray = [];
            this.m_LODPositionArray = [];
            this.SetLOD(this.m_LOD);
        }
    }
    AddPoint(e_vPos,e_Time){
        this.m_PositionArray.push(e_vPos);
        this.m_TimeArray.push(e_Time);
        this.m_bDataChanged = true;
    }
    // setTime(e_Time){
    //     this.m_Time = e_Time;
    // }
    SetLOD(e_iLOD:number){
        if(!this.m_bDataChanged && this.m_LOD == e_iLOD ) {
            if( this.m_LODPositionArray && this.m_PositionArray &&this.m_LODPositionArray.length == this.m_PositionArray)
                return;
        }
        this.m_LOD = e_iLOD;
        //for copy original data
        this.m_LODPositionArray = this.m_PositionArray.slice(0);
        this.m_LODTimeArray = this.m_TimeArray.slice(0);
        if(e_iLOD == 1)
            return;Array
        for(let i=0;i<e_iLOD-1;++i){
            this.m_LODPositionArray = this.IncreaseLOD(this.m_LODPositionArray);
            this.m_LODTimeArray = this.IncreaseLOD(this.m_LODTimeArray);
        }
        this.m_bDataChanged = false;
    }
    IncreaseLOD(e_Array){
        let l_OldDataArray = e_Array.slice(0);
        var l_NewArray = [];
        // keep the first point
        l_NewArray.push(l_OldDataArray[0]);
        var	l_uiSize = l_OldDataArray.length-1;
        for(let i=0;i<l_uiSize;++i)
        {
            //for data
            let l_OldDataValue1 = l_OldDataArray[i];
            let l_OldDataValue2 = l_OldDataArray[i+1];
            let l_NewData1;
            let l_NewData2;
            // average the 2 original points to create 2 new points. For each
            // CV, another 2 verts are created.
            if(l_OldDataValue1.x == undefined)
            {//for number
                l_NewData1 = 0;
                l_NewData2 = 0;
                l_NewData1 = 0.75 * l_OldDataValue1 + 0.25 * l_OldDataValue2;
                l_NewData2 = 0.25 * l_OldDataValue1 + 0.75 * l_OldDataValue2;
                //console.log("time:"+l_NewData1+","+l_NewData2);
            }else{
                //for xyz
                l_NewData1 = new THREE.Vector3();
                l_NewData2 = new THREE.Vector3();
                l_NewData1.x = 0.75 * l_OldDataValue1.x + 0.25 * l_OldDataValue2.x;
                l_NewData1.y = 0.75 * l_OldDataValue1.y + 0.25 * l_OldDataValue2.y;

                l_NewData2.x = 0.25 * l_OldDataValue1.x + 0.75 * l_OldDataValue2.x;
                l_NewData2.y = 0.25 * l_OldDataValue1.y + 0.75 * l_OldDataValue2.y;
                //for z
                if(l_OldDataValue1.z != undefined){
                    l_NewData1.z = 0.75 * l_OldDataValue1.z + 0.25 * l_OldDataValue2.z;
                    l_NewData2.z = 0.75 * l_OldDataValue1.z + 0.25 * l_OldDataValue2.z;
                }
            }
            l_NewArray.push(l_NewData1);
            l_NewArray.push(l_NewData2);
        }
        // keep the last point
        l_NewArray.push(l_OldDataArray[l_OldDataArray.length-1]);
        return l_NewArray;
    }

    UpdateTimeVectorDataIndex(e_fElpaseTime:number)
    {
        let l_Result = {Index:-1,LerpValue:0,RestTimeToNextStep:0,NextStepTimeDiff:0,EndPoint:false};
        let l_fRestTimeToNextStep = 0;
        let l_fNextStepTimeDiff = 0;
        let l_fLerpValue = 0;
        let l_iSize = this.m_LODPositionArray.length;
        if( l_iSize == 0 ) {
            return l_Result;
        }
        this.m_fPastTime += e_fElpaseTime;
        let	l_fEndTime:number = this.m_LODTimeArray[l_iSize-1];
        let l_fTime = this.m_LODTimeArray;
        if( l_iSize == 1 || l_fEndTime <= 0 )
        {
            this.m_fPastTime = l_fEndTime;
            l_Result.Index = 0;
            l_Result.EndPoint = true;
            l_Result.LerpValue = 1;
            return l_Result;
        }

        if( this.m_fPastTime >= l_fEndTime )
        {
            if( this.m_bLoop ) {

                //console.log("endTime:"+l_fEndTime+",bef:"+this.m_fPastTime+",Aft:"+this.GetFloatModulus(this.m_fPastTime, l_fEndTime));
                this.m_fPastTime = this.GetFloatModulus(this.m_fPastTime, l_fEndTime);
                this.ClearHintIndexTouched();
            }
            else
            {
                let l_iEndDataIndex = l_iSize-1;
                l_Result.LerpValue = 1;
                l_Result.EndPoint = true;
                this.m_fPastTime = l_fEndTime;
                l_Result.Index = l_iEndDataIndex;
                return l_Result;

            }
        }

        for( let i=l_iSize-1;i>-1;--i )
        {
            if( this.m_fPastTime >= this.m_LODTimeArray[i] )
            {
                let	l_iEndDataIndex:number = l_iSize-1;
                if( i != l_iEndDataIndex )
                {
                    let	l_fPreviousTime = this.m_LODTimeArray[i];
                    let	l_fTimeOverdValue = this.m_fPastTime-l_fPreviousTime;
                    let	l_fTimeGap = this.m_LODTimeArray[i+1]-l_fPreviousTime;
                    l_fRestTimeToNextStep = l_fTimeGap-l_fTimeOverdValue;
                    l_fNextStepTimeDiff = l_fTimeGap;
                    if( l_fTimeGap != 0 )
                    {
                        l_fLerpValue = l_fTimeOverdValue/l_fTimeGap;
                    }
                else
                    {
                        l_fLerpValue = 1;
                    }
                }
                else
                {
                    l_fLerpValue = 1;
                }
                l_Result.Index = i;
                l_Result.LerpValue = l_fLerpValue;
                l_Result.RestTimeToNextStep = l_fRestTimeToNextStep;
                l_Result.NextStepTimeDiff = l_fNextStepTimeDiff;
                return l_Result;
            }
        }
        //impossible
        l_Result.Index = -1;
        return l_Result;
    }
    GetFloatModulus(e_Value:number,e_DivideValue:number){
        let l_Value = e_Value%e_DivideValue;
        //let l_Resilt = e_Value-(l_Value*e_DivideValue);
        //console.log("EndTime:"+e_DivideValue+",Value:"+e_Value+"V1:"+l_Value,+"V2:"+l_Resilt);
        return l_Value;
    }

    Init()
    {
        this.m_CurrentLERP = 0;
        this.m_iCurrentWorkingIndex = 0;
        this.m_fPastTime = 0;
        this.m_bEnd = false;
        if( this.m_TimeArray.length == 0 )
        {
            this.m_iCurrentWorkingIndex = -1;
            this.m_bEnd = true;
        }
        this.SetLOD(this.m_LOD);
        if(this.m_ThreeLines){
            this.m_ThreeLines.SetLines(this.m_LODPositionArray,false);
            this.m_ThreeLines.SetHintPoint(this.m_PositionArray);
        }
    }
    Update(e_fElpaseTime:number)
    {
        if( this.m_iCurrentWorkingIndex == -1  || this.m_bEnd)
            return;
        //get current working point
        let l_Result = this.UpdateTimeVectorDataIndex(e_fElpaseTime);
        //for linear interpolation
        let l_fRestTimeToNextStep = l_Result.RestTimeToNextStep;
        let l_fNextStepTimeDiff = l_Result.NextStepTimeDiff;
        let l_fCurrentStepLerpValue = l_Result.LerpValue;
        this.m_bEnd = l_Result.EndPoint;
        this.m_iCurrentWorkingIndex = l_Result.Index;
        if( this.m_iCurrentWorkingIndex != -1 )
        {
            this.m_CurrentLERP = this.m_fPastTime/this.m_TimeArray[this.m_TimeArray.length-1];
            if( !this.m_bUpdateWithLiner || this.m_bEnd )
            {
                this.m_CurrentData = this.m_LODPositionArray[this.m_iCurrentWorkingIndex];
            }
            else
            {
                //THREE.Vector3.in
                let l_NextPoint:THREE.Vector3 = this.m_LODPositionArray[this.m_iCurrentWorkingIndex+1].clone();
                let l_CurrentPoint:THREE.Vector3 = this.m_LODPositionArray[this.m_iCurrentWorkingIndex].clone();
                let l_Dis:THREE.Vector3 = l_NextPoint.sub(l_CurrentPoint).clone();
                let l_DisLERP:THREE.Vector3 = l_Dis.multiplyScalar(l_fCurrentStepLerpValue).clone();
                let l_FinResult = l_DisLERP.add(l_CurrentPoint).clone();
                 //console.log("lerp"+l_fCurrentStepLerpValue+"next:"+l_NextPoint.x+l_NextPoint.y,",Current:"+l_CurrentPoint.x+l_CurrentPoint.y+
                   //  ",Dis:"+l_Dis.x+l_Dis.y+",Lerp:"+l_DisLERP.x+l_DisLERP.y+",Final"+l_FinResult.x+l_FinResult.y);
                this.m_CurrentData = l_FinResult;
            }
            if(this.m_HintIndexCallbackArray) {
                //this.m_HintIndexCallbackArray[e_iIndex] = { "IsTouched":false,"Callback":e_Callback };
                let l_Callback = this.m_HintIndexCallbackArray[this.m_iCurrentWorkingIndex];
                if(l_Callback && !l_Callback.m_bTouched){
                    l_Callback.m_bTouched = false;
                    l_Callback.m_CurrentPos.set(this.m_CurrentData.x,this.m_CurrentData.y,this.m_CurrentData.z);
                    l_Callback.m_Callback(l_Callback);
                }
                if(this.m_bEnd)
                    this.ClearHintIndexTouched();
            }
            //console.log("pos:"+this.m_CurrentData.x+","+this.m_CurrentData.y,+","+this.m_CurrentData.z);
        }
    }
    UpdateByGlobalTime(e_fElpaseTime:number)
    {
        if( this.m_fPastTime == e_fElpaseTime )
        {
            return;
        }
        this.Init();
        this.m_fPastTime = 0;
        this.Update(e_fElpaseTime);
    }
}
