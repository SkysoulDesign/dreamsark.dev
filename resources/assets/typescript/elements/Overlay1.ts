module DreamsArk.Elements {

    export class Overlay1 implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                galaxy: 'assets/universe-assets/overlay-1.png',
            }
        }

        create(maps, objs):{} {

            var geometry = new THREE.PlaneGeometry(50, 50, 1);
            var material = new THREE.MeshBasicMaterial({
                map: maps.galaxy,
                transparent: true
            });

            return new THREE.Mesh(geometry, material);

        }

    }

}