module DreamsArk.Elements {

    import deg2rad = DreamsArk.Helpers.deg2rad;
    import Browser = DreamsArk.Modules.Browser;
    import Mouse = DreamsArk.Modules.Mouse;

    export class EnterPage implements Loadable {

        public instance:THREE.Object3D;

        maps() {
            return {
                background: 'final/enter-page-assets/background.jpg',
                transition: 'final/enter-page-assets/transition.jpg',
                galaxy: 'final/enter-page-assets/galaxy.jpg',
                tunnelBG: 'final/enter-page-assets/tunnelBG.jpg',
                platform: 'final/enter-page-assets/platform.png',
                start: 'final/enter-page-assets/start.png',
                skip: 'final/enter-page-assets/skip.png',
                planet: 'final/enter-page-assets/planet.png',
            }
        }

        data() {
            return {
                start: function () {
                },
                layers: {}
            }
        }

        create(maps, objs, data) {

            var browser = <Browser>module('Browser'),
                mouse = <Mouse>module('Mouse'),
                group = new THREE.Group();

            /**
             * Background
             */
            var geometry = new THREE.PlaneGeometry(100 * 8, 100 * 8, 1),
                material = new THREE.MeshBasicMaterial({map: maps.background}),
                background = data.layers.background = new THREE.Mesh(geometry, material);

            background.position.setZ(-200);

            group.add(background);

            /**
             * Transition
             */
            var geometry = new THREE.PlaneGeometry(100 * 8, 100 * 8, 1),
                material = new THREE.MeshBasicMaterial({map: maps.transition}),
                transition = data.layers.transition = new THREE.Mesh(geometry, material);

            transition.position.set(0, browser.innerHeight - 160, -200);

            group.add(transition);

            /**
             * Galaxy
             */
            var geometry = new THREE.PlaneGeometry(100 * 8, 100 * 8, 1),
                material = new THREE.MeshBasicMaterial({map: maps.galaxy}),
                galaxy = data.layers.galaxy = new THREE.Mesh(geometry, material);

            galaxy.position.set(0, transition.position.y * 2, -200);

            group.add(galaxy);

            /**
             * TunnelBG
             */
            var geometry = new THREE.PlaneGeometry(100 * 8, 100 * 8, 1),
                material = new THREE.MeshBasicMaterial({map: maps.tunnelBG, transparent: true, side: THREE.DoubleSide}),
                tunnelBG = data.layers.tunnelBG = new THREE.Mesh(geometry, material);

            tunnelBG.position.set(0, galaxy.position.y + browser.innerHeight / 2, 100);
            tunnelBG.rotation.x = deg2rad(90);

            group.add(tunnelBG);

            /**
             * Planet
             */
            var geometry = new THREE.PlaneGeometry(10, 10, 1),
                material = new THREE.MeshBasicMaterial({map: maps.planet, transparent: true, alphaTest: 0.01}),
                planet = data.layers.planet = new THREE.Mesh(geometry, material);

            planet.position.set(-30, 10, 0);

            group.add(planet);

            /**
             * Platform
             */
            var geometry = new THREE.PlaneGeometry(60, 60, 1),
                material = new THREE.MeshBasicMaterial({map: maps.platform, transparent: true, alphaTest: 0.01}),
                platform = data.layers.platform = new THREE.Mesh(geometry, material);

            group.add(platform);

            /**
             * Start
             */
            var geometry = new THREE.PlaneGeometry(1024 / 55, 256 / 55, 1),
                material = new THREE.MeshBasicMaterial({map: maps.start, transparent: true}),
                start = data.layers.start = new THREE.Mesh(geometry, material);

            /**
             * Position Fix
             */
            start.position.set(0, -7, 5);

            mouse.click(start, function () {
                data.start();
            });

            group.add(start);

            /**
             * Skip
             */
            var geometry = new THREE.PlaneGeometry(5, 5, 1),
                material = new THREE.MeshBasicMaterial({map: maps.skip, transparent: true}),
                skip = data.layers.skip = new THREE.Mesh(geometry, material);

            skip.position.set(0, -9, 5);

            group.add(skip);

            data.parallex = function (logo) {

                var x = mouse.normalized.x,
                    y = mouse.normalized.y;

                background.position.x = x * 2;
                background.position.y = y * 2;

                platform.position.x = x * 5;
                planet.position.x = -30 + x / 2;
                start.position.x = x * 7;
                skip.position.x = x * 6;
                logo.position.x = x * 10;
                logo.position.y = y * 2;

            };

            return group;

        }

    }

}