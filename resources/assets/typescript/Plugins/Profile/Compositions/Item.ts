import {AbstractComposition} from "../Abstract/AbstractComposition";
import {My2DCamera} from "../../Items/MyThreeJS";
import {
    ConsitionManager,
    ObjectMovingCondition,
    RotationCondition,
    g_MyParticle,
    ShowResultCondition
} from "../../../Classes/ItemCombineCondition";
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


export class Item extends AbstractComposition {

    private app;
    private m_My2DCamera: My2DCamera;
    private m_ConsitionManager: ConsitionManager;
    private startUpdate: Boolean = false;
    private scene;

    objects() {
        return [
            'itemA',
        ]
    }

    setup(app) {
        //g_TextureLoader.
        console.log("Item composition setup");
        this.m_My2DCamera = new My2DCamera(2560, 1600);
        this.app = app;
        this.app.controls.enabled = false;
        this.app.renderer.setClearColor(new THREE.Color(0x888888))
        //this.app.camera = this.m_My2DCamera;
        //this.m_ConsitionManager = null;
        this.m_ConsitionManager = new ConsitionManager();
        console.log("Item composition setup finish");

        document.querySelector('#merger-button').addEventListener('click', ()=> {
            this.startUpdate = true;
            this.m_ConsitionManager.Init(this.scene);
        })

    }

    stage(scene, camera, objects) {
        this.scene = scene;
        //console.log(objects)
        //scene.add(objects.itemA);
        console.log("Item composition scene79979");
        if (this.m_ConsitionManager) {
            let l_EndPoint = new THREE.Vector3(0, 0, 0);
            let l_Item1Name = "/img/temp/itemA.png";
            let l_Item1Name2 = "/img/temp/itemB.png";
            let l_QuestionImage = "/img/temp/question.png";
            let l_ResultImageFileName = "/img/temp/itemC.png";
            let l_ObjectMovingCondition = new ObjectMovingCondition(l_Item1Name, l_Item1Name2, l_EndPoint);
            let l_RotationCondition = new RotationCondition([l_Item1Name, l_Item1Name2, l_QuestionImage]);
            let l_ShowResultCondition = new ShowResultCondition(l_ResultImageFileName);
            this.m_ConsitionManager.AddCondition(l_ObjectMovingCondition);
            this.m_ConsitionManager.AddCondition(l_RotationCondition);
            this.m_ConsitionManager.AddCondition(l_ShowResultCondition);

            scene.add(g_MyParticle);
            this.m_ConsitionManager.SetLoop(false);
        }
        console.log("Item composition scene finish");
    }

    update(scene, camera, objects, time, delta) {

        if (!this.startUpdate)
            return;

        if (this.m_ConsitionManager)
            this.m_ConsitionManager.Update(delta);
        if (g_MyParticle)
            g_MyParticle.Update(delta);
    }
}
