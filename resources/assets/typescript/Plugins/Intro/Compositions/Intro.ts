import {Composition} from "../Abstracts/Composition";
import {Animator} from "../Modules/Animator";

/**
 * Intro Composition
 */
export class Intro extends Composition {

    get objects(): string[] {
        return [
            'artist3d',
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
            'base'
        ];
    }

    public setup() {
        // console.log('hi')
    }

    public stage({actor, artist3d, base}) {

        setTimeout(() => {
            this.app.loader.load('/models/Actor.json').then(function (a) {
                console.log('what next', a)
            })
        }, 5000)
        artist3d.position.x = 30
        this.scene.add(actor, base, artist3d);

        Animator
            .from(actor)
            .play('idle')
            .play('lookAround');
console.log(artist3d) // faltando animacao
        Animator
            .from(artist3d)
            .play('idle')
            .play('lookAround');

    }

    public update({actor, base}, time, delta) {
        actor.rotation.y += .05 - delta
        actor.rotation.z += .05 - delta

        base.rotation.y += .05 - delta
        base.rotation.z += .05 - delta
    }

}
