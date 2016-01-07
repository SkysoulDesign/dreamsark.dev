module DreamsArk.Compositions {

    import For = DreamsArk.Helpers.For;
    import length = DreamsArk.Helpers.length;
    import deg2rad = DreamsArk.Helpers.deg2rad;
    import Mouse = DreamsArk.Modules.Mouse;
    import Animator = DreamsArk.Modules.Animator;

    export class Landing implements Composable {

        elements() {
            return ['Logo', 'Ren', 'HexParticles'];
        }

        setup(scene, camera, elements) {

            var logo = <THREE.Object3D>elements.Logo,
                ren = <THREE.Object3D>elements.Ren;

            logo.scale.subScalar(0.977);
            logo.position.setX(0.5);
            logo.position.setY(1);

            ren.scale.subScalar(0.977);
            ren.position.setX(0.5);
            ren.position.setY(1);
            ren.position.setZ(0.2);

            scene.add(logo, ren, elements.HexParticles, elements.HexParticles.userData.layers.outer);

            camera.position.z = 30

        }

        update(scene, camera, elements) {

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
                particlesBlurOutPositions.array[i * 3 + 2] += particlesVelocities[i].z / 20;

            });

            particlesPositions.needsUpdate = true;
            particlesBlurPositions.needsUpdate = true;

        }

    }

}