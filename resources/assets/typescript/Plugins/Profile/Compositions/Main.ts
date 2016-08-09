import {AbstractComposition} from "../Abstract/AbstractComposition";
import {toCamelCase} from "../../../Helpers";

/**
 * Main Composition
 */
export class Main extends AbstractComposition {

    private app;
    private scene;
    private activeProfile;

    objects() {
        return [
            'base',
            this.activeProfile
        ]
    }

    setup(app, container, activeProfile) {

        this.app = app;
        this.activeProfile = toCamelCase(activeProfile);

        document.querySelector(container).addEventListener('click', e => {

            let target = <HTMLElement>e.target;

            if (target.dataset.hasOwnProperty('profileName')) {
                this.switch(target.dataset['profileName'], target.dataset['localizedName'])
            }

        })

    }

    stage(scene, camera, objects) {

        this.scene = scene;

        objects.base.position.set(0, -25, 2);
        objects.base.rotation.y = Math.PI;

        scene.add(
            objects[this.activeProfile], objects.base
        );

    }

    update(scene, camera, objects, time, delta) {}

    private switch(name, localized) {

        window['dreamsark'].vueInstance.$set('position', name);

        this.app.objects.get(name).then(profile => {

            if (this.activeProfile == profile.name)
                return console.log('already active');

            let current = this.scene.getObjectByName(
                this.activeProfile
            )

            this.scene.remove(
                this.scene.remove(current)
            );

            this.scene.add(profile);
            this.activeProfile = profile.name;

        })

    }

}
