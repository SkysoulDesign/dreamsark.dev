import {BootableInterface} from "../../../Interfaces/BootableInterface";

export class Scene extends THREE.Scene implements BootableInterface {

    public boot() {

    }

    constructor() {
        super()

        this.fog = new THREE.FogExp2(0xe1f8ff, .002345);

    }

}
