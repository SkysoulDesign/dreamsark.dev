
import {AbstractComposition} from "../Abstract/AbstractComposition";

export class Main extends AbstractComposition {

    characters() {
        return [
            'designer'
        ]
    }

    stage(scene, camera, characters) {
        scene.add(characters.designer)
    }

    update(scene, camera, characters, time, delta) {
    }

}
