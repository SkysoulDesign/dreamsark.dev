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
            return ['Particles', 'HexParticles'];
        }

        setup(scene, camera, elements) {

            var animator = <Animator>module('Animator'),
                browser = <Browser>module('Browser'),
                mouse = <Mouse>module('Mouse');

            var logo = elements.Logo,
                enterPage = elements.EnterPage,
                secondaryLogo = elements.SecondaryLogo,
                hexParticles = elements.HexParticles;

            /**
             * Enter Tunnel
             */
            var animEnterTunnel = animator.backInOut({
                destination: {
                    rotation: new THREE.Vector3(deg2rad(90), 0, 0),
                    position: new THREE.Vector3(0, 0, 0),
                    logo: new THREE.Vector3(0, 10, -2),
                },
                origin: {
                    rotation: camera.rotation.toVector3(),
                    position: camera.position,
                    logo: logo.position,
                },
                duration: 5,
                autoStart: false,
                start(){
                    logo.userData.mouse.inverse = true;
                },
                update(params){

                    camera.rotation.setFromVector3(params.rotation);
                    camera.position.copy(params.position);

                    logo.position.copy(params.logo);

                    /**
                     * Enable movement on the way up
                     */
                    if (logo.userData.mouse.enabled === true) {
                        logo.position.z = params.logo.z + -mouse.screen.y * logo.userData.mouse.speed.z;
                    }

                },
                complete(){
                    timeout(5, function () {
                        new Composition('Universe');
                    })
                }

            });

            /**
             * Start Throwing Things down
             */
            animator.expoIn({
                destination: {
                    position: new THREE.Vector3(0, -browser.innerHeight, 0),
                    speed: 10
                },
                origin: {
                    position: enterPage.position,
                    speed: secondaryLogo.userData.speed
                },
                duration: 5,
                start: function () {
                    timeout(3, function () {
                        logo.userData.mouse.enabled = true;
                    });
                },
                update: function (params) {
                    enterPage.position.copy(params.position);
                    secondaryLogo.userData.speed = params.speed;
                },
                complete: function () {
                    animEnterTunnel.init()
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