

import {My2DImage} from "../Plugins/Items/MyThreeJS";
import {CurveAndTimeData, HintIndexCallback} from "./CurveAndTime";

class ParticleData{
    public m_Velocity:THREE.Vector3;
    public m_LifeTime:number;
    constructor(){
        this.m_Velocity = new THREE.Vector3(0,0,0);
        this.m_LifeTime = 0;
    }
    AssignData(e_Pos:THREE.Vector3,e_MinLifeTime:number,e_MaxLifeTime:number){
        this.m_LifeTime = Math.random()*(e_MaxLifeTime-e_MinLifeTime)+e_MinLifeTime;
        this.m_Velocity.set(e_Pos.x,e_Pos.y,e_Pos.z);
    }
}

class MyParticle extends THREE.Object3D {
    private m_Geometry: THREE.Geometry;
    private m_Material: THREE.ParticleBasicMaterial;
    private m_ParticleSystem:THREE.Points;
    private m_TotalCount;
    public m_AvaiableCount;
    private m_ParticleDataArray:ParticleData[];
    constructor(e_iTotalCount) {
        super();
        this.m_ParticleDataArray = [];
        this.m_TotalCount = e_iTotalCount;
        this.m_AvaiableCount = 0;
        this.m_Geometry = new THREE.Geometry();
        this.m_Material = new THREE.PointsMaterial({color: 0xFFFF88, size: 5,blending: THREE.AdditiveBlending});

        for (let p = 0; p < e_iTotalCount; p++) {
            var l_Vertex = new THREE.Vector3(0, 0, 0);
            this.m_Geometry.vertices.push(l_Vertex);
            let l_ParticleData:ParticleData = new ParticleData();
            this.m_ParticleDataArray.push(l_ParticleData);
        }
// create the particle variables
//         var pMaterial = new THREE.ParticleBasicMaterial({
//             color: 0xFFFFFF,size: 20,
//             map: THREE.ImageUtils.loadTexture("images/particle.png"),
//             blending: THREE.AdditiveBlending,
//             transparent: true
//         });
        this.m_ParticleSystem = new THREE.Points(this.m_Geometry,this.m_Material);
        this.add(this.m_ParticleSystem);
    }
    emit(e_Count,e_Pos,e_RandomRange,e_LifeTimeMin,e_LifeTimeMax){
        let l_RestToAdd = this.m_TotalCount-(e_Count+this.m_AvaiableCount);
        if(l_RestToAdd > 0) {
            if(e_Count > l_RestToAdd)
                e_Count = l_RestToAdd;
            let l_EndIndex = e_Count+this.m_AvaiableCount;
            for (let p = this.m_AvaiableCount; p < l_EndIndex; p++) {
                let pX = e_Pos.x+Math.random()*e_RandomRange;
                let pY = e_Pos.y+Math.random()*e_RandomRange;
                let pZ = 0;
                this.m_Geometry.vertices[p].set(pX, pY, pZ);
                let l_Negtive = 1;
                if (p % 2)
                    l_Negtive = -1;
                let l_Velocity = new THREE.Vector3(l_Negtive * Math.random(), l_Negtive * Math.random(), 0);
                //let l_Velocity = new THREE.Vector3(0,-1, 0);
                let l_ParticleData: ParticleData = this.m_ParticleDataArray[p];
                l_ParticleData.AssignData(l_Velocity,e_LifeTimeMin,e_LifeTimeMax);
            }
            this.m_AvaiableCount += e_Count;
        }
    }
    Update(e_ElpaseTime){
        let l_Count = 0;
        for(let i=0;i<this.m_TotalCount;++i){
            //let l_CurrentPos:THREE.Vector3 = this.m_Geometry.vertices[l_Count];
            //l_CurrentPos.set(i*3,0,0);
            //this.m_Geometry.vertices[i].set(i*3,i,0);
        }
        while ( l_Count < this.m_AvaiableCount) {
            let l_ParticleData:ParticleData = this.m_ParticleDataArray[l_Count];
            l_ParticleData.m_LifeTime -= e_ElpaseTime;
            let l_CurrentPos:THREE.Vector3 = this.m_Geometry.vertices[l_Count];
            if(l_ParticleData.m_LifeTime <= 0){
                let l_LastParticleData = this.m_ParticleDataArray[this.m_AvaiableCount-1];
                let l_CurrentParticleData = this.m_ParticleDataArray[l_Count];
                let l_LastPosition = this.m_Geometry.vertices[this.m_AvaiableCount-1];
                l_CurrentPos.set(l_LastPosition.x,l_LastPosition.y,l_LastPosition.z);
                l_LastPosition.set(9999,9999,9999);
                l_CurrentParticleData.m_Velocity.set(l_LastParticleData.m_Velocity.x,l_LastParticleData.m_Velocity.y,l_LastParticleData.m_Velocity.z);
                l_CurrentParticleData.m_LifeTime = l_LastParticleData.m_LifeTime;
                l_LastParticleData.m_LifeTime = -1;
                 --this.m_AvaiableCount;
            }
            l_ParticleData.m_Velocity.y -= Math.random() * 0.1;
            l_CurrentPos.add(l_ParticleData.m_Velocity);
            ++l_Count;
        }
        if(this.m_AvaiableCount > 0)
            this.m_ParticleSystem.geometry.verticesNeedUpdate = true;
    }
}

export var g_MyParticle = new MyParticle(1500);

abstract class Condition extends THREE.Object3D{
    protected   m_bSatisfied;
    constructor(){
        super();
        this.m_bSatisfied = false;
    }
    Init():void{ this.m_bSatisfied = false; }
    abstract Update(e_fElpaseTime):void;
    IsSatisfied(){
        return this.m_bSatisfied;
    }
}

export class ConsitionManager{
    private m_ConditionArray:Condition[];
    private m_CurrentWorkindex:number;
    private m_bLoop:boolean;
    private m_Scene:THREE.Scene;
    constructor(){
        this.m_bLoop = false;
        this.m_CurrentWorkindex = -1;
        this.m_ConditionArray = [];
    }
    AddCondition(e_Condition):void{
        this.m_ConditionArray.push(e_Condition);
    }
    SetLoop(e_bLoop){
        this.m_bLoop = e_bLoop;
    }
    Init(e_Scene):void{
        this.m_Scene = e_Scene;
        if(this.m_ConditionArray.length>0) {
            this.m_CurrentWorkindex = 0;
            for(let l_CurrentCondition in this.m_ConditionArray){
                this.m_Scene.remove(l_CurrentCondition);
            }
            let l_Object:Condition = this.m_ConditionArray[this.m_CurrentWorkindex];
            this.m_Scene.add(l_Object);
            l_Object.Init();
        }
        else
            this.m_CurrentWorkindex = -1;
    }
    Update(e_fElpaseTime){
        if( this.m_CurrentWorkindex != -1 ) {
            let l_Object:Condition = this.m_ConditionArray[this.m_CurrentWorkindex];
            l_Object.Update(e_fElpaseTime);
            if(l_Object.IsSatisfied()){
                this.m_Scene.remove(l_Object);
                ++this.m_CurrentWorkindex;
                if(this.m_CurrentWorkindex>=this.m_ConditionArray.length) {
                    if (!this.m_bLoop)
                        this.m_CurrentWorkindex = -1;
                    else
                        this.Init(this.m_Scene);
                }else{
                    l_Object = this.m_ConditionArray[this.m_CurrentWorkindex];
                    this.m_Scene.add(l_Object);
                    l_Object.Init();
                }
            }
        }
    }
}

export class ObjectMovingCondition extends Condition{
    private m_Object1:My2DImage;
    private m_Object2:My2DImage;
    private m_BGImage:My2DImage;
    private m_Object1Curve:CurveAndTimeData;
    private m_Object2Curve:CurveAndTimeData;
    //private m_MyParticleArray:MyParticle[];
    private m_MyParticle:MyParticle;
    constructor(e_ItenFileName1,e_ItenFileName2,e_EndPoint){
        super();
        //this.m_MyParticleArray = [];
        //this.m_MyParticle = new MyParticle(1000);
        this.m_Object1Curve = new CurveAndTimeData();
        this.m_Object2Curve = new CurveAndTimeData();
        this.m_Object1 = new My2DImage(e_ItenFileName1,30,30,false);
        this.m_Object2 = new My2DImage(e_ItenFileName2,30,30,true);
        this.add(this.m_Object1);
        this.add(this.m_Object2);
        //this.add(this.m_MyParticle);
        //this.m_BGImage = null;
        //this.m_BGImage = new My2DImage("img/black.png",900,900,false);
        let l_CurveArray = [this.m_Object1Curve,this.m_Object2Curve];
        for(let i=0;i<2;++i) {
            let l_Curve:CurveAndTimeData = l_CurveArray[i];
            let l_SpecialValue = 2;
            if(i==1)
                l_SpecialValue *= -1;
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue*0, 0, 0), 0);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue*30, 60, 0), 0.5);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue*60, 0, 0), 1);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue*80, 30, 0), 1.5);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue*100, 0, 0), 2);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue*110, 20, 0), 2.5);
            l_Curve.AddPoint(new THREE.Vector3(l_SpecialValue*120, 0, 0), 3);
            l_Curve.AddPoint(e_EndPoint, 3.5);
            l_Curve.SetLOD(5);
            l_Curve.Init();
            if(i==0)
                l_Curve.m_bUpdateWithLiner = false;
            l_Curve.TimeScale(0.5);
            l_Curve.AddHiontIndexCallbackFunction(2,this.CallParticle.bind(this));
            l_Curve.AddHiontIndexCallbackFunction(4,this.CallParticle.bind(this));
            l_Curve.AddHiontIndexCallbackFunction(6,this.CallParticle.bind(this));
        }
    }
    CallParticle(e_HintIndexCallback:HintIndexCallback){
        //this.m_MyParticle.emit(15,e_HintIndexCallback.m_CurrentPos,15,1,3);
        g_MyParticle.emit(15,e_HintIndexCallback.m_CurrentPos,15,1,3);
    }
    Init():void{
        super.Init();
        let l_CurveArray = [this.m_Object1Curve,this.m_Object2Curve];
        let l_ObjectArray = [this.m_Object1,this.m_Object2];
        for(let i=0;i<2;++i) {
            l_CurveArray[i].Init();
        }
    }
    Update(e_fElpaseTime):void{
        let l_CurveArray = [this.m_Object1Curve,this.m_Object2Curve];
        let l_ObjectArray = [this.m_Object1,this.m_Object2];
        for(let i=0;i<2;++i) {
            l_CurveArray[i].Update(e_fElpaseTime);
            var l_Pos = l_CurveArray[i].GetPosition();
            if(l_ObjectArray[i])
                l_ObjectArray[i].position.set(l_Pos.x,l_Pos.y,l_Pos.z);
            if(l_CurveArray[i].m_bEnd){
                this.m_bSatisfied = true;
            }
        }
        //if(this.m_MyParticle)
          //  this.m_MyParticle.Update(e_fElpaseTime);
    }
    IsSatisfied(){
        return this.m_bSatisfied;
    }
}

export class RotationCondition extends Condition{
    private m_ObjectArray:My2DImage[];
    private m_ObjectCurveArray:CurveAndTimeData[];
    private m_ScaleCurve:CurveAndTimeData;
    private m_ToOriginalTime:number;
    private m_CurrentTime:number;
    private m_FireImage:My2DImage;
    constructor(e_ItemFileNameArray){
        super();
        this.m_CurrentTime = 0;
        this.m_ObjectArray = [];
        this.m_ObjectCurveArray = [];
        this.m_ToOriginalTime = 5;
        //this.m_FireImage = new My2DImage("/img/white",1,1,false);
        this.m_FireImage = new My2DImage("/img/temp/white.png",1,1,false);
        this.add(this.m_FireImage);
        this.m_ScaleCurve = new CurveAndTimeData();
        let l_ScaleRate = 3;
        this.m_ScaleCurve.AddPoint(new THREE.Vector3(0.6*l_ScaleRate,1*l_ScaleRate,1),0);
        this.m_ScaleCurve.AddPoint(new THREE.Vector3(1.5*l_ScaleRate,1.5*l_ScaleRate,1.5),1);
        this.m_ScaleCurve.AddPoint(new THREE.Vector3(0.6*l_ScaleRate,1*l_ScaleRate,1),1.5);
        this.m_ScaleCurve.Repeat(3);
        this.m_ScaleCurve.AddPoint(new THREE.Vector3(0.1,1,1),5);
        for(let i=0;i<e_ItemFileNameArray.length;++i){
            let l_My2DImage = new My2DImage(e_ItemFileNameArray[i],100,100,true);
            let l_Curve = new CurveAndTimeData();
            this.m_ObjectArray.push(l_My2DImage);
            this.add(l_My2DImage);
            this.m_ObjectCurveArray.push(l_Curve);
            if(i<2) {
                let l_DisScale = 1;
                if(i==0)
                    l_DisScale *= -1;
                l_Curve.AddPoint(new THREE.Vector3(0*l_DisScale, 0, 0), 0);
                l_Curve.AddPoint(new THREE.Vector3(120*l_DisScale, 0, 0), 0.5);
                l_Curve.AddPoint(new THREE.Vector3(0*l_DisScale, 0, 0), this.m_ToOriginalTime);
            }else{
                let l_DisScale = 0.3;
                l_Curve.AddPoint(new THREE.Vector3(0, 0*l_DisScale, 0), 0);
                l_Curve.AddPoint(new THREE.Vector3(0, 30*l_DisScale, 0), 0.3);
                l_Curve.AddPoint(new THREE.Vector3(0, 0*l_DisScale, 0), 0.6);
                l_Curve.AddPoint(new THREE.Vector3(0, -30*l_DisScale, 0), 0.9);
                l_Curve.AddPoint(new THREE.Vector3(0, 0*l_DisScale, 0), 1.2);
                l_Curve.Repeat(3);
                l_Curve.AddPoint(new THREE.Vector3(0, 0, 0), this.m_ToOriginalTime);
                l_Curve.SetLOD(3);
                l_Curve.m_bUpdateWithLiner = false;
                //l_Curve.AddPoint(new THREE.Vector3(0, 0, 0), this.m_ToOriginalTime);
            }
        }
    }
    Init():void{
        super.Init();
        this.m_CurrentTime = 0;
        for(let i=0;i<this.m_ObjectCurveArray.length;++i) {
            this.m_ObjectCurveArray[i].Init();
            this.m_ObjectArray[i].scale.set(1,1,1);
        }
        this.m_ScaleCurve.Init();
        this.m_FireImage.scale.set(0,0,0);
    }
    Update(e_fElpaseTime):void{
        this.m_CurrentTime += e_fElpaseTime*10;
        //console.log(l_YPos);
        //console.log(l_ZPos);
        if(this.m_ScaleCurve){
            this.m_ScaleCurve.Update(e_fElpaseTime);
            let l_Scale = this.m_ScaleCurve.GetPosition();
            let l_CenterObject:THREE.Object3D = this.m_ObjectArray[2];
            l_CenterObject.scale.set(l_Scale.x,l_Scale.y,1);
            let l_TargetLERP = 0.6;
            //console.log(this.m_ScaleCurve.m_CurrentLERP);
            let l_OverThousholdValue = this.m_ScaleCurve.m_CurrentLERP-l_TargetLERP;
            if(l_OverThousholdValue > 0){
                let l_RestLerpValue = 1-l_TargetLERP;
                let l_LERP = l_OverThousholdValue/l_RestLerpValue;
                let l_GugeNumber = 100;
                this.m_FireImage.scale.set(l_GugeNumber*l_LERP,l_GugeNumber*l_LERP,l_GugeNumber*l_LERP);
                this.m_FireImage.position.set(0,0,-l_LERP*l_GugeNumber);
                this.m_FireImage.SetColor(0xffffff,l_LERP);
            }
        }
        for(let i=0;i<this.m_ObjectCurveArray.length;++i){
            let l_Curve = this.m_ObjectCurveArray[i];
            l_Curve.Update(e_fElpaseTime);
            var l_Pos = l_Curve.GetPosition();
            let l_MyImage = this.m_ObjectArray[i];
            if(i<2) {
                let l_XPos = Math.sin(this.m_CurrentTime) * l_Pos.x;
                let l_ZPos = Math.cos(this.m_CurrentTime) * l_Pos.x;
                l_MyImage.position.set(l_XPos, 0, l_ZPos);
                //g_MyParticle.emit(1,l_MyImage.position,50,1,3);
            }else{
                g_MyParticle.emit(5,l_MyImage.position,1,1,3);
                l_MyImage.position.set(l_Pos.x,l_Pos.y,l_Pos.z);
                l_MyImage.rotateY(this.m_CurrentTime*e_fElpaseTime);
                //l_MyImage.scale.set(5,5,5);
            }
            if(l_Curve.m_bEnd){
                this.m_bSatisfied = true;
            }
        }
        //Math.sin();
    }
}


export class ShowResultCondition extends Condition{
    private m_Image:My2DImage;
    private m_Curve:CurveAndTimeData;
    constructor(e_FinalImageName){
        super();
        this.m_Image = new My2DImage(e_FinalImageName,100,100,true);
        this.add(this.m_Image);
        this.m_Curve = new CurveAndTimeData();
        this.m_Curve.AddPoint(new THREE.Vector3(0,0,0),0);
        this.m_Curve.AddPoint(new THREE.Vector3(5,5,5),3);
        this.m_Curve.AddPoint(new THREE.Vector3(5,5,5),5);
    }
    Init():void{
        super.Init();
        this.m_Curve.Init();
        this.m_Image.scale.set(0,0,0);
    }
    Update(e_fElpaseTime):void{
        this.m_Curve.Update(e_fElpaseTime);
        let l_Pos = this.m_Curve.GetPosition();
        this.m_Image.scale.set(l_Pos.x,l_Pos.y,l_Pos.z);
        if(this.m_Curve.m_bEnd){
            this.m_bSatisfied = true;
        }
    }
}
