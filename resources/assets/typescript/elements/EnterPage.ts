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

            var geometry = new THREE.PlaneGeometry(60, 60, 1),
                material = new THREE.MeshBasicMaterial({map: maps.platform, transparent: true}),
                platform = new THREE.Mesh(geometry, material);

            group.add(platform);

            var geometry = new THREE.PlaneGeometry(15, 15, 1),
                material = new THREE.MeshBasicMaterial({map: maps.start, transparent: true}),
                start = new THREE.Mesh(geometry, material);

            start.position.set(0, -7, 5);

            mouse.click(start, function () {
                console.log('hey')
            });

            group.add(start);

            var geometry = new THREE.PlaneGeometry(5, 5, 1),
                material = new THREE.MeshBasicMaterial({map: maps.skip, transparent: true}),
                skip = new THREE.Mesh(geometry, material);

            skip.position.set(0, -9, 5);

            group.add(skip);

            return group;

        }

    }

}