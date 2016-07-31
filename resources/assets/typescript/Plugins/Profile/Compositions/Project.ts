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

    objects() {
        return [
            // '*',
            'artist3D',
            'actor',
            'actress',
            'animation',
            'art-director',
            'camera-director',
            'concept-artist',
            'costume-designer',
            'director',
            'editor',
            'effects',
            'executive-producer',
            'lighting-artist',
            'make-up-artist',
            'packaging-designer',
            'pre-stage-project-coordinator',
            'project-coordinator',
            'prop',
            'recording-artist',
            'render-and-composite',
            'rigging-artist',
            'screenwriter',
            'script-supervisor',
            'set-designer',
            'sound-effect',
            'stage-manager',
            'storyboard-artist',
            'swing-gang',
            'voice-artist',
        ];
    }

    stage(scene, camera, objects) {

        let position = 0;

        for (let i in objects) {

            objects[i].position.setX(
                position
            )

            position += 50

            scene.add(objects[i])

        }

    }

    update(scene, camera, objects, time, delta) {

    }

}
