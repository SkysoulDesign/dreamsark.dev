import {Composition} from "../Abstracts/Composition";

/**
 * Intro Composition
 */
export class Intro extends Composition {

    get objects(): string[] {
        return ['actress'];
    }

    public setup() {
        // console.log('hi')
    }

    public stage({actress}) {
        this.scene.add(actress);
    }

    public update({actress}, time, delta) {
        // actor.rotation.x += 0.02;
        // actor.rotation.y += 0.02;
        // actor.rotation.z += 0.02;
    }

}
