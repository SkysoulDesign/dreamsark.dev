import {AbstractComposition} from "../Abstract/AbstractComposition";
import {random} from "../../Helpers";

/**
 * Project Class
 */

let core;

export class Test extends AbstractComposition {


    setup(app, ...payload) {

    }

    stage(scene, camera, objects) {

        var buffer = new THREE.BufferGeometry(),
            positions = new Float32Array(50 * 3),
            material = new THREE.PointsMaterial({
                size: 10,
                sizeAttenuation: true,
            });

        for (let i = 0; i < positions.length / 3; i++) {

            positions[i * 3] = random(200, 100);
            positions[i * 3 + 1] = random(200, 100);
            positions[i * 3 + 2] = random(200, 100);

        }

        buffer.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true));

        core = new THREE.Points(buffer, material);

        scene.add(core);

    }

    update(scene, camera, objects, time, delta) {

        let positions = core.geometry.getAttribute('position');

        // for (let i = 0; i < positions.count; i++) {
        //     positions.array[i * 3] += random(0.2, 1);
        //     positions.array[i * 3 + 1] += random(0.2, 1);
        //     positions.array[i * 3 + 2] += random(0.2, 1);
        //
        //     if (positions.array[i * 3] > 100) {
        //         positions.array[i * 3] = 0
        //         positions.array[i * 3 + 1] = 0
        //         positions.array[i * 3 + 2] = 0
        //     }
        //
        // }

        positions.needsUpdate = true;

    }

}
