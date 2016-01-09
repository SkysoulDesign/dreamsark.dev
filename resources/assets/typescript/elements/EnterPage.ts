module DreamsArk.Elements {

    import deg2rad = DreamsArk.Helpers.deg2rad;
    import Browser = DreamsArk.Modules.Browser;
    import Mouse = DreamsArk.Modules.Mouse;

    export class EnterPage implements Loadable {

        public instance:THREE.Object3D;

        maps() {
            return {
                background: 'final/enter-page-assets/background.jpg',
                platform: 'final/enter-page-assets/platform.png',
                start: 'final/enter-page-assets/start.png',
                skip: 'final/enter-page-assets/skip.png',
                planet: 'final/enter-page-assets/planet.png',
            }
        }

        data() {
            return {
                start: function () {

                }
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
                background = new THREE.Mesh(geometry, material);

            background.position.setZ(-200);

            group.add(background);

            /**
             * Planet
             */
            var geometry = new THREE.PlaneGeometry(10, 10, 1),
                material = new THREE.MeshBasicMaterial({map: maps.planet, transparent: true}),
                planet = new THREE.Mesh(geometry, material);

            planet.position.set(-30, 10, 0);

            group.add(planet);

            /**
             * Platform
             */
            var geometry = new THREE.PlaneGeometry(60, 60, 1),
                material = new THREE.MeshBasicMaterial({map: maps.platform, transparent: true}),
                platform = new THREE.Mesh(geometry, material);

            group.add(platform);

            /**
             * Start
             */
            var geometry = new THREE.PlaneGeometry(1024 / 55, 256 / 55, 1),
                material = new THREE.MeshBasicMaterial({map: maps.start, transparent: true}),
                start = new THREE.Mesh(geometry, material);

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
                skip = new THREE.Mesh(geometry, material);

            skip.position.set(0, -9, 5);

            group.add(skip);

            data.parallex = function (logo) {

                var x = mouse.normalized.x,
                    y = mouse.normalized.y;

                background.position.x = x * 2;
                background.position.y = y * 2;

                platform.position.x = x * 5;
                planet.position.x = -30 + x;
                start.position.x = x * 7;
                skip.position.x = x * 6;
                logo.position.x = x * 10;
                logo.position.y = y * 2;

            };

            return group;

        }

    }

}