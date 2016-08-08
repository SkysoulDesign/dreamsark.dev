module DreamsArk.Elements {

    export class Ren implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                logo: 'intro/new-assets/ren-tex.jpg'
            }
        }

        objs():{} {
            return {
                logo: 'intro/models/ren.obj',
            }
        }

        create(maps, objs, data) {

            var logo = objs.logo,
                texture = maps.logo;

            logo.rotation.x = Math.PI * 2;
            logo.material = new THREE.MeshBasicMaterial({map: texture});

            return logo;

        }

    }

}
