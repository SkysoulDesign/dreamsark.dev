module DreamsArk.Modules {

    /**
     * Creates an instance of THREE.js Camera
     */
    export class Camera implements Initializable {

        public instance:THREE.PerspectiveCamera;

        constructor() {
            this.instance = new THREE.PerspectiveCamera()
        }

        /**
         * Configure camera's default values
         */
        configure():void {

            var browser = <Browser>module('Browser');

            this.instance.fov = 75;
            this.instance.aspect = browser.innerWidth / browser.innerHeight;
            this.instance.near = 0.1;
            this.instance.far = 5000;

            this.instance.updateProjectionMatrix();

        }

        /**
         * Swing camera upon a target
         * @param target instance of THREE.Vector3
         */
        static swing(target:THREE.Vector3):void {

            var mouse = <Mouse>module('Mouse'),
                browser = <Browser>module('Browser'),
                checker = <Checker>module('Checker'),
                camera = module('Camera');

            var origin = new THREE.Vector3(0, 0, 0);

            checker.add(function () {

                var x = (mouse.ratio.x * 200 - 100 - camera.position.x),
                    y = -(mouse.ratio.y * 200 - 100) / (browser.innerWidth / browser.innerHeight);

                camera.position.x += (x + camera.position.x) / 30;
                camera.position.y += (y - camera.position.y + origin.y) / 30;
                camera.lookAt(target);

                return false;

            });

        }

    }

}