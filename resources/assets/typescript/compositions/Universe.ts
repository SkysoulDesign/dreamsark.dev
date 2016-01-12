module DreamsArk.Compositions {

    import Animator = DreamsArk.Modules.Animator;
    import Mouse = DreamsArk.Modules.Mouse;
    import Renderer = DreamsArk.Modules.Renderer;
    import Browser = DreamsArk.Modules.Browser;
    import For = DreamsArk.Helpers.For;

    export class Universe implements Composable {

        elements() {
            return ['Plexus', 'Skybox'];
        }

        setup(scene, camera, elements) {

            var animator = <Animator>module('Animator'),
                renderer = module('Renderer'),
                browser = <Browser>module('Browser');

            var logo = elements.Logo,
                plexus = elements.Plexus,
                hexParticles = elements.HexParticles,
                skybox = elements.Skybox,
                enterPage = elements.EnterPage,
                hexParticles = elements.HexParticles,
                secondaryLogo = elements.SecondaryLogo;

            skybox.userData.controls = new THREE.TrackballControls(camera, renderer.domElement);
            skybox.userData.controls.target.set(0, browser.innerHeight, -1);
            //skybox.userData.controls.update();


            /**
             * Center Camera
             */
            //animator.circOut({
            //    destination: {
            //        position: new THREE.Vector3(0, 0, 50),
            //        rotation: new THREE.Vector3(0, 0, 0)
            //    },
            //    origin: {
            //        position: camera.position,
            //        rotation: camera.rotation.toVector3()
            //    },
            //    duration: 3,
            //    update: function (params) {
            //        //camera.position.copy(params.position);
            //        //camera.rotation.setFromVector3(params.rotation);
            //    }
            //});

            /**
             * Speed up Logo
             */
            animator.expoInOut({
                destination: {
                    logo: new THREE.Vector3(0, 1000, 0),
                    hexParticles: new THREE.Vector3(0, -200, 0),
                    plexus: new THREE.Vector3(),
                    opacity: 0,
                    controls: new THREE.Vector3(),
                    far: 6000,
                    fog: 6500,
                    zoom: 1,
                    secondaryLogo: new THREE.Vector3(0, 1000, 0)
                },
                origin: {
                    logo: logo.position,
                    hexParticles: hexParticles.position,
                    plexus: plexus.position.set(0, 800, 0),
                    opacity: enterPage.userData.layers.tunnelBG.material.opacity,
                    controls: skybox.userData.controls.target,
                    far: camera.far,
                    fog: scene.fog.far,
                    zoom: camera.zoom,
                    secondaryLogo: secondaryLogo.position
                },
                duration: 10,
                start(){
                    scene.add(plexus, skybox)
                },
                update: function (params) {
                    logo.position.copy(params.logo);
                    hexParticles.position.copy(params.hexParticles);

                    plexus.position.copy(params.plexus);
                    enterPage.userData.layers.tunnelBG.material.opacity = params.opacity;

                    skybox.userData.controls.target.copy(params.controls);
                    secondaryLogo.position.copy(params.secondaryLogo);

                    camera.far = params.far;
                    camera.zoom = params.zoom;
                    camera.updateProjectionMatrix();

                    scene.fog.far = params.fog;

                },
                complete(){
                    scene.remove(hexParticles, secondaryLogo, enterPage)
                }

            });

            /**
             * Go to Target
             */
            //animator.expoIn({
            //    destination: {
            //        target: new THREE.Vector3(0, 0, 0)
            //    },
            //    origin: {
            //        target: skybox.userData.controls.target
            //    },
            //    duration: 2,
            //    update: function (params) {
            //        skybox.userData.controls.target.copy(params.target)
            //    }
            //});

            //scene.add(plexus);

        }

        update(scene, camera, elements) {

            var mouse = <Mouse>module('Mouse');

            var logo = elements.Logo,
                hexParticles = elements.HexParticles,
                skybox = elements.Skybox;

            hexParticles.userData.update();

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