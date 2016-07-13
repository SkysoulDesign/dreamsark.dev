import {Components} from "../Abstract/Components";

/**
 * Class Light
 */
export class Light extends Components {

    private scene;

    boot(app) {

        this.scene = app.scene;

        let light = new THREE.AmbientLight(0xffffff);
            light.intensity = 1.2;

        this.scene.add(
            light
        );

    }

    public update(time:Number, delta:number) {

    }

}
