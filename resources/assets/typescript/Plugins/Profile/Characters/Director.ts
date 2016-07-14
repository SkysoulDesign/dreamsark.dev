import {Character} from "../Abstract/Character";

/**
 * Character: Designer
 */
export class Director extends Character {

    public defer:Boolean = true;
    public animator;
    public animation;
    public material;

    models() {
        return {
            character: '/models/Director.json',
        }
    }

    create(models, ...materials) {

        let mesh = new THREE.SkinnedMesh(
            models.character,
            this.material.get('baseMaterial')
        );

        let mixer = this.animator.create(mesh);

        this.animation.get('baseAnimation', models.character.bones, mixer).then(animations => {
            animations.base.directorIdle.play();
        })

        mesh.position.setY(-25)
        mesh.rotation.y = Math.PI

        return mesh;

    }

}
