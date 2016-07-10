import {Character} from "../Abstract/Character";

/**
 * Character: Designer
 */
export class Designer extends Character {

    public defer:Boolean = true;
    public animator;

    models() {
        return {
            miku: '/models/miku.min.json',
            man: '/models/Screenwriter.json',
        }
    }

    create(models, ...materials) {

        // materials.forEach(function (material) {
        //     material.skinning = true;
        // });

        var material = new THREE.MeshStandardMaterial({
            vertexColors: THREE.VertexColors
        })

        let mesh = new THREE.SkinnedMesh(
            models.man,
            material
        );

        let action = {};

        let mixer = this.animator.create(mesh);

        action.idle = mixer.clipAction(models.man.animations[0]);

        //http://yomotsu.net/blog/2015/10/31/three-r73-anim.html
        // action.idle.setEffectiveWeight(1);
        // action.run.setEffectiveWeight(1);
        // action.jump.setEffectiveWeight(1);
        // action.slide.setEffectiveWeight(1);

        // action.jump.setLoop(THREE.LoopOnce, 0);
        // action.slide.setLoop(THREE.LoopOnce, 0);
        // action.jump.clampWhenFinished = true;
        // action.slide.clampWhenFinished = true;

        action.idle.play();

        // let mesh = new THREE.SkinnedMesh(object, material);
        // console.log(mesh.animations)
        // let animation = new THREE.Animation(model, model.animations);

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
