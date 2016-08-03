//author cloud
//date 1/Aug/2016
//import {ItemInterface} from "./ItemInterface";

import {findSuitObjectByProbability, random} from "../Helpers";
import {Plugins} from "../Plugins";
import {g_ItemData} from "./itemList";

class MyLogFunction{
    public m_ShowLog:Boolean = true;
    public m_DebugShowTag = null;
    constructor(e_bShowLog:Boolean, e_Name:string)
    {
        this.m_ShowLog = e_bShowLog;
        this.m_DebugShowTag = e_Name;
    }
    log(e_Arguments) {
        if(this.m_ShowLog){
            if(this.m_DebugShowTag)
                console.group(this.m_DebugShowTag);
            console.log(e_Arguments);
            if(this.m_DebugShowTag)
                console.groupEnd(this.m_DebugShowTag)
        }
    }
}

// idea stage got voting count is reached 100          1
// idea stage got voting count is reached 1000         1.1
// idea stage got voting count is reached 5000         1.3
// idea stage got voting count is reached 10000        1.5
// idea stage got voting count is reached 50000        1.7
// idea stage got voting count is reached 100000       2

var g_StageJsonTest = {
    "ProjectName":"Test",//for db link
    "Creator":"Me",//to link db,for some reason we expect give rare items by name to promo this project.
    "StageName":"Idea",//for debug check
    "RewardPointsMax":100,
    "RewardPointsMin":10,
    "GiveRewardMax":3,
    "GiveRewardMin":1,
    "GroupAndProbability":[
        {"GroupID":"A","Probability":70},
        {"GroupID":"B","Probability":35},
        {"GroupID":"C","Probability":17},
    ]
}

var g_FirstStageJson = {
    "ProjectName":"Test",//for db link
    "Creator":"Me",//to link db,for some reason we expect give rare items by name to promo this project.
    "StageName":"Idea",//for debug check
    "RewardPointsMax":100,
    "RewardPointsMin":10,
    "GiveRewardMax":3,
    "GiveRewardMin":1,
    "GroupAndProbability":[
        {"GroupID":"A","Probability":70},
        {"GroupID":"B","Probability":35},
        {"GroupID":"C","Probability":17},
    ]
}

var g_SecondStageJson = {
    "ProjectName":"Test",//for db link
    "Creator":"Me",//to link db,for some reason we expect give rare items by name to promo this project.
    "StageName":"Idea",//for debug check
    "RewardPointsMax":200,
    "RewardPointsMin":50,
    "GiveRewardMax":3,
    "GiveRewardMin":1,
    "GroupAndProbability":[
        {"GroupID":"A","Probability":50},
        {"GroupID":"B","Probability":50},
        {"GroupID":"C","Probability":25},
    ]
}
var g_ThirdStageJson = {
    "ProjectName":"Test",//for db link
    "Creator":"Me",//to link db,for some reason we expect give rare items by name to promo this project.
    "StageName":"Idea",//for debug check
    "RewardPointsMax":500,
    "RewardPointsMin":100,
    "GiveRewardMax":3,
    "GiveRewardMin":1,
    "GroupAndProbability":[
        {"GroupID":"B","Probability":100},
        {"GroupID":"C","Probability":50},
        {"GroupID":"D","Probability":25},
    ]
}

var g_FourthStageJson = {
    "ProjectName":"Test",//for db link
    "Creator":"Me",//to link db,for some reason we expect give rare items by name to promo this project.
    "StageName":"Idea",//for debug check
    "RewardPointsMax":1000,
    "RewardPointsMin":300,
    "GiveRewardMax":2,
    "GiveRewardMin":1,
    "GroupAndProbability":[
        {"GroupID":"B","Probability":50},
        {"GroupID":"C","Probability":50},
        {"GroupID":"D","Probability":25},
    ]
}

var g_FifthStageJson = {
    "ProjectName":"Test",//for db link
    "Creator":"Me",//to link db,for some reason we expect give rare items by name to promo this project.
    "StageName":"Idea",//for debug check
    "RewardPointsMax":3000,
    "RewardPointsMin":800,
    "GiveRewardMax":2,
    "GiveRewardMin":1,
    "GroupAndProbability":[
        {"GroupID":"C","Probability":50},
        {"GroupID":"D","Probability":50},
        {"GroupID":"E","Probability":25},
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
    private MyLog = new MyLogFunction(false,"ItemData");
    constructor(e_Json){
        this.MyLog.log("start ItemData");
         if(e_Json) {
             for (let l_Element in e_Json) {
                 this[l_Element] = e_Json[l_Element];
             }
         }
        this.MyLog.log("ItemData: "+this);
        this.MyLog.log("end ItemData");
    }
} ;

export class GroupAndItem{
    private m_findSuitObjectByProbability:findSuitObjectByProbability = null;
    //public points;
    public  groupID:string = "0";
    public  itemArray:ItemData[] = [];
    private MyLog = new MyLogFunction(false,"GroupAndItem");
    constructor(e_Json){
        this.MyLog.log("start GroupAndItem");
        this.groupID = e_Json.groupID;
        this.m_findSuitObjectByProbability = new findSuitObjectByProbability();
        var l_ItemDataElement = e_Json["ItemData"];
        if(l_ItemDataElement){
            for(let l_ItemElement in l_ItemDataElement){
                let l_TargetElement = l_ItemDataElement[l_ItemElement];
                let l_ItemData = new ItemData(l_TargetElement);
                this.addItem(l_ItemData);
                this.m_findSuitObjectByProbability.addProbability(l_ItemData.probabilityToShow);
            }
        }
        this.MyLog.log("end GroupAndItem");
    }
    getRandomItemID(){
        var l_Index = this.m_findSuitObjectByProbability.getIndex();
        if(this.itemArray.length>l_Index) {
            let l_Item:ItemData  = this.itemArray[l_Index];
            this.MyLog.log("Item id is:"+l_Item.id);
            return l_Item.id;
        }
        this.MyLog.log("failed to get Item id!");
        return null;
    }
    addItem(e_ItemData){
        //avoid add same id again
        for(var i=0;i<this.itemArray.length;++i){
            var l_ItemData = this.itemArray[i];
            if(l_ItemData.id == e_ItemData.id){
                this.MyLog.log("same item id has been added! "+e_ItemData.id);
                return false;
            }
        }
        this.itemArray.push(e_ItemData);
        return true;
    }
};

export class ItemManager extends Plugins{
    protected groupAndItemArray:GroupAndItem[] = null;
    private MyLog = new MyLogFunction(false,"ItemManager");
    constructor(e_Json){
        super();
        this.MyLog.log("start ItemManager");
        this.assignItemsData(e_Json);
        this.MyLog.log("end ItemManager");
        //do something
    }
    assignItemsData(e_Json){
        this.MyLog.log("start function ItemManager.assignItemsData ");
        this.groupAndItemArray = [];
        if(e_Json&&e_Json.GroupAndItem){
            var l_Root = e_Json.GroupAndItem;
            for(let l_Json in l_Root){
                let l_CurrentGroup = l_Root[l_Json];
                let l_groupID = l_CurrentGroup["groupID"];
                if(l_groupID){
                    let l_GroupAndItem = new GroupAndItem(l_CurrentGroup);
                    this.groupAndItemArray.push(l_GroupAndItem);
                }
            }
        }
        this.MyLog.log("finish function ItemManager.assignItemsData ");
        //this.getItemsFromStageData(g_StageJsonTest);
    }

    getItemsFromStageData(e_StageDataJson){
        console.log(e_StageDataJson);
        let l_findSuitObjectByProbability:findSuitObjectByProbability = new findSuitObjectByProbability();
        let l_ProjectNAme = e_StageDataJson.ProjectName;
        let l_Creator = e_StageDataJson.Creator;
        let l_StageName = e_StageDataJson.StageName;
        let l_GiveRewardMax = e_StageDataJson.GiveRewardMax;
        let l_GiveRewardMin = e_StageDataJson.GiveRewardMin;
        let l_GivRewardCount = random(l_GiveRewardMin,l_GiveRewardMax);
        console.log(l_GiveRewardMin+":"+l_GiveRewardMax);
        console.log("give reward count is :"+l_GivRewardCount);
        var l_GroupAndProbability = e_StageDataJson.GroupAndProbability;
        if(l_GroupAndProbability){
            for(let i in l_GroupAndProbability){
                let l_Object = l_GroupAndProbability[i];
                if(l_Object){
                    l_findSuitObjectByProbability.addProbability(l_Object.Probability);
                    console.log("probability "+l_Object.Probability);
                }
            }
            let l_TargetGroup:number[] = [];
            for(let i:number=0;i<l_GivRewardCount;++i) {
                let  l_TargetGroupID = l_findSuitObjectByProbability.getIndex();
                l_TargetGroup.push(l_TargetGroupID);
            }
            var l_ReturnJsonResult = [];
            for(let i=0;i<l_TargetGroup.length;++i){
                let l_CurrentGroupID = l_TargetGroup[i];
                //avoid some stupid things wrong
                if(this.groupAndItemArray.length>l_CurrentGroupID) {
                    let l_GroupAndItem:GroupAndItem = this.groupAndItemArray[l_CurrentGroupID];
                    let l_GroupID = l_GroupAndItem.groupID;
                    let l_ItemID = l_GroupAndItem.getRandomItemID();
                    var l_GroupIDAndItemID = [l_GroupID,l_ItemID];
                    l_ReturnJsonResult.push(l_GroupIDAndItemID);
                }
            }
            console.log(l_ReturnJsonResult);
            let l_RewardPoints = random(e_StageDataJson.RewardPointsMin,e_StageDataJson.RewardPointsMax);
            l_RewardPoints = Math.round(l_RewardPoints/5)*5;
            var l_Result = JSON.stringify({RewardItem:l_ReturnJsonResult,RewardPoints:l_RewardPoints});
            return l_Result;
        }
        //groupAndItemArray
        //return reward;
        console.log("getItemsFromStageData is failed!");
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
        for(let i:number=0 ; i < this.groupAndItemArray.length ; ++i) {
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

window['dreamsark'].exposes({
    ItemManager,
    g_ItemData,
    g_StageJsonTest
});
// /**
//  * Auto install itself
//  */
window['dreamsark'].install({
    ItemManager
});
