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
            return ['Logo', 'Ren', 'HexParticles', 'EnterPage', 'SecondaryLogo'];
        }

        setup(scene, camera, elements) {

            var logo = <THREE.Object3D>elements.Logo,
                ren = <THREE.Object3D>elements.Ren;


            //logo.position.setX(0.5);
            //logo.position.setY(1);
            //
            //ren.scale.subScalar(0.977);
            //ren.position.setX(0.5);
            //ren.position.setY(1);
            //ren.position.setZ(0.2);

            scene.add(logo);

            scene.add(elements.EnterPage, elements.SecondaryLogo)

            camera.position.z = 30

        }

        update(scene, camera, elements, elapsed) {

            var secondaryLogo = elements.SecondaryLogo;

            secondaryLogo.userData.animation.update(elapsed);

            each(secondaryLogo.children, function (element, i) {

                if (element.position.y >= 160)
                    element.position.set(random.between(-200, 200), -160, 0);

                element.position.y += secondaryLogo.userData.velocity[i];

            });

            var particles = elements.HexParticles,
                particlesPositions = particles.geometry.attributes.position,
                particlesBlurPositions = elements.HexParticles.userData.layers.outer.geometry.attributes.position,
                particlesBlurOutPositions = elements.HexParticles.userData.layers.out.geometry.attributes.position,
                particlesVelocities = particles.userData.velocity;

            particles.position.y = camera.position.y;

            For(particlesPositions.count, function (i) {

                if (particlesPositions.array[i * 3 + 2] > 80)
                    particlesPositions.array[i * 3 + 2] = -80;

                if (particlesBlurPositions.array[i * 3 + 2] > 80)
                    particlesBlurPositions.array[i * 3 + 2] = -80;

                if (particlesBlurOutPositions.array[i * 3 + 2] > 80)
                    particlesBlurOutPositions.array[i * 3 + 2] = -80;

                particlesPositions.array[i * 3 + 2] += particlesVelocities[i].z / 2;
                particlesBlurPositions.array[i * 3 + 2] += particlesVelocities[i].z / 10;
                particlesBlurOutPositions.array[i * 3 + 2] += particlesVelocities[i].z / 10;

            });

            particlesPositions.needsUpdate = true;
            particlesBlurPositions.needsUpdate = true;
            particlesBlurOutPositions.needsUpdate = true;

        }

    }

}