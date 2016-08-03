//author cloud
//date 1/Aug/2016
//import {ItemInterface} from "./ItemInterface";
"use strict";
var Helpers_1 = require("../Helpers");
var g_StageJsonTest = {
    "ProjectName": "Test",
    "Creator": "Me",
    "StageName": "Idea",
    "GiveRewardMax": "3",
    "GiveRewardMin": "1",
    "GroupAndProbability": [
        { GroupID: "A", Probability: "70" },
        { GroupID: "B", Probability: "35" },
        { GroupID: "C", Probability: "17" },
    ]
};
var ItemData = (function () {
    //constructor({e_Json}){
    function ItemData(e_Json) {
        this.groupID = "0";
        this.name = "unknow";
        this.id = "0";
        this.imageUrl = "";
        this.probabilityToShow = 0.1;
        //if items combined result is failed,return virtual coins.
        this.cost = 10;
        var l_TargetElement = e_Json["ItemData"];
        if (l_TargetElement) {
            for (var l_Element in e_Json) {
                this[l_Element] = e_Json[l_Element];
            }
        }
        else {
            console.log("item data json forma is wrong!");
        }
    }
    return ItemData;
}());
exports.ItemData = ItemData;
;
var GroupAndItem = (function () {
    function GroupAndItem(e_Json) {
        this.m_findSuitObjectByProbability = null;
        //public points;
        this.groupID = "0";
        this.itemArray = [];
        this.groupID = e_Json.groupID;
        this.m_findSuitObjectByProbability = new Helpers_1.findSuitObjectByProbability();
        var l_Element = e_Json["GroupAndItem"];
        if (l_Element) {
            for (var l_ItemElement in l_Element) {
                var l_TargetElement = l_Element[l_ItemElement];
                if ("ItemData" == l_TargetElement) {
                    var l_ItemData = new ItemData(l_TargetElement);
                    this.addItem(l_ItemData);
                    this.m_findSuitObjectByProbability.addProbability(l_ItemData.probabilityToShow);
                }
            }
        }
    }
    GroupAndItem.prototype.getRandomItemID = function () {
        var l_Index = this.m_findSuitObjectByProbability.getIndex();
        if (this.itemArray.length > l_Index) {
            var l_Item = this.itemArray[l_Index];
            return l_Item.id;
        }
        return null;
    };
    GroupAndItem.prototype.addItem = function (e_ItemData) {
        //avoid add same id again
        for (var i = 0; i < this.itemArray.length; ++i) {
            var l_ItemData = this.itemArray[i];
            if (l_ItemData.id == e_ItemData.id) {
                return false;
            }
        }
        this.itemArray.push(e_ItemData);
        return true;
    };
    return GroupAndItem;
}());
exports.GroupAndItem = GroupAndItem;
;
var ItemManager = (function () {
    function ItemManager(e_Json) {
        this.groupAndItemArray = null;
        this.assignItemsData(e_Json);
        //do something
    }
    ItemManager.prototype.assignItemsData = function (e_Json) {
        this.groupAndItemArray = [];
        if (e_Json) {
            for (var l_Json in e_Json) {
                var l_groupID = l_Json["groupID"];
                if (l_groupID) {
                    var l_GroupAndItem = new GroupAndItem(e_Json[l_Json]);
                    l_GroupAndItem.groupID = l_groupID;
                    this.groupAndItemArray.push(l_GroupAndItem);
                }
            }
        }
    };
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
    ItemManager.prototype.getItemsFromStageData = function (e_StageDataJson) {
        var l_findSuitObjectByProbability = new Helpers_1.findSuitObjectByProbability();
        var l_ProjectNAme = e_StageDataJson.ProjectName;
        var l_Creator = e_StageDataJson.Creator;
        var l_StageName = e_StageDataJson.StageName;
        var l_GiveRewardMax = e_StageDataJson.GiveRewardMax;
        var l_GiveRewardMin = e_StageDataJson.GiveRewardMin;
        var l_GivRewardCount = Helpers_1.random(l_GiveRewardMin, l_GiveRewardMax);
        var l_GroupAndProbability = e_StageDataJson.GroupAndProbability;
        if (l_GroupAndProbability) {
            for (var i in l_GroupAndProbability) {
                var l_Object = l_GroupAndProbability[i];
                if (l_Object) {
                    l_Object.GroupID;
                    l_Object.Probability;
                    l_findSuitObjectByProbability.addProbability(l_Object.Probability);
                }
            }
            var l_TargetGroup = [];
            for (var i = 0; i < l_GivRewardCount; ++i) {
                var l_TargetGroupID = l_findSuitObjectByProbability.getIndex();
                l_TargetGroup.push(l_TargetGroupID);
            }
            var l_ReturnJsonResult = [];
            for (var i = 0; i < l_TargetGroup.length; ++i) {
                var l_GroupID = l_TargetGroup[i];
                //avoid some stupid things wrong
                if (this.groupAndItemArray.length > l_GroupID) {
                    var l_GroupAndItem = this.groupAndItemArray[l_GroupID_1];
                    var l_GroupID_1 = l_GroupAndItem.groupID;
                    var l_ItemID = l_GroupAndItem.getRandomItemID();
                    var l_GroupIDAndItemID = [l_GroupID_1, l_ItemID];
                    l_ReturnJsonResult.push(l_GroupIDAndItemID);
                }
            }
            return l_ReturnJsonResult;
        }
        //groupAndItemArray
        //return reward;
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
        for (var i = 0; i < this.groupAndItemArray; ++i) {
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
}());
exports.ItemManager = ItemManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLGlCQUFpQjtBQUNqQixnREFBZ0Q7O0FBRWhELHdCQUFrRCxZQUFZLENBQUMsQ0FBQTtBQUUvRCxJQUFJLGVBQWUsR0FBRztJQUNsQixhQUFhLEVBQUMsTUFBTTtJQUNwQixTQUFTLEVBQUMsSUFBSTtJQUNkLFdBQVcsRUFBQyxNQUFNO0lBQ2xCLGVBQWUsRUFBQyxHQUFHO0lBQ25CLGVBQWUsRUFBQyxHQUFHO0lBQ25CLHFCQUFxQixFQUFDO1FBQ2xCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDO1FBQzlCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDO1FBQzlCLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDO0tBQ2pDO0NBQ0osQ0FBQTtBQUVEO0lBUUksd0JBQXdCO0lBQ3hCLGtCQUFZLE1BQU07UUFSWCxZQUFPLEdBQVUsR0FBRyxDQUFDO1FBQ3JCLFNBQUksR0FBVSxRQUFRLENBQUM7UUFDdkIsT0FBRSxHQUFVLEdBQUcsQ0FBQztRQUNoQixhQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3JCLHNCQUFpQixHQUFVLEdBQUcsQ0FBQztRQUN0QywwREFBMEQ7UUFDbkQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUdiLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxDQUFDLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEMsQ0FBQztRQUNMLENBQUM7UUFBQSxJQUFJ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