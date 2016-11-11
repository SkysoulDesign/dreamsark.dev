module DreamsArk.Elements {

    export class Skybox implements Loadable {

        public instance:THREE.Object3D;

        maps() {
            return {
                skybox: 'intro/universe-assets/background-sphere.jpg'
            }
        }

        create(maps, objs, data) {

            var geometry = new THREE.SphereGeometry(5000, 50, 50);
            geometry.scale(-1, 1, 1);
            var material = new THREE.MeshBasicMaterial({map: maps.skybox, transparent: true});
            return new THREE.Mesh(geometry, material);

        }

    }

}
