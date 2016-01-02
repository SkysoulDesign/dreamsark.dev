module DreamsArk.Elements {

    export class Background implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                overlay: 'assets/planet-assets/bg.jpg',
            }
        }

        create(maps, objs):{} {

            var power = 15;
            var geometry = new THREE.PlaneGeometry(2048 / power, 1024 / power, 1);
            var material = new THREE.MeshBasicMaterial({
                map: maps.overlay,
                transparent: true,
                blending: THREE.CustomBlending,
            });

            return new THREE.Mesh(geometry, material);

        }

    }

}