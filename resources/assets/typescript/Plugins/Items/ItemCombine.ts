import {ItemData} from "./Item";
/**
 * Created by cloud on 8/3/16.
 */
//this for 2 objects combined and result id failed,we have to refund virtual coins
//object a is group a and object b is group b
//then  (object a cost+object b cost)*(0.25+0.3);
var g_RefundCoefficient = {
    "Coefficient":[
        {"GroupName":"A","RefundCoefficient":"0.25"},
        {"GroupName":"B","RefundCoefficient":"0.3"},
        {"GroupName":"C","RefundCoefficient":"0.35"},
        {"GroupName":"D","RefundCoefficient":"0.4"},
        {"GroupName":"E","RefundCoefficient":"0.5"}
    ]
};
//
var g_CombineRule = {
    "CombineResult":[
        {"Object1":"A1","Object2":"B1","Result":"A5"},
        {"Object1":"A2","Object2":"B2","Result":"A4"},
        {"Object1":"A3","Object2":"B3","Result":"A3"},
        {"Object1":"A4","Object2":"B4","Result":"A2"},
        {"Object1":"B5","Object2":"C1","Result":"A1"},
        {"Object1":"B4","Object2":"C2","Result":"B4"},
        {"Object1":"B3","Object2":"C3","Result":"B3"},
        {"Object1":"B2","Object2":"A1","Result":"B2"},
        {"Object1":"B1","Object2":"A2","Result":"B1"},
        {"Object1":"C4","Object2":"D1","Result":"C3"},
        {"Object1":"C4","Object2":"D2","Result":"C2"},
        {"Object1":"C4","Object2":"E1","Result":"C1"},
        {"Object1":"D4","Object2":"C1","Result":"D2"},
        {"Object1":"D4","Object2":"C2","Result":"D2"},
        {"Object1":"E1","Object2":"A5","RealItem":"MONEY"},
        {"Object1":"E1","Object2":"B4","RealItem":"CRYSTAL"},
        {"Object1":"E1","Object2":"C3","RealItem":"BALL"},
        {"Object1":"E1","Object2":"D2","RealItem":"PHONE"},
        {"Object1":"E1","Object2":"E1","RealItem":"KISS"},
    ]
}



class PopularityVoting
{
    private m_iThisWeekVotingCount:number = 0;
    private m_iThisWeekRanking:number = 0;
    private m_iLastWeekVotingCount:number = 0;
    private m_iLastWeekRanking:number = 0;
    //need this one?
    //private m_DailyVotingArray:number[] = null;
    constructor(){

    }
};

class PersonalProfile
{
    public m_Ranking:number = 0;
    public m_VotingCount:number = 0;
}

var g_TestUserProfileJson = {
    "ID":"MyName","Points":"100","Money":"10",
    "PopularityVoting": {
        "ThisWeekRanking": "1",
        "ThisWeekVotingCount": "100",
        "PastWeekRanking": "1",
        "PastWeekVotingCount": "100"
    },
    "Profiles":[
        {"Profile":"Actor","Ranking":"1","VotingCount":"100"},
        {"Profile":"CameraMan","Ranking":"1","VotingCount":"100"},
        {"Profile":"Muscian","Ranking":"1","VotingCount":"100"},
    ],
    "Items":[
        {"ID":"A01","Count":"2"},
        {"ID":"A02"}//if count is not exists count is 1.
    ]

}
class UserProfile
{
    public  m_ID:string;
    public  m_PopularityVoting:PopularityVoting;
    public  m_PersonalProfile:PersonalProfile[];
    public  m_ItemArray:ItemData[];
}
