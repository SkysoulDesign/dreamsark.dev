import { MaterialInterface } from "../../Interfaces/LoadersInterfaces";

export class ShaderMaterial implements MaterialInterface {

    private mGLContext;
    private mQuadVBO;
    private mProgram;
    private mTexture;

    constructor(private app) { }

    public get textures() {
        return {
            'sprite-1.png': '/assets/img/sprite-1.png',
            'sprite-2.png': '/assets/img/sprite-2.png',
            'sprite-3.png': '/assets/img/sprite-3.png',
            'sprite-4.png': '/assets/img/sprite-4.png',
            'sprite-5.png': '/assets/img/sprite-5.png',
            'sprite-6.png': '/assets/img/sprite-6.png',
            'sprite-7.png': '/assets/img/sprite-7.png',
            'sprite-8.png': '/assets/img/sprite-8.png',
        }
    }

    public create(textures) {

        // let uniforms = {
        //     time: { value: 1.0 },
        //     resolution: { value: new THREE.Vector2() },
        //     texture: { value: sprite }
        // }

        // uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;

        let uniforms = {
            alpha: { type: "f", value: 1.0 },
            angle: { type: "f", value: 0.0 },
            waves: { type: "f", value: 1.0 },
            warp: { type: "f", value: 2.0 },
            frequency: { type: "f", value: .5 },
            texture: { type: "t", value: null },
        }

        let shader = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: <string>require('raw!../Shaders/Streak.vert.shader'),
            fragmentShader: <string>require('raw!../Shaders/Streak.frag.shader'),
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: .8
        });

        shader['userData'] = {
            uniforms, textures
        }

        return shader;

    }

}
