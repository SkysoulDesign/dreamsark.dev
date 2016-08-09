(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/**
 * Get Extension of file thought the path
 * @param path
 * @returns {any}
 */

exports.extension = function (path) {
    return path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2);
};
exports.countKeys = function (object) {
    var count = 0;
    for (var k in object) {
        if (object.hasOwnProperty(k)) ++count;
    }return count;
};
exports.random = function (min, max) {
    var l_ValueMin = min;
    var l_ValueMax = max;
    if (typeof min == "string") l_ValueMin = parseInt(min);
    if (typeof max == "string") l_ValueMax = parseInt(max);
    return Math.floor(Math.random() * (l_ValueMax - l_ValueMin + 1)) + l_ValueMin;
};
//cloud
//let l_Var = new findSuitObjectByProbability(0,totalValue);
//push as many as you want
//l_Var.addProbability()....
//l_Var.getIndex();
var findSuitObjectByProbability = function () {
    function findSuitObjectByProbability() {
        this.m_ProbabilityWeightArray = [];
        this.m_MaxValue = 0;
    }
    findSuitObjectByProbability.prototype.addProbability = function (e_Weight) {
        var l_Weight = e_Weight;
        if (typeof e_Weight == "string") l_Weight = parseInt(e_Weight);
        this.m_ProbabilityWeightArray.push(l_Weight);
        this.m_MaxValue += l_Weight;
    };
    findSuitObjectByProbability.prototype.getIndex = function () {
        console.log("max value " + this.m_MaxValue);
        var l_TargetValue = exports.random(0, this.m_MaxValue);
        console.log("target value " + l_TargetValue);
        var l_Length = this.m_ProbabilityWeightArray.length;
        var l_CurrentValue = 0;
        for (var i = 0; i < l_Length; ++i) {
            var l_CurrentWeight = this.m_ProbabilityWeightArray[i];
            l_CurrentValue += l_CurrentWeight;
            console.log("current value " + l_CurrentValue);
            if (l_CurrentValue >= l_TargetValue) {
                console.log("target index is " + i);
                return i;
            }
        }
        //it should't happen
        return -1;
    };
    return findSuitObjectByProbability;
}();
exports.findSuitObjectByProbability = findSuitObjectByProbability;


},{}],2:[function(require,module,exports){
//author cloud
//date 1/Aug/2016
//import {ItemInterface} from "./ItemInterface";
"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Helpers_1 = require("../Helpers");
var Plugins_1 = require("../Plugins");
var itemList_1 = require("./itemList");
var MyLogFunction = function () {
    function MyLogFunction(e_bShowLog, e_Name) {
        this.m_ShowLog = true;
        this.m_DebugShowTag = null;
        this.m_ShowLog = e_bShowLog;
        this.m_DebugShowTag = e_Name;
    }
    MyLogFunction.prototype.log = function (e_Arguments) {
        if (this.m_ShowLog) {
            if (this.m_DebugShowTag) console.group(this.m_DebugShowTag);
            console.log(e_Arguments);
            if (this.m_DebugShowTag) console.groupEnd();
        }
    };
    return MyLogFunction;
}();
// idea stage got voting count is reached 100          1
// idea stage got voting count is reached 1000         1.1
// idea stage got voting count is reached 5000         1.3
// idea stage got voting count is reached 10000        1.5
// idea stage got voting count is reached 50000        1.7
// idea stage got voting count is reached 100000       2
var g_StageJsonTest = {
    "ProjectName": "Test",
    "Creator": "Me",
    "StageName": "Idea",
    "RewardPointsMax": 100,
    "RewardPointsMin": 10,
    "GiveRewardMax": 3,
    "GiveRewardMin": 1,
    "GroupAndProbability": [{ "GroupID": "A", "Probability": 70 }, { "GroupID": "B", "Probability": 35 }, { "GroupID": "C", "Probability": 17 }]
};
var g_FirstStageJson = {
    "ProjectName": "Test",
    "Creator": "Me",
    "StageName": "Idea",
    "RewardPointsMax": 100,
    "RewardPointsMin": 10,
    "GiveRewardMax": 3,
    "GiveRewardMin": 1,
    "GroupAndProbability": [{ "GroupID": "A", "Probability": 70 }, { "GroupID": "B", "Probability": 35 }, { "GroupID": "C", "Probability": 17 }]
};
var g_SecondStageJson = {
    "ProjectName": "Test",
    "Creator": "Me",
    "StageName": "Idea",
    "RewardPointsMax": 200,
    "RewardPointsMin": 50,
    "GiveRewardMax": 3,
    "GiveRewardMin": 1,
    "GroupAndProbability": [{ "GroupID": "A", "Probability": 50 }, { "GroupID": "B", "Probability": 50 }, { "GroupID": "C", "Probability": 25 }]
};
var g_ThirdStageJson = {
    "ProjectName": "Test",
    "Creator": "Me",
    "StageName": "Idea",
    "RewardPointsMax": 500,
    "RewardPointsMin": 100,
    "GiveRewardMax": 3,
    "GiveRewardMin": 1,
    "GroupAndProbability": [{ "GroupID": "B", "Probability": 100 }, { "GroupID": "C", "Probability": 50 }, { "GroupID": "D", "Probability": 25 }]
};
var g_FourthStageJson = {
    "ProjectName": "Test",
    "Creator": "Me",
    "StageName": "Idea",
    "RewardPointsMax": 1000,
    "RewardPointsMin": 300,
    "GiveRewardMax": 2,
    "GiveRewardMin": 1,
    "GroupAndProbability": [{ "GroupID": "B", "Probability": 50 }, { "GroupID": "C", "Probability": 50 }, { "GroupID": "D", "Probability": 25 }]
};
var g_FifthStageJson = {
    "ProjectName": "Test",
    "Creator": "Me",
    "StageName": "Idea",
    "RewardPointsMax": 3000,
    "RewardPointsMin": 800,
    "GiveRewardMax": 2,
    "GiveRewardMin": 1,
    "GroupAndProbability": [{ "GroupID": "C", "Probability": 50 }, { "GroupID": "D", "Probability": 50 }, { "GroupID": "E", "Probability": 25 }]
};
var ItemData = function () {
    function ItemData(e_Json) {
        this.groupID = "0";
        this.name = "unknow";
        this.id = "0";
        this.imageUrl = "";
        this.probabilityToShow = 0.1;
        //if items combined result is failed,return virtual coins.
        this.cost = 10;
        //constructor({e_Json}){
        this.MyLog = new MyLogFunction(false, "ItemData");
        this.MyLog.log("start ItemData");
        if (e_Json) {
            for (var l_Element in e_Json) {
                this[l_Element] = e_Json[l_Element];
            }
        }
        this.MyLog.log("ItemData: " + this);
        this.MyLog.log("end ItemData");
    }
    return ItemData;
}();
exports.ItemData = ItemData;
;
var GroupAndItem = function () {
    function GroupAndItem(e_Json) {
        this.m_findSuitObjectByProbability = null;
        //public points;
        this.groupID = "0";
        this.itemArray = [];
        this.MyLog = new MyLogFunction(false, "GroupAndItem");
        this.MyLog.log("start GroupAndItem");
        this.groupID = e_Json.groupID;
        this.m_findSuitObjectByProbability = new Helpers_1.findSuitObjectByProbability();
        var l_ItemDataElement = e_Json["ItemData"];
        if (l_ItemDataElement) {
            for (var l_ItemElement in l_ItemDataElement) {
                var l_TargetElement = l_ItemDataElement[l_ItemElement];
                var l_ItemData = new ItemData(l_TargetElement);
                this.addItem(l_ItemData);
                this.m_findSuitObjectByProbability.addProbability(l_ItemData.probabilityToShow);
            }
        }
        this.MyLog.log("end GroupAndItem");
    }
    GroupAndItem.prototype.getRandomItemID = function () {
        var l_Index = this.m_findSuitObjectByProbability.getIndex();
        if (this.itemArray.length > l_Index) {
            var l_Item = this.itemArray[l_Index];
            this.MyLog.log("Item id is:" + l_Item.id);
            return l_Item.id;
        }
        this.MyLog.log("failed to get Item id!");
        return null;
    };
    GroupAndItem.prototype.addItem = function (e_ItemData) {
        //avoid add same id again
        for (var i = 0; i < this.itemArray.length; ++i) {
            var l_ItemData = this.itemArray[i];
            if (l_ItemData.id == e_ItemData.id) {
                this.MyLog.log("same item id has been added! " + e_ItemData.id);
                return false;
            }
        }
        this.itemArray.push(e_ItemData);
        return true;
    };
    return GroupAndItem;
}();
exports.GroupAndItem = GroupAndItem;
;
var ItemManager = function (_super) {
    __extends(ItemManager, _super);
    function ItemManager(e_Json) {
        _super.call(this);
        this.groupAndItemArray = null;
        this.MyLog = new MyLogFunction(false, "ItemManager");
        this.MyLog.log("start ItemManager");
        this.assignItemsData(e_Json);
        this.MyLog.log("end ItemManager");
        //do something
    }
    ItemManager.prototype.assignItemsData = function (e_Json) {
        this.MyLog.log("start function ItemManager.assignItemsData ");
        this.groupAndItemArray = [];
        if (e_Json && e_Json.GroupAndItem) {
            var l_Root = e_Json.GroupAndItem;
            for (var l_Json in l_Root) {
                var l_CurrentGroup = l_Root[l_Json];
                var l_groupID = l_CurrentGroup["groupID"];
                if (l_groupID) {
                    var l_GroupAndItem = new GroupAndItem(l_CurrentGroup);
                    this.groupAndItemArray.push(l_GroupAndItem);
                }
            }
        }
        this.MyLog.log("finish function ItemManager.assignItemsData ");
        this.getItemsFromStageData(g_StageJsonTest);
    };
    ItemManager.prototype.getItemsFromStageData = function (e_StageDataJson) {
        this.MyLog.log(e_StageDataJson);
        var l_findSuitObjectByProbability = new Helpers_1.findSuitObjectByProbability();
        var l_ProjectNAme = e_StageDataJson.ProjectName;
        var l_Creator = e_StageDataJson.Creator;
        var l_StageName = e_StageDataJson.StageName;
        var l_GiveRewardMax = e_StageDataJson.GiveRewardMax;
        var l_GiveRewardMin = e_StageDataJson.GiveRewardMin;
        var l_GivRewardCount = Helpers_1.random(l_GiveRewardMin, l_GiveRewardMax);
        this.MyLog.log(l_GiveRewardMin + ":" + l_GiveRewardMax);
        this.MyLog.log("give reward count is :" + l_GivRewardCount);
        var l_GroupAndProbability = e_StageDataJson.GroupAndProbability;
        if (l_GroupAndProbability) {
            for (var i in l_GroupAndProbability) {
                var l_Object = l_GroupAndProbability[i];
                if (l_Object) {
                    l_findSuitObjectByProbability.addProbability(l_Object.Probability);
                    this.MyLog.log("probability " + l_Object.Probability);
                }
            }
            var l_TargetGroup = [];
            for (var i = 0; i < l_GivRewardCount; ++i) {
                var l_TargetGroupID = l_findSuitObjectByProbability.getIndex();
                l_TargetGroup.push(l_TargetGroupID);
            }
            var l_ReturnJsonResult = [];
            for (var i = 0; i < l_TargetGroup.length; ++i) {
                var l_CurrentGroupID = l_TargetGroup[i];
                //avoid some stupid things wrong
                if (this.groupAndItemArray.length > l_CurrentGroupID) {
                    var l_GroupAndItem = this.groupAndItemArray[l_CurrentGroupID];
                    var l_GroupID = l_GroupAndItem.groupID;
                    var l_ItemID = l_GroupAndItem.getRandomItemID();
                    //var l_GroupIDAndItemID = [l_GroupID,l_ItemID];
                    l_ReturnJsonResult.push(l_ItemID);
                }
            }
            this.MyLog.log(l_ReturnJsonResult);
            var l_RewardPoints = Helpers_1.random(e_StageDataJson.RewardPointsMin, e_StageDataJson.RewardPointsMax);
            l_RewardPoints = Math.round(l_RewardPoints / 5) * 5;
            var l_Result = JSON.stringify({ RewardItem: l_ReturnJsonResult, RewardPoints: l_RewardPoints });
            this.MyLog.log(l_Result);
            return l_Result;
        }
        //groupAndItemArray
        //return reward;
        this.MyLog.log("getItemsFromStageData is failed!");
        return null;
    };
    ItemManager.prototype.getItemByGroupIdAndItemID = function (e_GroupID, e_ItemID) {
        for (var i = 0; i < this.groupAndItemArray.length; ++i) {
            var l_Group = this.groupAndItemArray[i];
            if (l_Group.groupID == e_GroupID) {
                for (var j = 0; j < l_Group.itemArray.length; ++j) {
                    var l_Item = l_Group.itemArray[j];
                    if (l_Item.imageUrl == e_ItemID) {
                        return l_Item;
                    }
                }
            }
        }
        return null;
    };
    ItemManager.prototype.getItemByID = function (e_ItemID) {
        for (var i = 0; i < this.groupAndItemArray.length; ++i) {
            var l_Group = this.groupAndItemArray[i];
            for (var j = 0; j < l_Group.itemArray.length; ++j) {
                var l_Item = l_Group.itemArray[j];
                if (l_Item.imageUrl == e_ItemID) {
                    return l_Item;
                }
            }
        }
        return null;
    };
    return ItemManager;
}(Plugins_1.Plugins);
exports.ItemManager = ItemManager;
window['dreamsark'].exposes({
    ItemManager: ItemManager,
    g_ItemData: itemList_1.g_ItemData,
    g_StageJsonTest: g_StageJsonTest
});
// /**
//  * Auto install itself
//  */
window['dreamsark'].install({
    ItemManager: ItemManager
});


},{"../Helpers":1,"../Plugins":4,"./itemList":3}],3:[function(require,module,exports){
"use strict";

exports.g_ItemData = {
    "GroupAndItem": [{
        "groupID": "A",
        "ItemData": [{ "groupID": "A", "id": "A01", "imageUrl": "Test.png", "probabilityToShow": 5, "cost": 15 }, { "groupID": "A", "id": "A02", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 10 }, { "groupID": "A", "id": "A03", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 10 }, { "groupID": "A", "id": "A04", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 10 }, { "groupID": "A", "id": "A05", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 10 }]
    }, {
        "groupID": "B", "ItemData": [{ "groupID": "B", "id": "B01", "imageUrl": "Test.png", "probabilityToShow": 5, "cost": 25 }, { "groupID": "B", "id": "B02", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 20 }, { "groupID": "B", "id": "B03", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 20 }, { "groupID": "B", "id": "B04", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 20 }]
    }, {
        "groupID": "C", "ItemData": [{ "groupID": "C", "id": "C01", "imageUrl": "Test.png", "probabilityToShow": 5, "cost": 35 }, { "groupID": "C", "id": "C02", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 30 }, { "groupID": "C", "id": "C03", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 30 }]
    }, {
        "groupID": "D", "ItemData": [{ "groupID": "D", "id": "D01", "imageUrl": "Test.png", "probabilityToShow": 5, "cost": 45 }, { "groupID": "D", "id": "D02", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 40 }]
    }, {
        "groupID": "E", "ItemData": [{ "groupID": "E", "id": "E01", "imageUrl": "Test.png", "probabilityToShow": 10, "cost": 50 }]
    }]
};
exports.g_ItemNameCN = {
    "1": "道具１",
    "2": "道具2",
    "3": "道具3",
    "4": "道具4",
    "5": "道具5",
    "6": "道具6",
    "7": "道具7"
};
exports.g_ItemNameEN = {
    "1": "Item１",
    "2": "Item2",
    "3": "Item3",
    "4": "Item4",
    "5": "Item5",
    "6": "Item6",
    "7": "Item7"
};


},{}],4:[function(require,module,exports){
"use strict";

var Plugins = function () {
    function Plugins() {
        this.exposes = {};
    }
    Plugins.prototype.install = function () {};
    return Plugins;
}();
exports.Plugins = Plugins;


},{}]},{},[2]);

//# sourceMappingURL=Item.js.map
