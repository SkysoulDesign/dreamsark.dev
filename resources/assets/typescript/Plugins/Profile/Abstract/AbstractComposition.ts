import {ComposableInterface} from "../Interfaces/ComposableInterface";

export abstract class AbstractComposition implements ComposableInterface {

    boot(app) {

    }

    characters() {
        return false;
    }

    abstract stage(scene, camera, characters)

    setup(app, ...payload){

    };

    update(scene, camera, characters, time, delta) {

    }

}
