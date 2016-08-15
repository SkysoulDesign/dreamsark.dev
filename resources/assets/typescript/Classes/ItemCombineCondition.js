"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyThreeJS_1 = require("../Plugins/Items/MyThreeJS");
var CurveAndTime_1 = require("./CurveAndTime");
var ParticleData = (function () {
    function ParticleData() {
        this.m_Velocity = new THREE.Vector3(0, 0, 0);
        this.m_LifeTime = 0;
    }
    ParticleData.prototype.AssignData = function (e_Pos, e_MinLifeTime, e_MaxLifeTime) {
        this.m_LifeTime = Math.random() * (e_MaxLifeTime - e_MinLifeTime) + e_MinLifeTime;
        this.m_Velocity.set(e_Pos.x, e_Pos.y, e_Pos.z);
    };
    return ParticleData;
}());
var MyParticle = (function (_super) {
    __extends(MyParticle, _super);
    function MyParticle(e_iTotalCount) {
        _super.call(this);
        this.m_ParticleDataArray = [];
        this.m_TotalCount = e_iTotalCount;
        this.m_AvaiableCount = 0;
        this.m_Geometry = new THREE.Geometry();
        this.m_Material = new THREE.PointsMaterial({ color: 0xFFFF88, size: 5, blending: THREE.AdditiveBlending });
        for (var p = 0; p < e_iTotalCount; p++) {
            var l_Vertex = new THREE.Vector3(0, 0, 0);
            this.m_Geometry.vertices.push(l_Vertex);
            var l_ParticleData = new ParticleData();
            this.m_ParticleDataArray.push(l_ParticleData);
        }
        // create the particle variables
        //         var pMaterial = new THREE.ParticleBasicMaterial({
        //             color: 0xFFFFFF,size: 20,
        //             map: THREE.ImageUtils.loadTexture("images/particle.png"),
        //             blending: THREE.AdditiveBlending,
        //             transparent: true
        //         });
        this.m_ParticleSystem = new THREE.Points(this.m_Geometry, this.m_Material);
        this.add(this.m_ParticleSystem);
    }
    MyParticle.prototype.emit = function (e_Count, e_Pos, e_RandomRange, e_LifeTimeMin, e_LifeTimeMax) {
        var l_RestToAdd = this.m_TotalCount - (e_Count + this.m_AvaiableCount);
        if (l_RestToAdd > 0) {
            if (e_Count > l_RestToAdd)
                e_Count = l_RestToAdd;
            var l_EndIndex = e_Count + this.m_AvaiableCount;
            for (var p = this.m_AvaiableCount; p < l_EndIndex; p++) {
                var pX = e_Pos.x + Math.random() * e_RandomRange;
                var pY = e_Pos.y + Math.random() * e_RandomRange;
                var pZ = 0;
                this.m_Geometry.vertices[p].set(pX, pY, pZ);
                var l_Negtive = 1;
                if (p % 2)
                    l_Negtive = -1;
                var l_Velocity = new THREE.Vector3(l_Negtive * Math.random(), l_Negtive * Math.random(), 0);
                //let l_Velocity = new THREE.Vector3(0,-1, 0);
                var l_ParticleData = this.m_ParticleDataArray[p];
                l_ParticleData.AssignData(l_Velocity, e_LifeTimeMin, e_LifeTimeMax);
            }
            this.m_AvaiableCount += e_Count;
        }
    };
    MyParticle.prototype.Update = function (e_ElpaseTime) {
        var l_Count = 0;
        for (var i = 0; i < this.m_TotalCount; ++i) {
        }
        while (l_Count < this.m_AvaiableCount) {
            var l_ParticleData = this.m_ParticleDataArray[l_Count];
            l_ParticleData.m_LifeTime -= e_ElpaseTime;
            var l_CurrentPos = this.m_Geometry.vertices[l_Count];
            if (l_ParticleData.m_LifeTime <= 0) {
                var l_LastParticleData = this.m_ParticleDataArray[this.m_AvaiableCount - 1];
                var l_CurrentParticleData = this.m_ParticleDataArray[l_Count];
                var l_LastPosition = this.m_Geometry.vertices[this.m_AvaiableCount - 1];
                l_CurrentPos.set(l_LastPosition.x, l_LastPosition.y, l_LastPosition.z);
                l_LastPosition.set(9999, 9999, 9999);
                l_CurrentParticleData.m_Velocity.set(l_LastParticleData.m_Velocity.x, l_LastParticleData.m_Velocity.y, l_LastParticleData.m_Velocity.z);
                l_CurrentParticleData.m_LifeTime = l_LastParticleData.m_LifeTime;
                l_LastParticleData.m_LifeTime = -1;
                --this.m_AvaiableCount;
            }
            l_ParticleData.m_Velocity.y -= Math.random() * 0.1;
            l_CurrentPos.add(l_ParticleData.m_Velocity);
            ++l_Count;
        }
        if (this.m_AvaiableCount > 0)
            this.m_ParticleSystem.geometry.verticesNeedUpdate = true;
    };
    return MyParticle;
}(THREE.Object3D));
exports.g_MyParticle = new MyParticle(1500);
var Condition = (function (_super) {
    __extends(Condition, _super);
    function Condition() {
        _super.call(this);
        this.m_bSatisfied = false;
    }
    Condition.prototype.Init = function () { this.m_bSatisfied = false; };
    Condition.prototype.IsSatisfied = function () {
        return this.m_bSatisfied;
    };
    return Condition;
}(THREE.Object3D));
var ConsitionManager = (function () {
    function ConsitionManager() {
        this.m_bLoop = false;
        this.m_CurrentWorkindex = -1;
        this.m_ConditionArray = [];
    }
    ConsitionManager.prototype.AddCondition = function (e_Condition) {
        this.m_ConditionArray.push(e_Condition);
    };
    ConsitionManager.prototype.SetLoop = function (e_bLoop) {
        this.m_bLoop = e_bLoop;
    };
    ConsitionManager.prototype.Init = function (e_Scene) {
        this.m_Scene = e_Scene;
        if (this.m_ConditionArray.length > 0) {
            this.m_CurrentWorkindex = 0;
            for (var l_CurrentCondition in this.m_ConditionArray) {
                this.m_Scene.remove(l_CurrentCondition);
            }
            var l_Object = this.m_ConditionArray[this.m_CurrentWorkindex];
            this.m_Scene.add(l_Object);
            l_Object.Init();
        }
        else
            this.m_CurrentWorkindex = -1;
    };
    ConsitionManager.prototype.Update = function (e_fElpaseTime) {
        if (this.m_CurrentWorkindex != -1) {
            var l_Object = this.m_ConditionArray[this.m_CurrentWorkindex];
            l_Object.Update(e_fElpaseTime);
            if (l_Object.IsSatisfied()) {
                this.m_Scene.remove(l_Object);
                ++this.m_CurrentWorkindex;
                if (this.m_CurrentWorkindex >= this.m_ConditionArray.length) {
                    if (!this.m_bLoop)
                        this.m_CurrentWorkindex = -1;
                    else
                        this.Init(this.m_Scene);
                }
                else {
                    l_Object = this.m_ConditionArray[this.m_CurrentWorkindex];
                    this.m_Scene.add(l_Object);
                    l_Object.Init();
                }
            }
        }
    };
    return ConsitionManager;
}());
exports.ConsitionManager = ConsitionManager;
var ObjectMovingCondition = (function (_super) {
    __extends(ObjectMovingCondition, _super);
    function ObjectMovingCondition(e_ItenFileName1, e_ItenFileName2, e_EndPoint) {
        _super.call(this);
        //this.m_MyParticleArray = [];
        //this.m_MyParticle = new MyParticle(1000);
        this.m_Object1Curve = new CurveAndTime_1.CurveAndTimeData();
        this.m_Object2Curve = new CurveAndTime_1.CurveAndTimeData();
        this.m_Object1 = new MyThreeJS_1.My2DImage(e_ItenFileName1, 30, 30, false);
        this.m_Object2 = new MyThreeJS_1.My2DImage(e_ItenFileName2, 30, 30, true);
        this.add(this.m_Object1);
        this.add(this.m_Object2);
        //this.add(this.m_MyParticle);
        //this.m_BGImage = null;
        //this.m_BGImage = new My2DImage("img/black.png",900,900,false);
        var l_CurveArray = [this.m_Object1Curve, this.m_Object2Curve];
        for (var i = 0; i < 2; ++i) {
            var l_Curve = l_CurveArray[i];
            var l_SpecialValue = 2;
            if (i == 1)
                l_SpecialValue *= -1;
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue * 0, 0, 0), 0);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue * 30, 60, 0), 0.5);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue * 60, 0, 0), 1);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue * 80, 30, 0), 1.5);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue * 100, 0, 0), 2);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue * 110, 20, 0), 2.5);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue * 120, 0, 0), 3);
            l_Curve.AddPoint(e_EndPoint, 3.5);
            l_Curve.SetLOD(5);
            l_Curve.Init();
            if (i == 0)
                l_Curve.m_bUpdateWithLiner = false;
            l_Curve.TimeScale(0.5);
            l_Curve.AddHiontIndexCallbackFunction(2, this.CallParticle.bind(this));
            l_Curve.AddHiontIndexCallbackFunction(4, this.CallParticle.bind(this));
            l_Curve.AddHiontIndexCallbackFunction(6, this.CallParticle.bind(this));
        }
    }
    ObjectMovingCondition.prototype.CallParticle = function (e_HintIndexCallback) {
        //this.m_MyParticle.emit(15,e_HintIndexCallback.m_CurrentPos,15,1,3);
        exports.g_MyParticle.emit(15, e_HintIndexCallback.m_CurrentPos, 15, 1, 3);
    };
    ObjectMovingCondition.prototype.Init = function () {
        _super.prototype.Init.call(this);
        var l_CurveArray = [this.m_Object1Curve, this.m_Object2Curve];
        var l_ObjectArray = [this.m_Object1, this.m_Object2];
        for (var i = 0; i < 2; ++i) {
            l_CurveArray[i].Init();
        }
    };
    ObjectMovingCondition.prototype.Update = function (e_fElpaseTime) {
        var l_CurveArray = [this.m_Object1Curve, this.m_Object2Curve];
        var l_ObjectArray = [this.m_Object1, this.m_Object2];
        for (var i = 0; i < 2; ++i) {
            l_CurveArray[i].Update(e_fElpaseTime);
            var l_Pos = l_CurveArray[i].GetPosition();
            if (l_ObjectArray[i])
                l_ObjectArray[i].position.set(l_Pos.x, l_Pos.y, l_Pos.z);
            if (l_CurveArray[i].m_bEnd) {
                this.m_bSatisfied = true;
            }
        }
        //if(this.m_MyParticle)
        //  this.m_MyParticle.Update(e_fElpaseTime);
    };
    ObjectMovingCondition.prototype.IsSatisfied = function () {
        return this.m_bSatisfied;
    };
    return ObjectMovingCondition;
}(Condition));
exports.ObjectMovingCondition = ObjectMovingCondition;
var RotationCondition = (function (_super) {
    __extends(RotationCondition, _super);
    function RotationCondition(e_ItemFileNameArray) {
        _super.call(this);
        this.m_CurrentTime = 0;
        this.m_ObjectArray = [];
        this.m_ObjectCurveArray = [];
        this.m_ToOriginalTime = 5;
        //this.m_FireImage = new My2DImage("/img/white",1,1,false);
        this.m_FireImage = new MyThreeJS_1.My2DImage("/img/temp/white.png", 1, 1, false);
        this.add(this.m_FireImage);
        this.m_ScaleCurve = new CurveAndTime_1.CurveAndTimeData();
        var l_ScaleRate = 3;
        this.m_ScaleCurve.AddPoint(new THREE.Vector3(0.6 * l_ScaleRate, 1 * l_ScaleRate, 1), 0);
        this.m_ScaleCurve.AddPoint(new THREE.Vector3(1.5 * l_ScaleRate, 1.5 * l_ScaleRate, 1.5), 1);
        this.m_ScaleCurve.AddPoint(new THREE.Vector3(0.6 * l_ScaleRate, 1 * l_ScaleRate, 1), 1.5);
        this.m_ScaleCurve.Repeat(3);
        this.m_ScaleCurve.AddPoint(new THREE.Vector3(0.1, 1, 1), 5);
        for (var i = 0; i < e_ItemFileNameArray.length; ++i) {
            var l_My2DImage = new MyThreeJS_1.My2DImage(e_ItemFileNameArray[i], 100, 100, true);
            var l_Curve = new CurveAndTime_1.CurveAndTimeData();
            this.m_ObjectArray.push(l_My2DImage);
            this.add(l_My2DImage);
            this.m_ObjectCurveArray.push(l_Curve);
            if (i < 2) {
                var l_DisScale = 1;
                if (i == 0)
                    l_DisScale *= -1;
                l_Curve.AddPoint(new THREE.Vector3(0 * l_DisScale, 0, 0), 0);
                l_Curve.AddPoint(new THREE.Vector3(120 * l_DisScale, 0, 0), 0.5);
                l_Curve.AddPoint(new THREE.Vector3(0 * l_DisScale, 0, 0), this.m_ToOriginalTime);
            }
            else {
                var l_DisScale = 0.3;
                l_Curve.AddPoint(new THREE.Vector3(0, 0 * l_DisScale, 0), 0);
                l_Curve.AddPoint(new THREE.Vector3(0, 30 * l_DisScale, 0), 0.3);
                l_Curve.AddPoint(new THREE.Vector3(0, 0 * l_DisScale, 0), 0.6);
                l_Curve.AddPoint(new THREE.Vector3(0, -30 * l_DisScale, 0), 0.9);
                l_Curve.AddPoint(new THREE.Vector3(0, 0 * l_DisScale, 0), 1.2);
                l_Curve.Repeat(3);
                l_Curve.AddPoint(new THREE.Vector3(0, 0, 0), this.m_ToOriginalTime);
                l_Curve.SetLOD(3);
                l_Curve.m_bUpdateWithLiner = false;
            }
        }
    }
    RotationCondition.prototype.Init = function () {
        _super.prototype.Init.call(this);
        this.m_CurrentTime = 0;
        for (var i = 0; i < this.m_ObjectCurveArray.length; ++i) {
            this.m_ObjectCurveArray[i].Init();
            this.m_ObjectArray[i].scale.set(1, 1, 1);
        }
        this.m_ScaleCurve.Init();
        this.m_FireImage.scale.set(0, 0, 0);
    };
    RotationCondition.prototype.Update = function (e_fElpaseTime) {
        this.m_CurrentTime += e_fElpaseTime * 10;
        //console.log(l_YPos);
        //console.log(l_ZPos);
        if (this.m_ScaleCurve) {
            this.m_ScaleCurve.Update(e_fElpaseTime);
            var l_Scale = this.m_ScaleCurve.GetPosition();
            var l_CenterObject = this.m_ObjectArray[2];
            l_CenterObject.scale.set(l_Scale.x, l_Scale.y, 1);
            var l_TargetLERP = 0.6;
            //console.log(this.m_ScaleCurve.m_CurrentLERP);
            var l_OverThousholdValue = this.m_ScaleCurve.m_CurrentLERP - l_TargetLERP;
            if (l_OverThousholdValue > 0) {
                var l_RestLerpValue = 1 - l_TargetLERP;
                var l_LERP = l_OverThousholdValue / l_RestLerpValue;
                var l_GugeNumber = 100;
                this.m_FireImage.scale.set(l_GugeNumber * l_LERP, l_GugeNumber * l_LERP, l_GugeNumber * l_LERP);
                this.m_FireImage.position.set(0, 0, -l_LERP * l_GugeNumber);
                this.m_FireImage.SetColor(0xffffff, l_LERP);
            }
        }
        for (var i = 0; i < this.m_ObjectCurveArray.length; ++i) {
            var l_Curve = this.m_ObjectCurveArray[i];
            l_Curve.Update(e_fElpaseTime);
            var l_Pos = l_Curve.GetPosition();
            var l_MyImage = this.m_ObjectArray[i];
            if (i < 2) {
                var l_XPos = Math.sin(this.m_CurrentTime) * l_Pos.x;
                var l_ZPos = Math.cos(this.m_CurrentTime) * l_Pos.x;
                l_MyImage.position.set(l_XPos, 0, l_ZPos);
            }
            else {
                exports.g_MyParticle.emit(5, l_MyImage.position, 1, 1, 3);
                l_MyImage.position.set(l_Pos.x, l_Pos.y, l_Pos.z);
                l_MyImage.rotateY(this.m_CurrentTime * e_fElpaseTime);
            }
            if (l_Curve.m_bEnd) {
                this.m_bSatisfied = true;
            }
        }
        //Math.sin();
    };
    return RotationCondition;
}(Condition));
exports.RotationCondition = RotationCondition;
var ShowResultCondition = (function (_super) {
    __extends(ShowResultCondition, _super);
    function ShowResultCondition(e_FinalImageName) {
        _super.call(this);
        this.m_Image = new MyThreeJS_1.My2DImage(e_FinalImageName, 100, 100, true);
        this.add(this.m_Image);
        this.m_Curve = new CurveAndTime_1.CurveAndTimeData();
        this.m_Curve.AddPoint(new THREE.Vector3(0, 0, 0), 0);
        this.m_Curve.AddPoint(new THREE.Vector3(5, 5, 5), 3);
        this.m_Curve.AddPoint(new THREE.Vector3(5, 5, 5), 5);
    }
    ShowResultCondition.prototype.Init = function () {
        _super.prototype.Init.call(this);
        this.m_Curve.Init();
        this.m_Image.scale.set(0, 0, 0);
    };
    ShowResultCondition.prototype.Update = function (e_fElpaseTime) {
        this.m_Curve.Update(e_fElpaseTime);
        var l_Pos = this.m_Curve.GetPosition();
        this.m_Image.scale.set(l_Pos.x, l_Pos.y, l_Pos.z);
        if (this.m_Curve.m_bEnd) {
            this.m_bSatisfied = true;
        }
    };
    return ShowResultCondition;
}(Condition));
exports.ShowResultCondition = ShowResultCondition;
//# sourceMappingURL=ItemCombineCondition.js.map