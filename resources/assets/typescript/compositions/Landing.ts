module DreamsArk.Compositions {

    import For = DreamsArk.Helpers.For;
    import length = DreamsArk.Helpers.length;
    import each = DreamsArk.Helpers.each;
    import random = DreamsArk.Helpers.random;
    import deg2rad = DreamsArk.Helpers.deg2rad;
    import Mouse = DreamsArk.Modules.Mouse;
    import Animator = DreamsArk.Modules.Animator;

    export class Landing implements Composable {

        elements() {
            return ['Logo', 'EnterPage', 'SecondaryLogo'];
        }

        setup(scene, camera, elements) {

            var logo = <THREE.Object3D>elements.Logo,
                enterPage = elements.EnterPage,
                secondaryLogo = elements.SecondaryLogo;

            enterPage.userData.start = function () {
                new Composition('Loading');
            };

            scene.add(logo, enterPage, secondaryLogo);

            camera.position.z = 30

        }

        update(scene, camera, elements, elapsed) {

            var logo = elements.Logo,
                enterPage = elements.EnterPage,
                secondaryLogo = elements.SecondaryLogo;

            enterPage.userData.parallex(logo);

            secondaryLogo.userData.animation.update(elapsed);

            each(secondaryLogo.children, function (element, i) {

                if (element.position.y >= 160)
                    element.position.set(random.between(-200, 200), -160, 0);

                element.position.y += secondaryLogo.userData.velocity[i];

            });


        }

    }

}