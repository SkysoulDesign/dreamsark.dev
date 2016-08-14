//author cloud
"use strict";
var ThreeLines = (function () {
    function ThreeLines() {
        this.m_Line = null;
        this.m_LineGeometry = new THREE.Geometry();
        this.m_LineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
        this.m_PointGeometry = new THREE.Geometry();
        this.m_PointsMaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0xff0000 });
        this.m_TextMaterial = null; //new THREE.MeshPhongMaterial({color:0x888800});
        this.m_TextArray = [];
    }
    ThreeLines.prototype.SetHintPoint = function (e_PointsArray) {
        this.m_PointGeometry.vertices = [];
        for (var i = 0; i < this.m_TextArray.length; ++i) {
            var l_Mesh = this.m_TextArray[i];
            if (l_Mesh.parent)
                l_Mesh.parent.remove(l_Mesh);
        }
        this.m_TextArray = [];
        if (e_PointsArray && e_PointsArray.length) {
            var l_Length = e_PointsArray.length;
            for (var i = 0; i < l_Length; ++i) {
                var l_Pos = e_PointsArray[i];
                this.m_PointGeometry.vertices.push(l_Pos);
                if (this.m_TextMaterial) {
                    var l_TextGeo = new THREE.TextGeometry(i.toString());
                    var l_TextMesh = new THREE.Mesh(l_TextGeo, this.m_TextMaterial);
                    l_TextMesh.position.set(l_Pos.x, l_Pos.y, l_Pos.z);
                    this.m_TextArray.push(l_TextMesh);
                }
            }
            this.m_Points = new THREE.Points(this.m_PointGeometry, this.m_PointsMaterial);
        }
    };
    ThreeLines.prototype.SetLines = function (e_PointsArray, e_bAddToPoints) {
        this.m_LineGeometry.vertices = [];
        if (e_bAddToPoints)
            this.m_PointGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
        if (e_PointsArray && e_PointsArray.length) {
            var l_Length = e_PointsArray.length;
            for (var i = 0; i < l_Length; ++i) {
                var l_Pos = e_PointsArray[i];
                this.m_LineGeometry.vertices.push(l_Pos);
            }
            this.m_Line = new THREE.Line(this.m_LineGeometry, this.m_LineMaterial);
            if (e_bAddToPoints) {
                this.m_Points = new THREE.Points(this.m_LineGeometry, this.m_PointsMaterial);
            }
        }
    };
    ThreeLines.prototype.BindScene = function (e_Scene) {
        e_Scene.add(this.m_Line);
        e_Scene.add(this.m_Points);
        for (var i = 0; i < this.m_TextArray.length; ++i) {
            var l_Mesh = this.m_TextArray[i];
            e_Scene.add(l_Mesh);
        }
    };
    ThreeLines.prototype.unBinedScene = function (e_Scene) {
        e_Scene.remove(this.m_Line);
        e_Scene.remove(this.m_Points);
        for (var i = 0; i < this.m_TextArray.length; ++i) {
            var l_Mesh = this.m_TextArray[i];
            e_Scene.remov(l_Mesh);
        }
    };
    return ThreeLines;
}());
exports.ThreeLines = ThreeLines;
var HintIndexCallback = (function () {
    function HintIndexCallback() {
        this.m_iIndex = -1;
        this.m_Callback = null;
        this.m_bTouched = false;
        this.m_CurrentPos = new THREE.Vector3(0, 0, 0);
    }
    return HintIndexCallback;
}());
exports.HintIndexCallback = HintIndexCallback;
var CurveAndTimeData = (function () {
    function CurveAndTimeData() {
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
    CurveAndTimeData.prototype.ClearHintIndexTouched = function () {
        for (var l_Data in this.m_HintIndexCallbackArray) {
            var l_HintIndexCallbackArray = this.m_HintIndexCallbackArray[l_Data];
            l_HintIndexCallbackArray.m_bTouched = false;
        }
    };
    CurveAndTimeData.prototype.AddHiontIndexCallbackFunction = function (e_iIndex, e_Callback) {
        if (this.m_LOD != 1) {
            if (this.m_LODPositionArray) {
                var l_Rate = this.m_LODPositionArray.length / this.m_PositionArray.length;
                e_iIndex *= l_Rate;
                e_iIndex = Math.round(e_iIndex);
            }
        }
        if (this.m_HintIndexCallbackArray && !this.m_HintIndexCallbackArray[e_iIndex]) {
            var l_HintIndexCallback = new HintIndexCallback();
            l_HintIndexCallback.m_bTouched = false;
            l_HintIndexCallback.m_Callback = e_Callback;
            l_HintIndexCallback.m_iIndex = e_iIndex;
            this.m_HintIndexCallbackArray[e_iIndex] = l_HintIndexCallback;
            return true;
        }
        return false;
    };
    /**
     *
     * @param e_dbTime
     */
    CurveAndTimeData.prototype.GetPosition = function () {
        return this.m_CurrentData;
    };
    ;
    CurveAndTimeData.prototype.TimeScale = function (e_ScaleRate) {
        for (var i = 0; i < this.m_TimeArray.length; ++i) {
            this.m_TimeArray[i] *= e_ScaleRate;
        }
        this.m_LODTimeArray = this.m_TimeArray.slice(0);
        for (var i = 0; i < this.m_LOD - 1; ++i) {
            this.m_LODTimeArray = this.IncreaseLOD(this.m_LODTimeArray);
        }
    };
    CurveAndTimeData.prototype.MakeLODToOriginal = function () {
        if (this.m_LODPositionArray && this.m_PositionArray && this.m_LODPositionArray.length != this.m_PositionArray.length) {
            this.m_PositionArray = this.m_LODPositionArray.slice(0);
            this.m_TimeArray = this.m_LODTimeArray.slice(0);
            this.m_LODTimeArray = [];
            this.m_LODPositionArray = [];
            this.SetLOD(this.m_LOD);
        }
    };
    CurveAndTimeData.prototype.Repeat = function (e_RepeatTimes) {
        var l_LastIndex = this.m_TimeArray.length;
        if (l_LastIndex > 1 && e_RepeatTimes > 1) {
            var l_EndTime = this.m_TimeArray[l_LastIndex - 1];
            var l_NewLastIndex = l_LastIndex * e_RepeatTimes;
            for (var i = 1; i < e_RepeatTimes; ++i) {
                for (var j = 0; j < l_LastIndex; ++j) {
                    this.m_PositionArray.push(this.m_PositionArray[j]);
                    this.m_TimeArray.push(this.m_TimeArray[j] + l_EndTime);
                }
                l_EndTime += l_EndTime;
            }
            this.m_LODTimeArray = [];
            this.m_LODPositionArray = [];
            this.SetLOD(this.m_LOD);
        }
    };
    CurveAndTimeData.prototype.AddPoint = function (e_vPos, e_Time) {
        this.m_PositionArray.push(e_vPos);
        this.m_TimeArray.push(e_Time);
        this.m_bDataChanged = true;
    };
    // setTime(e_Time){
    //     this.m_Time = e_Time;
    // }
    CurveAndTimeData.prototype.SetLOD = function (e_iLOD) {
        if (!this.m_bDataChanged && this.m_LOD == e_iLOD) {
            if (this.m_LODPositionArray && this.m_PositionArray && this.m_LODPositionArray.length == this.m_PositionArray)
                return;
        }
        this.m_LOD = e_iLOD;
        //for copy original data
        this.m_LODPositionArray = this.m_PositionArray.slice(0);
        this.m_LODTimeArray = this.m_TimeArray.slice(0);
        if (e_iLOD == 1)
            return;
        Array;
        for (var i = 0; i < e_iLOD - 1; ++i) {
            this.m_LODPositionArray = this.IncreaseLOD(this.m_LODPositionArray);
            this.m_LODTimeArray = this.IncreaseLOD(this.m_LODTimeArray);
        }
        this.m_bDataChanged = false;
    };
    CurveAndTimeData.prototype.IncreaseLOD = function (e_Array) {
        var l_OldDataArray = e_Array.slice(0);
        var l_NewArray = [];
        // keep the first point
        l_NewArray.push(l_OldDataArray[0]);
        var l_uiSize = l_OldDataArray.length - 1;
        for (var i = 0; i < l_uiSize; ++i) {
            //for data
            var l_OldDataValue1 = l_OldDataArray[i];
            var l_OldDataValue2 = l_OldDataArray[i + 1];
            var l_NewData1 = void 0;
            var l_NewData2 = void 0;
            // average the 2 original points to create 2 new points. For each
            // CV, another 2 verts are created.
            if (l_OldDataValue1.x == undefined) {
                l_NewData1 = 0;
                l_NewData2 = 0;
                l_NewData1 = 0.75 * l_OldDataValue1 + 0.25 * l_OldDataValue2;
                l_NewData2 = 0.25 * l_OldDataValue1 + 0.75 * l_OldDataValue2;
            }
            else {
                //for xyz
                l_NewData1 = new THREE.Vector3();
                l_NewData2 = new THREE.Vector3();
                l_NewData1.x = 0.75 * l_OldDataValue1.x + 0.25 * l_OldDataValue2.x;
                l_NewData1.y = 0.75 * l_OldDataValue1.y + 0.25 * l_OldDataValue2.y;
                l_NewData2.x = 0.25 * l_OldDataValue1.x + 0.75 * l_OldDataValue2.x;
                l_NewData2.y = 0.25 * l_OldDataValue1.y + 0.75 * l_OldDataValue2.y;
                //for z
                if (l_OldDataValue1.z != undefined) {
                    l_NewData1.z = 0.75 * l_OldDataValue1.z + 0.25 * l_OldDataValue2.z;
                    l_NewData2.z = 0.75 * l_OldDataValue1.z + 0.25 * l_OldDataValue2.z;
                }
            }
            l_NewArray.push(l_NewData1);
            l_NewArray.push(l_NewData2);
        }
        // keep the last point
        l_NewArray.push(l_OldDataArray[l_OldDataArray.length - 1]);
        return l_NewArray;
    };
    CurveAndTimeData.prototype.UpdateTimeVectorDataIndex = function (e_fElpaseTime) {
        var l_Result = { Index: -1, LerpValue: 0, RestTimeToNextStep: 0, NextStepTimeDiff: 0, EndPoint: false };
        var l_fRestTimeToNextStep = 0;
        var l_fNextStepTimeDiff = 0;
        var l_fLerpValue = 0;
        var l_iSize = this.m_LODPositionArray.length;
        if (l_iSize == 0) {
            return l_Result;
        }
        this.m_fPastTime += e_fElpaseTime;
        var l_fEndTime = this.m_LODTimeArray[l_iSize - 1];
        var l_fTime = this.m_LODTimeArray;
        if (l_iSize == 1 || l_fEndTime <= 0) {
            this.m_fPastTime = l_fEndTime;
            l_Result.Index = 0;
            l_Result.EndPoint = true;
            l_Result.LerpValue = 1;
            return l_Result;
        }
        if (this.m_fPastTime >= l_fEndTime) {
            if (this.m_bLoop) {
                //console.log("endTime:"+l_fEndTime+",bef:"+this.m_fPastTime+",Aft:"+this.GetFloatModulus(this.m_fPastTime, l_fEndTime));
                this.m_fPastTime = this.GetFloatModulus(this.m_fPastTime, l_fEndTime);
                this.ClearHintIndexTouched();
            }
            else {
                var l_iEndDataIndex = l_iSize - 1;
                l_Result.LerpValue = 1;
                l_Result.EndPoint = true;
                this.m_fPastTime = l_fEndTime;
                l_Result.Index = l_iEndDataIndex;
                return l_Result;
            }
        }
        for (var i = l_iSize - 1; i > -1; --i) {
            if (this.m_fPastTime >= this.m_LODTimeArray[i]) {
                var l_iEndDataIndex = l_iSize - 1;
                if (i != l_iEndDataIndex) {
                    var l_fPreviousTime = this.m_LODTimeArray[i];
                    var l_fTimeOverdValue = this.m_fPastTime - l_fPreviousTime;
                    var l_fTimeGap = this.m_LODTimeArray[i + 1] - l_fPreviousTime;
                    l_fRestTimeToNextStep = l_fTimeGap - l_fTimeOverdValue;
                    l_fNextStepTimeDiff = l_fTimeGap;
                    if (l_fTimeGap != 0) {
                        l_fLerpValue = l_fTimeOverdValue / l_fTimeGap;
                    }
                    else {
                        l_fLerpValue = 1;
                    }
                }
                else {
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
    };
    CurveAndTimeData.prototype.GetFloatModulus = function (e_Value, e_DivideValue) {
        var l_Value = e_Value % e_DivideValue;
        //let l_Resilt = e_Value-(l_Value*e_DivideValue);
        //console.log("EndTime:"+e_DivideValue+",Value:"+e_Value+"V1:"+l_Value,+"V2:"+l_Resilt);
        return l_Value;
    };
    CurveAndTimeData.prototype.Init = function () {
        this.m_CurrentLERP = 0;
        this.m_iCurrentWorkingIndex = 0;
        this.m_fPastTime = 0;
        this.m_bEnd = false;
        if (this.m_TimeArray.length == 0) {
            this.m_iCurrentWorkingIndex = -1;
            this.m_bEnd = true;
        }
        this.SetLOD(this.m_LOD);
        if (this.m_ThreeLines) {
            this.m_ThreeLines.SetLines(this.m_LODPositionArray, false);
            this.m_ThreeLines.SetHintPoint(this.m_PositionArray);
        }
    };
    CurveAndTimeData.prototype.Update = function (e_fElpaseTime) {
        if (this.m_iCurrentWorkingIndex == -1 || this.m_bEnd)
            return;
        //get current working point
        var l_Result = this.UpdateTimeVectorDataIndex(e_fElpaseTime);
        //for linear interpolation
        var l_fRestTimeToNextStep = l_Result.RestTimeToNextStep;
        var l_fNextStepTimeDiff = l_Result.NextStepTimeDiff;
        var l_fCurrentStepLerpValue = l_Result.LerpValue;
        this.m_bEnd = l_Result.EndPoint;
        this.m_iCurrentWorkingIndex = l_Result.Index;
        if (this.m_iCurrentWorkingIndex != -1) {
            this.m_CurrentLERP = this.m_fPastTime / this.m_TimeArray[this.m_TimeArray.length - 1];
            if (!this.m_bUpdateWithLiner || this.m_bEnd) {
                this.m_CurrentData = this.m_LODPositionArray[this.m_iCurrentWorkingIndex];
            }
            else {
                //THREE.Vector3.in
                var l_NextPoint = this.m_LODPositionArray[this.m_iCurrentWorkingIndex + 1].clone();
                var l_CurrentPoint = this.m_LODPositionArray[this.m_iCurrentWorkingIndex].clone();
                var l_Dis = l_NextPoint.sub(l_CurrentPoint).clone();
                var l_DisLERP = l_Dis.multiplyScalar(l_fCurrentStepLerpValue).clone();
                var l_FinResult = l_DisLERP.add(l_CurrentPoint).clone();
                //console.log("lerp"+l_fCurrentStepLerpValue+"next:"+l_NextPoint.x+l_NextPoint.y,",Current:"+l_CurrentPoint.x+l_CurrentPoint.y+
                //  ",Dis:"+l_Dis.x+l_Dis.y+",Lerp:"+l_DisLERP.x+l_DisLERP.y+",Final"+l_FinResult.x+l_FinResult.y);
                this.m_CurrentData = l_FinResult;
            }
            if (this.m_HintIndexCallbackArray) {
                //this.m_HintIndexCallbackArray[e_iIndex] = { "IsTouched":false,"Callback":e_Callback };
                var l_Callback = this.m_HintIndexCallbackArray[this.m_iCurrentWorkingIndex];
                if (l_Callback && !l_Callback.m_bTouched) {
                    l_Callback.m_bTouched = false;
                    l_Callback.m_CurrentPos.set(this.m_CurrentData.x, this.m_CurrentData.y, this.m_CurrentData.z);
                    l_Callback.m_Callback(l_Callback);
                }
                if (this.m_bEnd)
                    this.ClearHintIndexTouched();
            }
        }
    };
    CurveAndTimeData.prototype.UpdateByGlobalTime = function (e_fElpaseTime) {
        if (this.m_fPastTime == e_fElpaseTime) {
            return;
        }
        this.Init();
        this.m_fPastTime = 0;
        this.Update(e_fElpaseTime);
    };
    return CurveAndTimeData;
}());
exports.CurveAndTimeData = CurveAndTimeData;
//# sourceMappingURL=CurveAndTime.js.map