module DreamsArk.Elements {

    export class Asteroid implements Loadable {

        public instance:THREE.Object3D;

        maps() {
            return {
                rocks: 'assets/transition-assets/rocks.png'
            }
        }

        create(maps, objs, data) {

            var geometry = new THREE.PlaneGeometry(1024 / 20, 1024 / 20, 1);
            var material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: maps.rocks, transparent: true});

            return new THREE.Mesh(geometry, material)

        }

    }

}