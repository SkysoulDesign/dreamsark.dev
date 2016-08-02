//author cloud
//date 1/Aug/2016
//import {ItemInterface} from "./ItemInterface";

import {findSuitObjectByProbability, random} from "../Helpers";

var g_StageJsonTest = {
    "ProjectName":"Test",//for db link
    "Creator":"Me",//to link db,for some reason we expect give rare items by name to promo this project.
    "StageName":"Idea",//for debug check
    "GiveRewardMax":"3",
    "GiveRewardMin":"1",
    "GroupAndProbability":[
        {GroupID:"A",Probability:"70"},
        {GroupID:"B",Probability:"35"},
        {GroupID:"C",Probability:"17"},
    ]
}

export class ItemData{
    public groupID:string = "0";
    public name:string = "unknow";
    public id:string = "0";
    public imageUrl:string = "";
    public probabilityToShow:number = 0.1;
    //if items combined result is failed,return virtual coins.
    public cost = 10;
    //constructor({e_Json}){
    constructor(e_Json){
        var l_TargetElement = e_Json["ItemData"];
        if(l_TargetElement) {
            for (let l_Element in e_Json) {
                this[l_Element] = e_Json[l_Element];
            }
        }else{
            console.log("item data json forma is wrong!");
        }
    }
} ;

export class GroupAndItem{
    private m_findSuitObjectByProbability:findSuitObjectByProbability = null;
    //public points;
    public  groupID:string = "0";
    public  itemArray:ItemData[] = [];
    constructor(e_Json){
        this.groupID = e_Json.groupID;
        this.m_findSuitObjectByProbability = new findSuitObjectByProbability();
        var l_Element = e_Json["GroupAndItem"];
        if(l_Element){
            for(let l_ItemElement in l_Element){
                let l_TargetElement = l_Element[l_ItemElement];
                if("ItemData" == l_TargetElement){
                    let l_ItemData = new ItemData(l_TargetElement);
                    this.addItem(l_ItemData);
                    this.m_findSuitObjectByProbability.addProbability(l_ItemData.probabilityToShow);
                }
            }
        }
    }
    getRandomItemID(){
        var l_Index = this.m_findSuitObjectByProbability.getIndex();
        if(this.itemArray.length>l_Index) {
            let l_Item:ItemData  = this.itemArray[l_Index];
            return l_Item.id;
        }
        return null;
    }
    addItem(e_ItemData){
        //avoid add same id again
        for(var i=0;i<this.itemArray.length;++i){
            var l_ItemData = this.itemArray[i];
            if(l_ItemData.id == e_ItemData.id){
                return false;
            }
        }
        this.itemArray.push(e_ItemData);
        return true;
    }
};

export class ItemManager{
    protected groupAndItemArray:GroupAndItem[] = null;
    constructor(e_Json){
        this.assignItemsData(e_Json);
        //do something
    }
    assignItemsData(e_Json){
        this.groupAndItemArray = [];
        if(e_Json){
            for(let l_Json in e_Json){
                let l_groupID = l_Json["groupID"];
                if(l_groupID){
                    let l_GroupAndItem = new GroupAndItem(e_Json[l_Json]);
                    l_GroupAndItem.groupID = l_groupID;
                    this.groupAndItemArray.push(l_GroupAndItem);
                }
            }
        }
    }

//     var g_StageJsonTest = {
//     "ProjectName":"Test",
//     "Creator":"Me",//to link db
//     "StageName":"Idea",
//     "GiveRewardMax":"3",
//     "GiveRewardMin":"1",
//     "GeoupAndProbability":[
//         {GroupID:"A",Probability:"70"},
//         {GroupID:"B",Probability:"35"},
//         {GroupID:"C",Probability:"17"},
//     ]
// }
    //return array
    //[groupID,itemID],[7groupID,itemID]....
    getItemsFromStageData(e_StageDataJson){
        let l_findSuitObjectByProbability:findSuitObjectByProbability = new findSuitObjectByProbability();
        let l_ProjectNAme = e_StageDataJson.ProjectName;
        let l_Creator = e_StageDataJson.Creator;
        let l_StageName = e_StageDataJson.StageName;
        let l_GiveRewardMax = e_StageDataJson.GiveRewardMax;
        let l_GiveRewardMin = e_StageDataJson.GiveRewardMin;
        let l_GivRewardCount = random(l_GiveRewardMin,l_GiveRewardMax);
        var l_GroupAndProbability = e_StageDataJson.GroupAndProbability;
        if(l_GroupAndProbability){
            for(let i in l_GroupAndProbability){
                let l_Object = l_GroupAndProbability[i];
                if(l_Object){
                    l_Object.GroupID;
                    l_Object.Probability;
                    l_findSuitObjectByProbability.addProbability(l_Object.Probability);
                }
            }
            let l_TargetGroup:number[] = [];
            for(let i:number=0;i<l_GivRewardCount;++i) {
                let  l_TargetGroupID = l_findSuitObjectByProbability.getIndex();
                l_TargetGroup.push(l_TargetGroupID);
            }
            var l_ReturnJsonResult = [];
            for(let i=0;i<l_TargetGroup.length;++i){
                let l_GroupID:number = l_TargetGroup[i];
                //avoid some stupid things wrong
                if(this.groupAndItemArray.length>l_GroupID) {
                    let l_GroupAndItem:GroupAndItem = this.groupAndItemArray[l_GroupID];
                    let l_GroupID = l_GroupAndItem.groupID;
                    let l_ItemID = l_GroupAndItem.getRandomItemID();
                    var l_GroupIDAndItemID = [l_GroupID,l_ItemID];
                    l_ReturnJsonResult.push(l_GroupIDAndItemID);
                }
            }
            return l_ReturnJsonResult;
        }
        //groupAndItemArray
        //return reward;
        return null;
    }
    getItemByGroupIdAndItemID(e_GroupID,e_ItemID){
        for(let i:number=0;i<this.groupAndItemArray.length;++i) {
            let l_Group = this.groupAndItemArray[i];
            if(l_Group.groupID == e_GroupID){
                for(let j=0;j<l_Group.itemArray.length;++j){
                    let l_Item = l_Group.itemArray[j];
                    if(l_Item.imageUrl == e_ItemID){
                        return l_Item;
                    }
                }
            }
        }
        return null;
    }
    getItemByID(e_ItemID){
        for(let i:number=0;i<this.groupAndItemArray;++i) {
            let l_Group = this.groupAndItemArray[i];
            for(let j=0;j<l_Group.itemArray.length;++j){
                let l_Item = l_Group.itemArray[j];
                if(l_Item.imageUrl == e_ItemID){
                    return l_Item;
                }
            }
        }
        return null;
    }
}
