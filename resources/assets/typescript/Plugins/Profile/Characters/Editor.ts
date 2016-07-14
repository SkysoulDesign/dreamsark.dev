import {Character} from "../Abstract/Character";

/**
 * Character: Editor
 */
export class Editor extends Character {

    public defer:Boolean = true;
    public animator;

    models() {
        return {
            character: '/models/Editor.json',
        }
    }

    // textures() {
    //     return {
    //         base: '/models/texture.png'
    //     }
    // }

    create(models, textures, ...materials) {

        let mesh = new THREE.SkinnedMesh(
            models.character,
            this.material.get('baseMaterial')
        );

        let action = {};

        let mixer = this.animator.create(mesh);

        action.idle = mixer.clipAction(models.character.animations[0]);
        action.idle.setEffectiveWeight(1);
        action.idle.play();

        mesh.position.setY(-25)
        mesh.rotation.y = Math.PI

        console.log(models.character.animations)

        return mesh;

    }

}