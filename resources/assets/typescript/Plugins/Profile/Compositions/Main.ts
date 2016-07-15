import {AbstractComposition} from "../Abstract/AbstractComposition";

/**
 * Main Composition
 */
export class Main extends AbstractComposition {

    private app;
    private scene;
    private randomProfile;

    characters() {
        return [
            this.randomProfile
        ]
    }

    setup(app, container, randomProfile) {

        this.app = app;
        this.randomProfile = randomProfile;

        document.querySelector(container).addEventListener('click', e => {

            let target = <HTMLElement>e.target;

            if (target.dataset.hasOwnProperty('profileName')) {
                this.switch(target.dataset['profileName'])
            }

        })

    }

    stage(scene, camera, characters) {

        this.scene = scene;

        scene.add(
            characters[this.randomProfile]
        );

    }

    update(scene, camera, characters, time, delta) {

    }

    private switch(name) {

        this.app.characters.get(name).then(profile => {

            this.scene.remove(
                this.scene.children[1]
            );

            this.scene.add(profile);
            
        })

    }

}
