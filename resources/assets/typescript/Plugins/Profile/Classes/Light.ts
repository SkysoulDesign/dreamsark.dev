import {Components} from "../Abstract/Components";

export class Light extends Components {

    private scene;

    constructor() {
        super()
    }

    boot(app) {
        this.scene = app.scene;

        let light = new THREE.AmbientLight(0xffffff);
        light.intensity = 3;

        console.log(light);

        this.scene.add(
            light
        );


    }

    public update(time:Number, delta:number) {

    }

}
