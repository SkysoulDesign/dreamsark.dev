module DreamsArk.Elements {

    export class Asteroid implements Loadable {

        public instance:THREE.Object3D;

        maps() {
            return {
                rocks: 'intro/enter-page-assets/asteroid.png'
            }
        }

        create(maps, objs, data) {

            var geometry = new THREE.PlaneGeometry(512 / 1.5, 512 / 1.5, 1);
            var material = new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: maps.rocks,
                transparent: true,
                alphaTest: 0.1
            });

            return new THREE.Mesh(geometry, material)

        }

    }

}
