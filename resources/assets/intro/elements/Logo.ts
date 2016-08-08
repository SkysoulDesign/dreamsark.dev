module DreamsArk.Elements {

    export class Logo implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                logo: 'intro/enter-page-assets/logo-tex.png',
            }
        }

        objs():{} {
            return {
                logo: 'intro/models/logo.obj',
            }
        }

        data() {
            return {mouse: {speed: new THREE.Vector3(0.02, 0.02, 0.02), enabled: false, inverse: false}}
        }

        create(maps, objs, data) {

            var logo = objs.logo,
                texture = maps.logo;

            logo.rotation.x = Math.PI * 2;
            logo.material = new THREE.MeshBasicMaterial({map: texture, transparent: true});

            logo.scale.subScalar(0.6);

            return logo;

        }

    }

}
