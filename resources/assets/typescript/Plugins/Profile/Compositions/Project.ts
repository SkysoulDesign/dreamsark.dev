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
            // '*',
            'actor',
            'actress',
            'animation',
            'director',
            'art-director',
            'editor',
            'concept-artist',
            'costume-designer',
            'effects',
            'executive-producer',
            'lighting-artist',
            'packaging-designer',
            'pre-stage-project-coordinator',
            'project-coordinator',
            'prop',
            'recording-artist',
            'render-and-composite',
            'set-designer',
            'sound-effect',
            'stage-manager',
            'storyboard-artist',
            'swing-gang',
            'voice-artist'

            //Not Okay
            // 'camera-director',
            // 'THREEDArtist',
            // 'screen-writer'
            // 'rigging-artist',
            // 'script-supervisor', /// no-animation

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
