module DreamsArk.Elements {

    export class Cube implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                sparks1: 'lib/cover-hunger.png'
            }
        }

        objs():{} {
            return {
                logo1: 'models/logo.obj',
            }
        }

        create(maps, objs, data) {

            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

            return new THREE.Mesh(geometry, material);

        }

    }

}