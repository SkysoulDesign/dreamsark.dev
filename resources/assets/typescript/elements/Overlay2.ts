module DreamsArk.Elements {

    export class Overlay2 implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                overlay: 'assets/universe-assets/overlay-2.png',
            }
        }

        create(maps, objs):{} {

            var geometry = new THREE.PlaneGeometry(50, 50, 1);
            var material = new THREE.MeshBasicMaterial({
                map: maps.overlay,
                transparent: true,
                blending: THREE.CustomBlending,
            });

            return new THREE.Mesh(geometry, material);

        }

    }

}