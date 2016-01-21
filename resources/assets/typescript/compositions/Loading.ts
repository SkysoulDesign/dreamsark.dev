module DreamsArk.Compositions {

    import For = DreamsArk.Helpers.For;
    import length = DreamsArk.Helpers.length;
    import deg2rad = DreamsArk.Helpers.deg2rad;
    import timeout = DreamsArk.Helpers.timeout;
    import Animator = DreamsArk.Modules.Animator;
    import Mouse = DreamsArk.Modules.Mouse;
    import query = DreamsArk.Helpers.query;
    import each = DreamsArk.Helpers.each;
    import random = DreamsArk.Helpers.random;
    import Browser = DreamsArk.Modules.Browser;
    import Renderer = DreamsArk.Modules.Renderer;

    /**
     * Loading Page Composition
     */
    export class Loading implements Composable {

        elements() {
            return ['Particles', 'HexParticles', 'Asteroid', 'Ripple'];
        }

        setup(scene, camera, elements) {

            var animator = <Animator>module('Animator'),
                browser = <Browser>module('Browser'),
                mouse = <Mouse>module('Mouse');

            var logo = elements.Logo,
                enterPage = elements.EnterPage,
                geometryHeight = enterPage.userData.layers.background.geometry.parameters.height,
                secondaryLogo = elements.SecondaryLogo,
                beam = secondaryLogo.userData.beam,
                hexParticles = elements.HexParticles,
                chaosParticles = elements.ChaosParticles,
                asteroid = elements.Asteroid,
                ripple = elements.Ripple;

            /**
             * Speed Up to Light Speed
             */
            var animLightSpeed = animator.expoOut({
                destination: {
                    zoom: 0.3,
                    scale: new THREE.Vector3(4, 3, 1),
                    inner: 0.3
                },
                origin: {
                    zoom: 2,
                    scale: enterPage.userData.layers.tunnelBG.scale,
                    inner: hexParticles.userData.layers.inner.material.size
                },
                duration: 5,
                delay: 2,
                autoStart: false,
                start(){
                    enterPage.remove(enterPage.userData.layers.galaxy)
                },
                update(params){

                    camera.zoom = params.zoom;
                    camera.updateProjectionMatrix();
                    hexParticles.userData.layers.inner.material.size = params.inner;

                    enterPage.userData.layers.tunnelBG.scale.copy(params.scale);

                }
            });

            /**
             * Enter Tunnel
             */
            var animEnterTunnel = animator.expoInOut({
                destination: {
                    rotation: new THREE.Vector3(deg2rad(90), 0, deg2rad(360)),
                    position: new THREE.Vector3(0, 0, 0),
                    logo: new THREE.Vector3(0, 10, -2),
                    inner: new THREE.Vector3(0, 0, 0),
                    zoom: 2
                },
                origin: {
                    rotation: camera.rotation.toVector3(),
                    position: camera.position,
                    logo: logo.position,
                    inner: hexParticles.userData.layers.inner.position,
                    zoom: camera.zoom
                },
                duration: 5,
                autoStart: false,
                start(){
                    logo.userData.mouse.inverse = true;

                    /**
                     * Frog
                     */
                    enterPage.userData.layers.tunnelBG.userData.shader = {
                        runtime: null,
                        click: null,
                        init(){
                            //var runtime = this.runtime = new ShaderFrogRuntime();
                            //this.clock = new THREE.Clock();
                            //runtime.registerCamera(camera);
                            //runtime.load('shaders/universe.json', function (shaderData) {
                            //    enterPage.userData.layers.tunnelBG.material = runtime.get(shaderData.name);
                            //});
                        }
                    };

                    enterPage.userData.layers.tunnelBG.userData.shader.init()

                },
                update(params){

                    camera.rotation.setFromVector3(params.rotation);
                    camera.position.copy(params.position);
                    camera.zoom = params.zoom;
                    camera.updateProjectionMatrix();

                    logo.position.copy(params.logo);

                    /**
                     * Enter Inner Particles
                     */
                    hexParticles.userData.layers.inner.position.copy(params.inner);

                    /**
                     * Enable movement on the way up
                     */
                    if (logo.userData.mouse.enabled === true) {
                        logo.position.z = params.logo.z + -mouse.screen.y * logo.userData.mouse.speed.z;
                    }

                },
                complete(){
                    animLightSpeed.init();
                    timeout(5, function () {
                        new Composition('Universe');
                    })
                }

            });

            var animAsteroid = animator.sineInOut({
                destination: {
                    position: -geometryHeight * 2,
                    asteroid: new THREE.Vector3(-100, -250, -150)
                },
                origin: {
                    position: -geometryHeight,
                    asteroid: asteroid.position.set(-100, 230, -150)
                },
                duration: 10,
                autoStart: false,
                start(){
                    scene.add(asteroid);
                },
                update(params){
                    enterPage.position.setY(params.position);
                    asteroid.position.copy(params.asteroid)
                },
                complete(){
                    animEnterTunnel.init();
                    scene.remove(asteroid)
                }
            });

            /**
             * Hide Inner particles and enter smoothly into transition
             */
            hexParticles.position.setY(200);
            hexParticles.userData.layers.inner.position.setY(500);

            /**
             * Start Throwing Things down
             */
            animator.expoInOut({
                destination: {
                    position: new THREE.Vector3(0, -geometryHeight, 0),
                    speed: 10,
                    hexParticles: new THREE.Vector3(0, 0, 0),
                    scale: new THREE.Vector3(3.5, 2.2, 1)
                },
                origin: {
                    position: enterPage.position,
                    speed: secondaryLogo.userData.speed,
                    hexParticles: hexParticles.position,
                    scale: beam.scale.set(1, 0.2, 1)
                },
                duration: 10,
                start: function () {

                    beam.position.y -= 11;

                    ripple.position.copy(logo.position);
                    ripple.position.y -= 7;

                    logo.add(beam);
                    enterPage.add(ripple);

                    timeout(1, function () {
                        logo.userData.mouse.enabled = true;
                    });
                },
                update: function (params, progress, on) {

                    enterPage.position.copy(params.position);
                    secondaryLogo.userData.speed = params.speed;
                    chaosParticles.position.setY(params.position.y);
                    hexParticles.position.setY(params.hexParticles.y);
                    beam.scale.copy(params.scale)
                },
                complete: function () {
                    animAsteroid.init();
                    scene.remove(chaosParticles);
                }

            });

            scene.add(hexParticles)

        }

        update(scene, camera, elements, elapsed) {

            var mouse = <Mouse>module('Mouse');

            var logo = elements.Logo,
                enterPage = elements.EnterPage,
                secondaryLogo = elements.SecondaryLogo,
                hexParticles = elements.HexParticles,
                ripple = elements.Ripple;

            /**
             * Frog
             */
            if (enterPage.userData.layers.tunnelBG.userData.shader)
                enterPage.userData.layers.tunnelBG.userData.shader.runtime.updateShaders(enterPage.userData.layers.tunnelBG.userData.shader.clock.getElapsedTime());

            secondaryLogo.userData.animation.update(elapsed);
            ripple.userData.animation.update(elapsed);

            hexParticles.userData.update();

            /**
             * Anim Ships up
             */
            each(secondaryLogo.children, function (element, i) {

                if (element.position.y >= 160)
                    element.position.set(random.between(-200, 200), -160, 0);

                element.position.y += secondaryLogo.userData.velocity[i] + secondaryLogo.userData.speed;

            });

            /**
             * Logo Follow Mouse
             */
            if (logo.userData.mouse.enabled === true && logo.userData.mouse.inverse === false) {

                logo.position.x = mouse.screen.x * logo.userData.mouse.speed.x;
                logo.position.y = -mouse.screen.y * logo.userData.mouse.speed.y + camera.position.y;

            }

            if (logo.userData.mouse.enabled === true && logo.userData.mouse.inverse === true) {

                logo.position.x = mouse.screen.x * logo.userData.mouse.speed.x;
                logo.position.z = -mouse.screen.y * logo.userData.mouse.speed.z;

            }

        }

    }

}