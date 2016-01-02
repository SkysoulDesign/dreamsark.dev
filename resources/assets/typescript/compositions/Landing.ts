module DreamsArk.Compositions {

    import For = DreamsArk.Helpers.For;
    import length = DreamsArk.Helpers.length;
    import deg2rad = DreamsArk.Helpers.deg2rad;
    import Mouse = DreamsArk.Modules.Mouse;

    export class Landing implements Composable {

        elements() {
            return ['Logo', 'Ren'];
        }

        setup(scene, camera, elements) {

            var logo = <THREE.Object3D>elements.Logo,
                ren = <THREE.Object3D>elements.Ren;

            logo.scale.subScalar(0.977);
            logo.position.setX(0.5);
            logo.position.setY(1);

            ren.scale.subScalar(0.977);
            ren.position.setX(0.5);
            ren.position.setY(1);
            ren.position.setZ(0.2);

            scene.add(logo, ren);

            camera.position.z = 30

        }

        update(scene, camera, elements) {

        }

    }

}