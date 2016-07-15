import {AbstractComposition} from "../Abstract/AbstractComposition";
import {toCamelCase} from "../../../Helpers";

/**
 * Main Composition
 */
export class Main extends AbstractComposition {

    private app;
    private scene;
    private activeProfile;

    characters() {
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
                this.switch(target.dataset['profileName'])
            }

        })

    }

    stage(scene, camera, characters) {

        this.scene = scene;

        characters.base.position.set(0,-25,2)
        characters.base.rotation.y = Math.PI;

        scene.add(
            characters[this.activeProfile],
            characters.base
        );

    }

    update(scene, camera, characters, time, delta) {

    }

    private switch(name) {

        this.app.characters.get(name).then(profile => {

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
