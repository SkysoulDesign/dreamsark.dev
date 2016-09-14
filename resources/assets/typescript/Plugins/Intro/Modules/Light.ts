import {ModulesInterface} from "../Interfaces/ModulesInterface";
import {BootableInterface} from "../../../Interfaces/BootableInterface";

/**
 * Class Light
 */
export class Light implements BootableInterface, ModulesInterface {

    private scene;
    private camera;

    boot(app) {

        this.scene = app.scene;
        this.camera = app.camera;

        let light = new THREE.AmbientLight(0xffffff);
            light.intensity = .9

        let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 1)
        let ambientLight = new THREE.AmbientLight(0xf0ecf6, 1);

        // let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9),
        //     ambientLight = new THREE.AmbientLight(0xffffff, .3),
        let shadowLight = new THREE.DirectionalLight(0xffffff, 1);

        shadowLight.name = 'shadowLight'
        shadowLight.position.set(0, 100, -350);
        shadowLight.castShadow = true;

        // hemisphereLight.position.setZ(-300)
        // hemisphereLight.position.setZ(-300)

        let shadow = new THREE.LightShadow(this.camera);

        shadowLight.position.set(100, 100, -300)

        let left = shadowLight.clone();
        left.intensity = 2.5;
        left.position.set(100, 0, 100);
        left.color.setHex(0xafe1fe)

        let right = shadowLight.clone();
            right.intensity = 3;
            right.position.set(-100, 0, -100);
            right.color.setHex(0xfef1af)

        this.scene.add(
            ambientLight, shadowLight, left, right
        );

    }

    update(time: number, delta: number): void {}

}
