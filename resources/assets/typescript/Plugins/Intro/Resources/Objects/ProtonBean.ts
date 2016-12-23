import { ObjectInterface } from "../../Interfaces/ObjectInterface";
import { Forgable } from "../../Abstracts/Forgable";
import { random, deg2rad, configureTexture } from "../../Helpers";

let Proton: any = require('../../../../../../../public/js/three.proton.js');

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

        let proton = new Proton(),
            emitter = new Proton.Emitter(),
            sprite = this.createSprite();

        //setRate
        emitter.rate = new Proton.Rate(new Proton.Span(1, 4), 0);

        //addInitialize
        emitter.addInitialize(new Proton.Position(new Proton.PointZone(0, -32, 7)));
        emitter.addInitialize(new Proton.Mass(1));
        emitter.addInitialize(new Proton.Life(0.5, 1));
        emitter.addInitialize(new Proton.Body(sprite));
        emitter.addInitialize(new Proton.Radius(30, 1));
        emitter.addInitialize(new Proton.V(45, new Proton.Vector3D(0, -50, 0), 0));
        // emitter.addInitialize(new Proton.Velocity(3, new Proton.Vector3D(0, -10, 0), 5));
        // console.log(emitter)
        // console.log(proton)

        //addBehaviour
        // emitter.addBehaviour(new Proton.Alpha(1, 0));
        // emitter.addBehaviour(new Proton.Scale([1,2], [.3,1]));
        emitter.addBehaviour(new Proton.Force(0, -5, 0));

        let color1 = new THREE.Color('#4F1500');
        let color2 = new THREE.Color('#0029FF');
        let colorBehaviour = new Proton.Color(color1, color2);
        emitter.addBehaviour(colorBehaviour);

        // emitter.emit();

        //add emitter
        // proton.addEmitter(emitter);

        console.log(emitter)

        //add renderer
        proton.addRender(new Proton.SpriteRender(this.app.scene));

        proton.userData = {
            emitter: emitter,
            proton: proton,
            colors: {
                a: color1,
                b: color2
            },
            offset: -200,
            ajust: 32,
            inverse: false,
            sprite: sprite,
            object: new THREE.Object3D,
            update: this.update.bind(this, proton, emitter)
        };

        return proton;

    }

    public update(proton: any, emitter, time, delta) {

        proton.update();

        let position = proton.userData.object.getWorldPosition();

        emitter.p.x = position.x;
      
        if (!proton.userData.inverse) {
            emitter.p.y = position.y - proton.userData.ajust;
            emitter.p.z = position.z;
        } else {
            emitter.p.y = position.y;
            emitter.p.z = proton.userData.offset;
        }

    }

    public createSprite() {

        let material = new THREE.SpriteMaterial({
            map: configureTexture(this.sprite, this.maps, 'star'),
            color: 0xff0000,
            blending: THREE.AdditiveBlending,
            // depthTest: false
        });

        return new THREE.Sprite(material);

    }

}
