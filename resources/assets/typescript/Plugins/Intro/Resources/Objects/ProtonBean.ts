import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random, deg2rad, configureTexture } from "../../Helpers";

let Proton = require('../../../../../../../public/js/three.proton.js');

/**
 * Proton
 */
export class ProtonBean extends Forgable implements ObjectInterface {

    private maps;

    get materials() {
        return {
            material: 'IntroDefaultMaterial'
        }
    }

    create(models, {material}) {

        /**
         * Save raw sprites
         */
        this.maps = material.userData;

        var proton = new Proton();
        var emitter = new Proton.Emitter();

        //setRate
        emitter.rate = new Proton.Rate(new Proton.Span(5, 7), new Proton.Span(.01, .02));

        //addInitialize
        emitter.addInitialize(new Proton.Position(new Proton.PointZone(0, 10, 7)));
        emitter.addInitialize(new Proton.Mass(1));
        emitter.addInitialize(new Proton.Life(0.5, 1));
        emitter.addInitialize(new Proton.Body(this.createSprite()));
        emitter.addInitialize(new Proton.Radius(40, 1));
        // emitter.addInitialize(new Proton.V(45, new Proton.Vector3D(0, -10, 0), 0));
        // emitter.addInitialize(new Proton.Velocity(3, 1, 'polar'));
        console.log(emitter)

        //addBehaviour
        // emitter.addBehaviour(new Proton.Alpha(1, 0));
        // emitter.addBehaviour(new Proton.Scale([1,2], [.3,1]));
        emitter.addBehaviour(new Proton.Force(0, -1.5, 0));

        var color1 = new THREE.Color('#4F1500');
        var color2 = new THREE.Color('#0029FF');
        var colorBehaviour = new Proton.Color(color1, color2);
        emitter.addBehaviour(colorBehaviour);

        emitter.emit();

        //add emitter
        proton.addEmitter(emitter);

        //add renderer
        proton.addRender(new Proton.SpriteRender(this.app.scene));

        proton.userData = {
            position: new THREE.Vector3(),
            update: this.update.bind(this, proton, emitter)
        };

        return proton;

    }

    public update(proton: any, emitter, time, delta) {

        proton.update();

        emitter.p.x = proton.userData.position.x;
        emitter.p.y = proton.userData.position.y;
        emitter.p.z = proton.userData.position.z;

    }

    public createSprite() {

        let material = new THREE.SpriteMaterial({
            map: configureTexture(this.sprite, this.maps, 'star'),
            color: 0xff0000,
            blending: THREE.AdditiveBlending,
        });

        return new THREE.Sprite(material);

    }

}
