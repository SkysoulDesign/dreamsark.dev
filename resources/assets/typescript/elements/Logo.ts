module DreamsArk.Elements {

    export class Logo implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                logo: 'assets/new-assets/logo-tex.png',
            }
        }

        objs():{} {
            return {
                logo: 'models/logo.obj',
            }
        }

        data() {
            return {mouse: {speed: new THREE.Vector3(0.02, 0.02, 0.02), enabled: false, inverse: false}}
        }

        create(maps, objs, data) {

            var logo = objs.logo,
                texture = maps.logo;

            texture.wrapS = THREE.MirroredRepeatWrapping;
            texture.wrapT = THREE.MirroredRepeatWrapping;
            texture.mapping = THREE.CubeRefractionMapping;

            logo.rotation.x = Math.PI * 2;
            logo.material = new THREE.MeshBasicMaterial({map: texture, transparent: true});

            return logo;

        }

    }

}