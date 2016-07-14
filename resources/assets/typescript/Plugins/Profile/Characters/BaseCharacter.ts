import {Character} from "../Abstract/Character";

export abstract class BaseCharacter extends Character {
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
            actions[animation.name] = mixer.clipAction(animation);
            actions[animation.name].play();
        })

        mesh.position.setY(-25)
        mesh.rotation.y = Math.PI

//         var text = document.createElement('div');
//         text.style.position = 'absolute';
//         text.style.color = 'black';
//         text.innerHTML = 'Oh hai!';
// //
//         text.style.left = mesh.position.x + 'px';
//         text.style.top = mesh.position.y + 'px';
//
//         document.body.appendChild(text)

        return mesh;

    }
}
