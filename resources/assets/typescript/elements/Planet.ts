module DreamsArk.Elements {

    export class Planet implements Loadable {

        public instance:THREE.Object3D;

        maps() {
            return {
                planet: 'assets/transition-assets/planet.png'
            }
        }

        create(maps, objs, data) {

            var geometry = new THREE.PlaneGeometry(1024 / 20, 1024 / 20, 1);
            var material = new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: maps.planet,
                transparent: true,
                blending: THREE.AdditiveBlending
            });

            return new THREE.Mesh(geometry, material)

        }

    }

}