module DreamsArk.Elements {

    export class Asteroid implements Loadable {

        public instance:THREE.Object3D;

        maps() {
            return {
                rocks: 'final/enter-page-assets/asteroid.png'
            }
        }

        create(maps, objs, data) {

            var geometry = new THREE.PlaneGeometry(512 / 2, 512 / 2, 1);
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