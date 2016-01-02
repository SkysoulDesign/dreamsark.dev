module DreamsArk.Compositions {

    import Animator = DreamsArk.Modules.Animator;
    import Renderer = DreamsArk.Modules.Renderer;
    import Browser = DreamsArk.Modules.Browser;
    import For = DreamsArk.Helpers.For;

    export class Universe implements Composable {

        elements() {
            return ['Plexus'];
        }

        setup(scene, camera, elements) {

            var animator = <Animator>module('Animator'),
                renderer = module('Renderer'),
                browser = <Browser>module('Browser');

            var logo = elements.Logo,
                tunnel = elements.Tunnel,
                plexus = elements.Plexus,
                skybox = elements.Skybox;

            skybox.userData.controls = new THREE.TrackballControls(camera, renderer.domElement);
            skybox.userData.controls.target.set(0, browser.innerHeight, -1);
            //skybox.userData.controls.update();

            /**
             * Center Camera
             */
            animator.circOut({
                destination: {
                    position: new THREE.Vector3(0, 0, 50),
                    rotation: new THREE.Vector3(0, 0, 0)
                },
                origin: {
                    position: camera.position,
                    rotation: camera.rotation.toVector3()
                },
                duration: 3,
                update: function (params) {
                    //camera.position.copy(params.position);
                    //camera.rotation.setFromVector3(params.rotation);
                }
            });

            /**
             * Speed up Logo
             */
            animator.expoIn({
                destination: new THREE.Vector3(0, 0, -800),
                origin: logo.position,
                duration: 5,
                update: function (params) {
                    //logo.position.copy(params)
                }
            });

            /**
             * Remove Tunnel
             */
            animator.expoIn({
                destination: new THREE.Vector3(0, 0, 800),
                origin: tunnel.position,
                duration: 5,
                update: function (params) {
                    //tunnel.position.copy(params)
                }
            });

            /**
             * Go to Target
             */
            animator.expoIn({
                destination: {
                    target: new THREE.Vector3(0, 0, 0)
                },
                origin: {
                    target: skybox.userData.controls.target
                },
                duration: 2,
                update: function (params) {
                    skybox.userData.controls.target.copy(params.target)
                }
            });

            scene.add(plexus);

        }

        update(scene, camera, elements) {

            var skybox = elements.Skybox;

            /**
             * Controls
             */
            if (skybox.userData.controls)
                skybox.userData.controls.update();

            var hex = elements.Plexus.userData.hex,
                hexBag = elements.Plexus.userData.hexBag,
                hexPositions = hex.geometry.attributes.position,
                distance = 100,
                speed = 10;

            For(hexPositions.count, function (i) {

                hexPositions.array[i * 3] += hexBag[i].velocity.x / speed;
                hexPositions.array[i * 3 + 1] += hexBag[i].velocity.y / speed;
                hexPositions.array[i * 3 + 2] += hexBag[i].velocity.z / speed;

                if (hexPositions.array[i * 3 + 1] < -distance || hexPositions.array[i * 3 + 1] > distance)
                    hexBag[i].velocity.y = -hexBag[i].velocity.y;

                if (hexPositions.array[i * 3] < -distance || hexPositions.array[i * 3] > distance)
                    hexBag[i].velocity.x = -hexBag[i].velocity.x;

                if (hexPositions.array[i * 3 + 2] < -distance || hexPositions.array[i * 3 + 2] > distance)
                    hexBag[i].velocity.z = -hexBag[i].velocity.z;

            });

            hexPositions.needsUpdate = true;

        }

    }

}