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

    export class Loading implements Composable {

        elements() {
            return ['Particles', 'HexParticles', 'Asteroid'];
        }

        setup(scene, camera, elements) {

            var animator = <Animator>module('Animator'),
                browser = <Browser>module('Browser'),
                mouse = <Mouse>module('Mouse');

            var logo = elements.Logo,
                enterPage = elements.EnterPage,
                secondaryLogo = elements.SecondaryLogo,
                hexParticles = elements.HexParticles,
                chaosParticles = elements.ChaosParticles,
                asteroid = elements.Asteroid;

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
                    position: -browser.innerHeight * 1.9,
                    asteroid: new THREE.Vector3(-100, -250, -150)
                },
                origin: {
                    position: -browser.innerHeight * 1.5,
                    asteroid: asteroid.position.set(-100, 220, -150)
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
                    position: new THREE.Vector3(0, -browser.innerHeight * 1.5, 0),
                    speed: 10,
                    hexParticles: new THREE.Vector3(0, 0, 0)
                },
                origin: {
                    position: enterPage.position,
                    speed: secondaryLogo.userData.speed,
                    hexParticles: hexParticles.position
                },
                duration: 10,
                start: function () {
                    timeout(1, function () {
                        logo.userData.mouse.enabled = true;
                    });
                },
                update: function (params) {
                    enterPage.position.copy(params.position);
                    secondaryLogo.userData.speed = params.speed;
                    chaosParticles.position.setY(params.position.y);
                    hexParticles.position.setY(params.hexParticles.y)
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
                hexParticles = elements.HexParticles;

            secondaryLogo.userData.animation.update(elapsed);
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