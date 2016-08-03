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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0Q29tcG9zZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFZmZlY3RDb21wb3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxPQUFPLENBQUMscUVBQXFFLENBQUMsQ0FBQztBQUMvRSxPQUFPLENBQUMscUVBQXFFLENBQUMsQ0FBQztBQUUvRSxPQUFPLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQztBQUMxRixPQUFPLENBQUMsNEVBQTRFLENBQUMsQ0FBQztBQUN0RixPQUFPLENBQUMsNEVBQTRFLENBQUMsQ0FBQztBQUN0RixPQUFPLENBQUMsMEVBQTBFLENBQUMsQ0FBQztBQUVwRjtJQUFvQyxrQ0FBb0I7SUFtRHBELHdCQUFZLEdBQUc7UUFDWCxrQkFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQTNDTSw2QkFBSSxHQUFYLFVBQVksR0FBRztRQUVYLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUUzQixJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0QsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7UUFDekQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUUvQyxJQUFJLElBQUksR0FBRyxFQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQ2hELENBQUM7UUFFRixrQkFBa0I7UUFDbEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RCxRQUFRLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUUvQixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQ25FLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdFLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3pELFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3ZELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMxQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDekMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBRTlDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUd2QyxDQUFDO0lBTU0sK0JBQU0sR0FBYixVQUFjLElBQUksRUFBRSxLQUFLO1FBRXJCLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUVqRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDaEIsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQ3hELENBQUM7UUFFRixzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2QixDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBcEVELENBQW9DLEtBQUssQ0FBQyxjQUFjLEdBb0V2RDtBQXBFWSxzQkFBYyxpQkFvRTFCLENBQUEifQ==