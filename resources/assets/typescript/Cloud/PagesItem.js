"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractPage_1 = require("../Abstract/AbstractPage");
var itemList_1 = require("../Plugins/Items/itemList");
/**
 * Profile
 */
var PagesItem = (function (_super) {
    __extends(PagesItem, _super);
    function PagesItem() {
        _super.apply(this, arguments);
        this.routes = [
            'user.456',
        ];
    }
    PagesItem.prototype.boot = function (e_UserID) {
        this.app.vue({
            methods: {
                img_create: function (src, alt, title, e_Width, e_Height) {
                    var img = document.createElement('img');
                    console.log(title);
                    img.src = src;
                    if (e_Width)
                        img.width = e_Width;
                    if (e_Height)
                        img.height = e_Height;
                    if (alt != null)
                        img.alt = alt;
                    if (title != null)
                        img.title = title;
                    return img;
                },
                CreateLabel: function (e_Text) {
                    var l_Xml = "<\"label\">";
                    var l_Label = document.createElement('label');
                }
            },
            ready: function () {
                var _this = this;
                var response = this.$http.get("/api/v1/user/" + e_UserID + "/items");
                response.then(function (items) {
                    var l_ItemsMap = [];
                    var l_ItemsObject = items.json();
                    console.log(l_ItemsObject);
                    for (var i = 0; i < l_ItemsObject.length; ++i) {
                        var l_CurrentItem = l_ItemsObject[i];
                        if (!l_ItemsMap[l_CurrentItem.id]) {
                            l_ItemsMap[l_CurrentItem.id] = [];
                        }
                        if (l_CurrentItem.pivot || l_CurrentItem.pivot.quantity) {
                            console.log("pivot of items is not exists!");
                        }
                        l_ItemsMap[l_CurrentItem.id].push([l_CurrentItem, l_CurrentItem.pivot.quantity]);
                    }
                    var l_Container = document.querySelector('.badges');
                    l_Container.innerHTML = '';
                    var l_CurrentLangue = "CN";
                    var l_ItemNameJson = l_CurrentLangue === "CN" ? itemList_1.g_ItemNameCN : itemList_1.g_ItemNameEN;
                    for (var l_Index in l_ItemsMap) {
                        var l_Array = l_ItemsMap[l_Index];
                        if (l_Container) {
                            var l_LI = document.createElement("li");
                            l_Container.appendChild(l_LI);
                            var l_Contaioner2 = l_LI; //l_Container
                            console.log(l_Array[0]);
                            var l_ItemName = l_ItemNameJson[l_Array[0][0].id];
                            if (l_ItemName == null)
                                l_ItemName = "item name is not defind in Iten Name Json";
                            l_Contaioner2.appendChild(_this.img_create(l_Array[0][0].image, null, l_ItemName, 30, 30));
                            var l_Text = document.createTextNode(l_Array[0][1]);
                            l_Contaioner2.appendChild(l_Text);
                        }
                    }
                });
            }
        });
    };
    return PagesItem;
}(AbstractPage_1.AbstractPage));
exports.PagesItem = PagesItem;
//# sourceMappingURL=PagesItem.js.map