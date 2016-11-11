import { MaterialInterface } from "../../Interfaces/LoadersInterfaces";

export class ShaderMaterial implements MaterialInterface {

    private mGLContext;
    private mQuadVBO;
    private mProgram;
    private mTexture;

    constructor(private app) { }

    public get textures() {
        return {
            'rgb': '/assets/img/sky_RGB_half.jpg',
            'alpha': '/assets/img/paintStreak_02_half.png',
        }
    }

    public create({rgb, alpha}) {

        // let uniforms = {
        //     time: { value: 1.0 },
        //     resolution: { value: new THREE.Vector2() },
        //     texture: { value: sprite }
        // };

        // uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;

        let uniforms = {
            offset: { type: "f", value: 1.0 },
            offsetMult: { type: "f", value: 1.0 },
            fade: { type: "f", value: 0.0 },
            power: { type: "f", value: 1.0 },
            warp: { type: "f", value: 0.0 },
            warpSpeed: { type: "f", value: 1.0 },
            repeat: { type: "f", value: 1.0 },
            camMat: { type: 'm4', value: new THREE.Matrix4() },
            textureColor: { type: "t", value: null },
            textureAlpha: { type: "t", value: null },
            Color1: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
            Color2: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
            Color3: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
        }

        let shader = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: <string>require('raw!../Shaders/test.vert.shader'),
            fragmentShader: <string>require('raw!../Shaders/test.frag.shader'),
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: .5
        });

        shader['userData'] = {
            rgb, alpha
        }

        return shader;


    }

}
