import {Animator} from "../../Modules/Animator";
import {ObjectInterface} from "../../Interfaces/ObjectInterface";

export abstract class BaseCharacter implements ObjectInterface  {

    private animator: Animator;

    constructor({animator}) {
        this.animator = animator
    };

    get materials() {
        return {
            material: 'CharacterDefaultMaterial'
        }
    }

    get animations() {
        return {
            animation: '/animations/BaseAnimation.anim'
        }
    }

    public configAnimation(): void {}

    public create({character}, {material}, {animation}): THREE.Object3D {

        let mesh = new THREE.SkinnedMesh(
            character, material
        );

        return mesh;

    }
}
