module DreamsArk.Compositions {

    import For = DreamsArk.Helpers.For;
    import length = DreamsArk.Helpers.length;
    import each = DreamsArk.Helpers.each;
    import random = DreamsArk.Helpers.random;
    import deg2rad = DreamsArk.Helpers.deg2rad;
    import Mouse = DreamsArk.Modules.Mouse;
    import Animator = DreamsArk.Modules.Animator;

    /**
     * Landing Page Composition
     */
    export class Landing implements Composable {

        elements() {
            return ['Logo', 'EnterPage', 'SecondaryLogo', 'ChaosParticles'];
        }

        setup(scene, camera, elements) {

            var logo = <THREE.Mesh>elements.Logo,
                enterPage = elements.EnterPage,
                secondaryLogo = elements.SecondaryLogo,
                ChaosParticles = elements.ChaosParticles;

            enterPage.userData.start = function () {
                new Composition('Loading');
            };

            scene.add(logo, enterPage, secondaryLogo, ChaosParticles);

            camera.position.z = 30

        }

        update(scene, camera, elements, elapsed) {

            var logo = elements.Logo,
                enterPage = elements.EnterPage,
                secondaryLogo = elements.SecondaryLogo,
                ChaosParticles = elements.ChaosParticles;

            enterPage.userData.parallex(logo);

            secondaryLogo.userData.animation.update(elapsed);
            ChaosParticles.userData.update();

            each(secondaryLogo.children, function (element, i) {

                if (element.position.y >= 160)
                    element.position.set(random.between(-200, 200), -160, 0);

                element.position.y += secondaryLogo.userData.velocity[i];

            });

        }

    }

}