//author cloud
//import {AbstractComposition} from "../Abstract/AbstractComposition";
//import {My2DImage} from "./Utilities";
//import {Loader} from "../Classes/Loader";
// import My2DImage = require ("Utilities");

import {My2DImage, MyBaseView} from "./MyThreeJS";
// import My2DImage = MyTHREEJS.My2DImage;
// import My2DImage = MyTHREEJS.My2DImage;

export class MyItemCombineView extends MyBaseView {
    private m_ItemsForMerged:My2DImage[] = [];
    private m_Item2;
    private m_MergedResult;
    private m_MergedItem;
    private m_RefundCoins;
    //private enum eMergeStatus{
        //A,
        // ePlayMergeAnimation_PATH_MOVE = 0,
        // ePlayMergeAnimation_MERGE_ANIMATION,
        // ePlayMergeAnimation_SHOW_MERGED_ITEM,
    //};
    constructor(e_ViewPortWidth, e_ViewPortHeight, e_Container, e_Window) {
        super(e_ViewPortWidth, e_ViewPortHeight, e_Container, e_Window);

    }
    InternalUpdate(e_ElpaseTime){

    }
    InternalRender(){

    }
    InternalInit(){

    }
    m_TestResult = {"MergedResult":{
        "Result":"1",
        "ItemData":{"image":"test.png"},
        "RefundCoins":"100"
     }}
     //item fom server
    setMergeItem(e_Json){
        for(let i=0;i<e_Json.length;++i){
            var l_ImageName:string = e_Json[i];
            let l_My2DImage = new My2DImage(l_ImageName,100,100,null);
            this.m_2DScene.add(l_My2DImage);
            let l_PosX:number = 100+i*90;
            let l_PosY:number = 300;
            l_My2DImage.position.set(l_PosX,l_PosY,0);
            this.m_ItemsForMerged.push(l_My2DImage);
        }
    }
    setMergedResult(e_Json){

    }
}


global.MyItemCombineView = MyItemCombineView;
