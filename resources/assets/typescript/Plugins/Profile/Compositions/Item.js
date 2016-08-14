"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractComposition_1 = require("../Abstract/AbstractComposition");
var MyThreeJS_1 = require("../../Items/MyThreeJS");
var ItemCombineCondition_1 = require("../../../Classes/ItemCombineCondition");
//import gsap = require('gsap');
/**
 * Main Composition
 */
// var params = [
//     [ 'fragment_shader1', uniforms1 ],
//     [ 'fragment_shader2', uniforms2 ],
//     [ 'fragment_shader3', uniforms1 ],
//     [ 'fragment_shader4', uniforms1 ]
// ];
//
// for( var i = 0; i < params.length; i++ ) {
//
//     var material = new THREE.ShaderMaterial( {
//
//         uniforms: params[ i ][ 1 ],
//         vertexShader: document.getElementById( 'vertexShader' ).textContent,
//         fragmentShader: document.getElementById( params[ i ][ 0 ] ).textContent
//
//     } );
//
//     var mesh = new THREE.Mesh( geometry, material );
//     mesh.position.x = i - ( params.length - 1 ) / 2;
//     mesh.position.y = i % 2 - 0.5;
//     scene.add( mesh );
//
// }
var Item = (function (_super) {
    __extends(Item, _super);
    function Item() {
        _super.apply(this, arguments);
    }
    Item.prototype.objects = function () {
        return [
            'itemA',
        ];
    };
    Item.prototype.setup = function (app) {
        //g_TextureLoader.
        console.log("Item composition setup");
        this.m_My2DCamera = new MyThreeJS_1.My2DCamera(2560, 1600);
        this.app = app;
        this.app.renderer.setClearColor(new THREE.Color(0x888888));
        //this.app.camera = this.m_My2DCamera;
        //this.m_ConsitionManager = null;
        this.m_ConsitionManager = new ItemCombineCondition_1.ConsitionManager();
        console.log("Item composition setup finish");
    };
    Item.prototype.stage = function (scene, camera, objects) {
        //console.log(objects)
        //scene.add(objects.itemA);
        console.log("Item composition scene79979");
        if (this.m_ConsitionManager) {
            var l_EndPoint = new THREE.Vector3(0, 0, 0);
            var l_Item1Name = "/img/temp/avatar.png";
            var l_Item1Name2 = "/img/temp/avatar.png";
            var l_QuestionImage = "/img/question.png";
            var l_ResultImageFileName = "/img/temp/avatar.png";
            var l_ObjectMovingCondition = new ItemCombineCondition_1.ObjectMovingCondition(l_Item1Name, l_Item1Name2, l_EndPoint);
            var l_RotationCondition = new ItemCombineCondition_1.RotationCondition([l_Item1Name, l_Item1Name2, l_QuestionImage]);
            var l_ShowResultCondition = new ItemCombineCondition_1.ShowResultCondition(l_ResultImageFileName);
            this.m_ConsitionManager.AddCondition(l_ObjectMovingCondition);
            this.m_ConsitionManager.AddCondition(l_RotationCondition);
            this.m_ConsitionManager.AddCondition(l_ShowResultCondition);
            this.m_ConsitionManager.Init(scene);
            scene.add(ItemCombineCondition_1.g_MyParticle);
            this.m_ConsitionManager.SetLoop(true);
        }
        console.log("Item composition scene finish");
    };
    Item.prototype.update = function (scene, camera, objects, time, delta) {
        if (this.m_ConsitionManager)
            this.m_ConsitionManager.Update(delta);
        if (ItemCombineCondition_1.g_MyParticle)
            ItemCombineCondition_1.g_MyParticle.Update(delta);
    };
    return Item;
}(AbstractComposition_1.AbstractComposition));
exports.Item = Item;
//# sourceMappingURL=Item.js.map