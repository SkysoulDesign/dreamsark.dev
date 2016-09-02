//author cloud
//import {AbstractComposition} from "../Abstract/AbstractComposition";
//import {My2DImage} from "./Utilities";
//import {Loader} from "../Classes/Loader";
// import My2DImage = require ("Utilities");
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyThreeJS_1 = require("./MyThreeJS");
// import My2DImage = MyTHREEJS.My2DImage;
// import My2DImage = MyTHREEJS.My2DImage;
var MyItemCombineView = (function (_super) {
    __extends(MyItemCombineView, _super);
    //private enum eMergeStatus{
    //A,
    // ePlayMergeAnimation_PATH_MOVE = 0,
    // ePlayMergeAnimation_MERGE_ANIMATION,
    // ePlayMergeAnimation_SHOW_MERGED_ITEM,
    //};
    function MyItemCombineView(e_ViewPortWidth, e_ViewPortHeight, e_Container, e_Window) {
        _super.call(this, e_ViewPortWidth, e_ViewPortHeight, e_Container, e_Window);
        this.m_ItemsForMerged = [];
        this.m_TestResult = { "MergedResult": {
                "Result": "1",
                "ItemData": { "image": "test.png" },
                "RefundCoins": "100"
            } };
    }
    MyItemCombineView.prototype.InternalUpdate = function (e_ElpaseTime) {
    };
    MyItemCombineView.prototype.InternalRender = function () {
    };
    MyItemCombineView.prototype.InternalInit = function () {
    };
    //item fom server
    MyItemCombineView.prototype.setMergeItem = function (e_Json) {
        for (var i = 0; i < e_Json.length; ++i) {
            var l_ImageName = e_Json[i];
            var l_My2DImage = new MyThreeJS_1.My2DImage(l_ImageName, 100, 100, null);
            this.m_2DScene.add(l_My2DImage);
            var l_PosX = 100 + i * 90;
            var l_PosY = 300;
            l_My2DImage.position.set(l_PosX, l_PosY, 0);
            this.m_ItemsForMerged.push(l_My2DImage);
        }
    };
    MyItemCombineView.prototype.setMergedResult = function (e_Json) {
    };
    return MyItemCombineView;
}(MyThreeJS_1.MyBaseView));
exports.MyItemCombineView = MyItemCombineView;
global.MyItemCombineView = MyItemCombineView;
//# sourceMappingURL=ItemCombineView.js.map