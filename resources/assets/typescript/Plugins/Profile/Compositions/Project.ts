import {AbstractComposition} from "../Abstract/AbstractComposition";

/**
 * Project Class
 */
export class Project extends AbstractComposition {

    private chars = [];

    setup(app, ...payload) {
        this.chars = payload;
        // app.controls.enabled = false
        app.controls.enableZoom = true
        app.controls.enablePan = true
    }

    characters() {

        return [
            // 'editor',
            // 'director',
            'THREEDArtist',
            // 'actress',
            // 'animation',
            // 'art-director',
            'actor',
            // 'screen-writer',
            // 'art-director',
            // 'animation',
        ];
    }

    stage(scene, camera, characters) {

        let position = 0;

        for (let i in characters) {

            characters[i].position.setX(
                position
            )

            position += 50

            scene.add(characters[i])

        }

    }

    update(scene, camera, characters, time, delta) {
    }

}
