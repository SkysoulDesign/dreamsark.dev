module DreamsArk.Elements {

    export class Galaxy implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                galaxy: 'lib/galaxy.png',
            }
        }

        create(maps, objs):{} {

            var geometry = new THREE.PlaneGeometry(50, 50, 1);
            var material = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                map: maps.galaxy,
                transparent: true,
            });

            return new THREE.Mesh(geometry, material);

        }

    }

}