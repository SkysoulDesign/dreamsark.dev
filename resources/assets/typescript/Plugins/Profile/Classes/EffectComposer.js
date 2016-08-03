"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('../../../../../../node_modules/three/examples/js/shaders/SSAOShader');
require('../../../../../../node_modules/three/examples/js/shaders/CopyShader');
require('../../../../../../node_modules/three/examples/js/postprocessing/EffectComposer');
require('../../../../../../node_modules/three/examples/js/postprocessing/RenderPass');
require('../../../../../../node_modules/three/examples/js/postprocessing/ShaderPass');
require('../../../../../../node_modules/three/examples/js/postprocessing/MaskPass');
var EffectComposer = (function (_super) {
    __extends(EffectComposer, _super);
    function EffectComposer(app) {
        _super.call(this, app.renderer);
    }
    EffectComposer.prototype.boot = function (app) {
        this.renderer = app.renderer;
        this.scene = app.scene;
        this.camera = app.camera;
        this.browser = app.browser;
        var renderPass = new THREE.RenderPass(this.scene, this.camera);
        // Setup depth pass
        this.depthMaterial = new THREE.MeshDepthMaterial();
        this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
        this.depthMaterial.blending = THREE.NoBlending;
        var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter };
        this.depthRenderTarget = new THREE.WebGLRenderTarget(this.browser.width, this.browser.height, pars);
        // Setup SSAO pass
        var ssaoPass = new THREE.ShaderPass(THREE.SSAOShader);
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
        console.log(this.depthRenderTarget);
    };
    EffectComposer.prototype.update = function (time, delta) {
        this.scene.overrideMaterial = this.depthMaterial;
        this.renderer.render(this.scene, this.camera, this.depthRenderTarget, true);
        // this.scene.overrideMaterial = null;
        this.render(delta);
    };
    return EffectComposer;
}(THREE.EffectComposer));
exports.EffectComposer = EffectComposer;
//# sourceMappingURL=EffectComposer.js.map