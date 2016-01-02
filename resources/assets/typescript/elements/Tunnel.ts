module DreamsArk.Elements {

    import deg2rad = DreamsArk.Helpers.deg2rad;
    import Browser = DreamsArk.Modules.Browser;

    export class Tunnel implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                wave: 'assets/001_electric.jpg',
                portal: 'assets/portal-assets/portal.png',
                beam_1: 'assets/portal-assets/beam_1.png',
                been_2: 'assets/portal-assets/beam_2.png',
            }
        }

        create(maps, objs, data) {

            var group = new THREE.Group(),
                browser = <Browser>module('Browser'),
                texture = maps.wave;

            texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
            texture.repeat.set(1, 2);

            var mainTube = new THREE.Mesh(
                new THREE.CylinderGeometry(50, 50, 1024, 16, 32, true),
                new THREE.MeshBasicMaterial({
                    color: 0x2222ff,
                    //ambient: data.innerColor,
                    transparent: true,
                    alphaMap: texture,
                    //shininess: 0,
                    side: THREE.BackSide,
                    opacity: 0,
                    blending: THREE.AdditiveBlending,

                }));

            var otterTube = new THREE.Mesh(
                new THREE.CylinderGeometry(150, 150, 1024, 16, 32, true),
                new THREE.MeshBasicMaterial({
                    color: 0x2222ff,
                    //ambient: data.innerColor,
                    transparent: true,
                    alphaMap: texture,
                    blending: THREE.AdditiveBlending,
                    //shininess: 0,
                    side: THREE.BackSide
                }));

            var beam_1_Geometry = new THREE.PlaneGeometry(browser.innerWidth / 50, browser.innerHeight / 50, 1);
            var beam_1_Material = new THREE.MeshBasicMaterial({
                map: maps.beam_1,
                transparent: true,
                alphaTest: 0.5,
                blending: THREE.AdditiveBlending
            });

            var beam_1 = new THREE.Mesh(beam_1_Geometry, beam_1_Material);
            beam_1.rotation.x = deg2rad(-90);

            var portal_Geometry = new THREE.PlaneGeometry(browser.innerWidth * 2, browser.innerHeight * 2, 1);
            var portal_Material = new THREE.MeshBasicMaterial({
                map: maps.portal,
                transparent: true,
                alphaTest: 1,
                blending: THREE.AdditiveBlending
            });

            var portal = new THREE.Mesh(portal_Geometry, portal_Material);
            portal.rotation.x = deg2rad(-90);
            portal.position.y = -800;

            group.add(mainTube);
            group.add(beam_1);
            group.add(portal);

            return mainTube;

        }

    }

}