import {Character} from "../Abstract/Character";

/**
 * Character: Animation
 */
export class Animation extends Character {

    models() {
        return {
            character: '/models/Animation.json',
        }
    }

    create(models, ...materials) {

        let mesh = new THREE.SkinnedMesh(
            models.character,
            this.material.get('baseMaterial')
        );

        let actions = {},
            mixer = this.animator.create(mesh);

        this.animation.get('baseAnimation', models.character.bones, mixer).then(animations => {
            animations.base.idle.play();
            animations.base.lookAround.play();
        })

        /**
         * Play All Animations
         */
        models.character.animations.forEach(function (animation) {
            animation.skinning = true;
            actions[animation.name] = mixer.clipAction(animation);
            actions[animation.name].play();
        })

        mesh.position.setY(-25)
        mesh.rotation.y = Math.PI

        return mesh;

    }

}
