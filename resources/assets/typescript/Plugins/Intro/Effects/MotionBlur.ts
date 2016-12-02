export class MotionBlur {

    private pass;
    private composer;
    private composer2;

    private camera;

    constructor({scene, camera, renderer}) {

        this.camera = camera;

        this.composer = new THREE.EffectComposer(renderer);
        this.composer.addPass(new THREE.RenderPass(scene, camera));

        this.composer2 = new THREE.EffectComposer(renderer);
        this.composer2.addPass(new THREE.RenderPass(scene, camera));

        let shader = {
            uniforms: {
                tDiffuse: { type: 't', value: null },
                tColor: { type: 't', value: null },
                resolution: { type: 'v2', value: new THREE.Vector2(1, 1) },
                viewProjectionInverseMatrix: { type: 'm4', value: new THREE.Matrix4() },
                previousViewProjectionMatrix: { type: 'm4', value: new THREE.Matrix4() },
                velocityFactor: { type: 'f', value: 1 }
            },
            vertexShader: <string>require('raw!../Resources/Shaders/MotionBlur/MotionBlur.vert.shader'),
            fragmentShader: <string>require('raw!../Resources/Shaders/MotionBlur/MotionBlur.frag.shader')
        }

        this.pass = new THREE.ShaderPass(shader);
        this.pass.renderToScreen = true;

        this.composer.addPass(this.pass);

    }

    public update() {

        if (t - lastTime > (1000 / params.fps)) {

            this.pass.material.uniforms.velocityFactor.value = params.blur;
            animationSpeed = .001 * params.speed;

            if (params.animate) {
                this.camera.position.z = 500 * Math.sin(animationSpeed * .11 * t);
                this.camera.position.x = 500 * Math.sin(animationSpeed * .111 * t);
                this.camera.position.y = 500 * Math.sin(animationSpeed * .121 * t);

                this.camera.rotation.x = animationSpeed * .1 * t;
                this.camera.rotation.y = animationSpeed * .11 * t;
                this.camera.rotation.z = animationSpeed * .12 * t;
            }

            this.camera.updateMatrix();
            this.camera.updateMatrixWorld();

            tmpArray.copy(this.camera.matrixWorldInverse);
            tmpArray.multiply(this.camera.projectionMatrix);
            mCurrent.getInverse(tmpArray);

            this.pass.material.uniforms.viewProjectionInverseMatrix.value.copy(mCurrent);
            this.pass.material.uniforms.previousViewProjectionMatrix.value.copy(mPrev);

            mesh.material = meshMaterial;
            mesh2.material = meshMaterial2;
            sphere.material = sphereMaterial;
            composer2.render();

            mesh.material = depthMaterial;
            mesh2.material = depthMaterial;
            sphere.material = depthMaterial;
            this.pass.material.uniforms.tColor.value = this.composer2.renderTarget2;
            this.composer.render();

            mPrev.copy(tmpArray);

            prevCamPos.copy(this.camera.position);

            lastTime = t;

        }
        //renderer.render( scene, camera );

    }

}