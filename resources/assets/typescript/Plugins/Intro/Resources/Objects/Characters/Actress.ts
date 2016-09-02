// import {BaseCharacter} from "../../Abstracts/BaseCharacter";
import {ObjectInterface} from "../../../Interfaces/ObjectInterface";

/**
 * Character: Actress
 */
export class Actress implements ObjectInterface {

    get models() {
        return {
            character: '/models/Actress.json',
        }
    }

    get materials() {
        return {
            material: 'CharacterDefaultMaterial'
        }
    }

    get animations() {
        return {
            animation: 'baseAnimation'
        }
    }

    public animate({animation}) {

    }

    public create({character}, {material}) {

        return new THREE.SkinnedMesh(
            character, material
        );

        // console.log(animation)

        // this.animator.create(character, animation);

        // let actions = {},
        //     mixer = this.animator.create(mesh);
        //
        // this.animation.get('baseAnimation', models.character.bones, mixer).then(animations => {
        //     animations.base.idle.play();
        //     animations.base.lookAround.play();
        // })
        //
        // /**
        //  * Play All Animations
        //  */
        // if (models.character.animations)
        //     models.character.animations.forEach(function (animation) {
        //         actions[animation.name] = mixer.clipAction(animation);
        //         actions[animation.name].play();
        //     })

        return mesh;
    }

}
