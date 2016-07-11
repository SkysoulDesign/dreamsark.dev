import {BootableInterface} from "../../../Interfaces/BootableInterface";

require('../../../../../../node_modules/three/examples/js/shaders/SSAOShader');
require('../../../../../../node_modules/three/examples/js/shaders/CopyShader');

require('../../../../../../node_modules/three/examples/js/postprocessing/EffectComposer');
require('../../../../../../node_modules/three/examples/js/postprocessing/RenderPass');
require('../../../../../../node_modules/three/examples/js/postprocessing/ShaderPass');
require('../../../../../../node_modules/three/examples/js/postprocessing/MaskPass');

export class EffectComposer extends THREE.EffectComposer implements BootableInterface {

    private scene;
    private camera;
    private renderer;
    private browser;

    private depthMaterial;
    private depthRenderTarget;

    public boot(app) {

        this.renderer = app.renderer;
        this.scene = app.scene;
        this.camera = app.camera;
        this.browser = app.browser;

        let renderPass = new THREE.RenderPass(this.scene, this.camera);

        // Setup depth pass
        this.depthMaterial = new THREE.MeshDepthMaterial();
        this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
        this.depthMaterial.blending = THREE.NoBlending;

        let pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter};

        this.depthRenderTarget = new THREE.WebGLRenderTarget(
            this.browser.width, this.browser.height, pars
        );

        // Setup SSAO pass
        let ssaoPass = new THREE.ShaderPass(THREE.SSAOShader);
        ssaoPass.renderToScreen = true;

        ssaoPass.uniforms["tDepth"].value = this.depthRenderTarget.texture;
        ssaoPass.uniforms['size'].value.set(this.browser.width, this.browser.height);
        ssaoPass.uniforms['cameraNear'].value = this.camera.near;
        ssaoPass.uniforms['cameraFar'].value = this.camera.far;
        ssaoPass.uniforms['onlyAO'].value = false;
        ssaoPass.uniforms['aoClamp'].value = 0.3;
        ssaoPass.uniforms['lumInfluence'].value = 0.5;

        // Add pass to effect composer
        this.addPass(renderPass);
        this.addPass(ssaoPass);

        console.log(this.depthRenderTarget)


    }

    constructor(app) {
        super(app.renderer)
    }

    public update(time, delta) {
        
        this.scene.overrideMaterial = this.depthMaterial;

        this.renderer.render(
            this.scene, this.camera, this.depthRenderTarget, true
        );

        // this.scene.overrideMaterial = null;
        this.render(delta);

    }

}
