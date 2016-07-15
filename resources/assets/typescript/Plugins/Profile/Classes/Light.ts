import {Components} from "../Abstract/Components";

/**
 * Class Light
 */
export class Light extends Components {

    private scene;

    boot(app) {

        this.scene = app.scene;

        let light = new THREE.AmbientLight(0xffffff);
        light.intensity = .9

        // let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
        // let ambientLight = new THREE.AmbientLight(0xffffff, .9);

        let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9),
            ambientLight = new THREE.AmbientLight(0xffffff, .3),
            shadowLight = new THREE.DirectionalLight(0xffffff, .3);

        shadowLight.name = 'shadowLight'
        shadowLight.position.set(0, 100, -350);
        shadowLight.castShadow = false;

        // hemisphereLight.position.setZ(-300)
        // hemisphereLight.position.setZ(-300)

        // let helper = new THREE.HemisphereLightHelper(hemisphereLight, 10)

        // this.scene.add(
        //     hemisphereLight, ambientLight, shadowLight
        // );

    }

    public update(time:Number, delta:number) {

    }

}
