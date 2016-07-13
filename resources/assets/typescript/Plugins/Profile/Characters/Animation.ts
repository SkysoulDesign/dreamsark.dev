import {Character} from "../Abstract/Character";

/**
 * Character: Animation
 */
export class Animation extends Character {

    public defer:Boolean = true;
    public animator;

    models() {
        return {
            character: '/models/Animation.json',
        }
    }

    create(models, ...materials) {

        materials.forEach(function(material){
            material.skinning = true;
        })

        let mesh = new THREE.SkinnedMesh(
            models.character,
            materials[0]
        );

        let action = {};

        let mixer = this.animator.create(mesh);

        action.idle = mixer.clipAction(models.character.animations[0]);
        action.idle.setEffectiveWeight(1);
        action.idle.play();

        mesh.position.setY(-25)
        mesh.rotation.y = Math.PI

        return mesh;

    }

    material() {
        return new THREE.MeshBasicMaterial({
            color: 0xff0000, wireframe: true
        });
    }

}
