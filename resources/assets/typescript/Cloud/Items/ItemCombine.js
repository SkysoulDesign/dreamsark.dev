"use strict";
/**
 * Created by cloud on 8/3/16.
 */
//this for 2 objects combined and result id failed,we have to refund virtual coins
//object a is group a and object b is group b
//then  (object a cost+object b cost)*(0.25+0.3);
//     A01  100
// B01   200
// C01   300
//
// 0.5+0.6+0.7 = 1.8/3 = 0.6
// 600*0.6 = 360
var g_RefundCoefficient = {
    "Coefficient": [
        { "GroupName": "A", "RefundCoefficient": "0.5" },
        { "GroupName": "B", "RefundCoefficient": "0.6" },
        { "GroupName": "C", "RefundCoefficient": "0.7" },
        { "GroupName": "D", "RefundCoefficient": "0.8" },
        { "GroupName": "E", "RefundCoefficient": "1" }
    ]
};
//
var g_CombineRule = {
    "CombineResult": [
        { "Target": "A001", "Result": "A5" },
        { "Target": "A002", "Result": "A4" },
        { "Target": "A003", "Result": "A3" },
        { "Target": "A004", "Result": "A2" },
        { "Target": "B005", "Result": "A1" },
        { "Target": "B004", "Result": "B4" },
        { "Target": "B003", "Result": "B3" },
        { "Target": "B002", "Result": "B2" },
        { "Target": "B001", "Result": "B1" },
        { "Target": "C004", "Result": "C3" },
        { "Target": "C004", "Result": "C2" },
        { "Target": "C004", "Result": "C1" },
        { "Target": "D004", "Result": "D2" },
        { "Target": "D004", "Result": "D2" },
        { "Target": "E001", "RealItem": "MONEY" },
        { "Target": "E001", "RealItem": "CRYSTAL" },
        { "Target": "E001", "RealItem": "BALL" },
        { "Target": "E001", "RealItem": "PHONE" },
        { "Target": "E001", "RealItem": "KISS" },
    ]
};
//Item id rule
//ID must be number
//group id must be english alphabet
//ex item id is 001  group is A
var ItemCombinSystem = (function () {
    function ItemCombinSystem(e_ItemList, e_CombineRule, e_RefundCoefficient) {
        this.m_AllItemList = e_ItemList;
        this.m_CombineRule = e_CombineRule;
        this.m_RefundCoefficient = e_RefundCoefficient;
    }
    ItemCombinSystem.prototype.IsItemLegal = function (e_ItenName) {
        return true;
    };
    ItemCombinSystem.prototype.getCombineResult = function (e_ObjectArray) {
        //do sort
        // first compare group,second compare number
        var l_StorageArray = [];
        for (var l_Object in e_ObjectArray) {
            if (IsItemLegal(e_Object)) {
                l_StorageArray.push({ "groupID": l_Object.groupID, "ItemID": l_Object.id });
            }
            else {
                console.log("no this item " + l_Object.groupID + l_Object.id);
                return null;
            }
        }
        l_StorageArray.sort(function (e_Object1, e_Object2) {
            return ((e_Object1.groupID < e_Object2.groupID) ?
                -1 : ((e_Object1.groupID == e_Object2.groupID) ?
                0 : 1));
        });
        var l_TargetString = "";
        for (var l_String in l_StorageArray) {
            l_TargetString += l_String;
        }
        for (var l_CombineRule in this.m_CombineRule) {
            if (l_CombineRule.Target == l_TargetString) {
                return l_CombineRule.Result;
            }
        }
        return null;
    };
    ItemCombinSystem.prototype.getRefund = function (e_ObjectArray) {
        if (!e_ObjectArray) {
            return 0;
        }
        var l_Coins = 0;
        var l_Coefficient = 0;
        var l_Length = e_ObjectArray.length;
        for (var l_Object in e_ObjectArray) {
            for (var l_Coe in this.m_RefundCoefficient) {
                if (l_Coe.GroupName == l_Object.groupID) {
                    l_Coefficient += this.m_RefundCoefficient.RefundCoefficient;
                    l_Coins += l_Object.cost;
                }
            }
        }
        l_Coefficient /= l_Length;
        l_Coins = l_Coins * l_Coefficient;
        return l_Coins;
    };
    return ItemCombinSystem;
}());
exports.ItemCombinSystem = ItemCombinSystem;
var PopularityVoting = (function () {
    //need this one?
    //private m_DailyVotingArray:number[] = null;
    function PopularityVoting() {
        this.m_iThisWeekVotingCount = 0;
        this.m_iThisWeekRanking = 0;
        this.m_iLastWeekVotingCount = 0;
        this.m_iLastWeekRanking = 0;
    }
    return PopularityVoting;
}());
;
var PersonalProfile = (function () {
    function PersonalProfile() {
        this.m_Ranking = 0;
        this.m_VotingCount = 0;
    }
    return PersonalProfile;
}());
var g_TestUserProfileJson = {
    "ID": "MyName", "Points": "100", "Money": "10",
    "PopularityVoting": {
        "ThisWeekRanking": "1",
        "ThisWeekVotingCount": "100",
        "PastWeekRanking": "1",
        "PastWeekVotingCount": "100"
    },
    "Profiles": [
        { "Profile": "Actor", "Ranking": "1", "VotingCount": "100" },
        { "Profile": "CameraMan", "Ranking": "1", "VotingCount": "100" },
        { "Profile": "Muscian", "Ranking": "1", "VotingCount": "100" },
    ],
    "Items": [
        { "ID": "A01", "Count": "2" },
        { "ID": "A02" } //if count is not exists count is 1.
    ]
};
var UserProfile = (function () {
    function UserProfile() {
    }
    return UserProfile;
}());
//# sourceMappingURL=ItemCombine.js.map