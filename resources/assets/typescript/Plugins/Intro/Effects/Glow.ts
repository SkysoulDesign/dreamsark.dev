import { BootableInterface } from "../../../Interfaces/BootableInterface";
import { ModulesInterface } from "../Interfaces/ModulesInterface";

/**
 * Effect Class
 */
export class Glow {

    private shaders = {
        downSample: {
            vert: <string>require('raw!../Resources/Shaders/Glow/DownSample.vert.shader'),
            frag: <string>require('raw!../Resources/Shaders/Glow/DownSample.frag.shader')
        },
        blurV: {
            vert: <string>require('raw!../Resources/Shaders/Glow/Blur.vert.shader'),
            frag: <string>require('raw!../Resources/Shaders/Glow/BlurV.frag.shader')
        },
        blurH: {
            vert: <string>require('raw!../Resources/Shaders/Glow/Blur.vert.shader'),
            frag: <string>require('raw!../Resources/Shaders/Glow/BlurH.frag.shader')
        },
        toneMapping: {
            vert: <string>require('raw!../Resources/Shaders/Glow/ToneMapping.vert.shader'),
            frag: <string>require('raw!../Resources/Shaders/Glow/ToneMapping.frag.shader')
        }
    }

    private orthoCamera = new THREE.OrthographicCamera(0, 100, 0, -100, 0, 10000)

    private originalRenderTarget;
    private downSampleRenderTarget;
    private blurHRenderTarget;
    private blurVRenderTarget;
    public uniforms = {
        colorRange: { type: 'f', value: 0.7 },
        exposure: { type: 'f', value: 0.7 }
    }

    constructor(browser) {

        let downSampleResolution = new THREE.Vector2(browser.width / 2, browser.height / 2)
        let vec2 = new THREE.Vector2(1 / browser.width, 1 / browser.height)

        let downSampleShader = new THREE.ShaderMaterial({
            vertexShader: this.shaders.downSample.vert,
            fragmentShader: this.shaders.downSample.frag,
            uniforms: {
                texSample: { type: 't', value: null },
                PixelOffset: { type: 'vec2', value: vec2 },
                colorRange: this.uniforms.colorRange
            }
        });

        let blurHShader = new THREE.ShaderMaterial({
            vertexShader: this.shaders.blurH.vert,
            fragmentShader: this.shaders.blurH.frag,
            uniforms: {
                texSample: { type: 't', value: null },
                BlurOffset: { type: 'vec2', value: new THREE.Vector2(vec2.x, 0) }
            }
        });

        let blurVShader = new THREE.ShaderMaterial({
            vertexShader: this.shaders.blurV.vert,
            fragmentShader: this.shaders.blurV.frag,
            uniforms: {
                texSample: { type: 't', value: null },
                BlurOffset: { type: 'vec2', value: new THREE.Vector2(0, vec2.y) }
            }
        });

        let toneMappingShader = new THREE.ShaderMaterial({
            vertexShader: this.shaders.toneMapping.vert,
            fragmentShader: this.shaders.toneMapping.frag,
            uniforms: {
                tFull: { type: 't', value: null },
                tBlur: { type: 't', value: null },
                controlBlur: { type: 'f', value: 1 },
                exposure: this.uniforms.exposure
            }
        });

        console.log(this.uniforms)

        this.originalRenderTarget = new RenderTargetEffect(new THREE.Vector2(browser.width, browser.height), downSampleShader)
        this.downSampleRenderTarget = new RenderTargetEffect(downSampleResolution, blurHShader)
        this.blurHRenderTarget = new RenderTargetEffect(downSampleResolution, blurVShader)
        this.blurVRenderTarget = new RenderTargetEffect(downSampleResolution, toneMappingShader)

        downSampleShader.uniforms.texSample.value = this.originalRenderTarget.target.texture
        blurHShader.uniforms.texSample.value = this.downSampleRenderTarget.target.texture
        blurVShader.uniforms.texSample.value = this.blurHRenderTarget.target.texture

        toneMappingShader.uniforms.tFull.value = this.originalRenderTarget.target.texture
        toneMappingShader.uniforms.tBlur.value = this.blurVRenderTarget.target.texture

    }

    render({scene, camera, renderer}): void {

        renderer.render(
            scene, camera, this.originalRenderTarget.target
        );

        this.originalRenderTarget.render(renderer, this.orthoCamera, this.downSampleRenderTarget.target)
        this.downSampleRenderTarget.render(renderer, this.orthoCamera, this.blurHRenderTarget.target)
        this.blurHRenderTarget.render(renderer, this.orthoCamera, this.blurVRenderTarget.target)
        //this.blurVRenderTarget.render(renderer, this.orthoCamera)

        renderer.render(
            this.blurVRenderTarget.scene, this.orthoCamera
        );

    }

}

class RenderTargetEffect {

    public scene;
    public target;

    constructor(screen: THREE.Vector2, private shader: THREE.ShaderMaterial) {

        this.scene = new THREE.Scene();

        let mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100), shader
        );

        mesh.position.set(50, -50, 0)

        this.target = new THREE.WebGLRenderTarget(screen.x, screen.y);
        this.scene.add(mesh);

    }

    public render(renderer, camera, target) {
        renderer.render(
            this.scene, camera, target
        );
    }

}
