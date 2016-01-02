module.exports = (function (e) {

    /**
     * Append Camera to Engine
     */
    return e.camera = {

        camera: null,
        target: null,
        followEnabled: true,
        controls: null,

        init: function () {

            var config = {
                fov: 45,
                aspect: window.innerWidth / window.innerHeight,
                near: 1,
                far: 1e7
            };

            /**
             * Camera
             * @type {THREE.PerspectiveCamera}
             */
            this.camera = new THREE.PerspectiveCamera(config.fov, config.aspect, config.near, config.far);

            this.origin = new THREE.Vector3(0, 0, 20);
            this.target = new THREE.Vector3(0, 0, 0);

            /**
             * Follow Mouse Update
             */
            this.follow();

        },

        configure: function (configs, context) {

            this.position.copy(context.origin);
            this.rotation.order = 'YXZ';

        },

        follow: function () {

            var mouse   = e.module('mouse'),
                browser = e.module('browser');

            e.checker.add(function () {

                var x = (mouse.ratio.x * 200 - 100 - this.camera.position.x),
                    y = -(mouse.ratio.y * 200 - 100) / (browser.innerWidth / browser.innerHeight);
                this.camera.position.x += (x + this.origin.x) / 30;
                this.camera.position.y += (y - this.camera.position.y + this.origin.y) / 30;
                this.camera.lookAt(this.target);

                return !this.followEnabled;

            }, this, 'Camera following mouse checker');

        },

        center: function () {

            var tween      = e.module('tween').class,
                camera     = this.camera,
                origin     = {
                    position: this.camera.position.clone(),
                    rotation: this.camera.rotation.toVector3()
                },
                parameters = {
                    position: new THREE.Vector3(0, 0, 100),
                    rotation: new THREE.Vector3(0, 0, 0)
                };

            tween.create(parameters, {ease: 'expoInOut', duration: 2, origin: origin}, function (param) {
                camera.position.copy(param.position);
                camera.rotation.setFromVector3(param.rotation);
            });

        },
        initControls: function () {

            var camera   = this.camera,
                renderer = e.module('renderer'),
                checker  = e.module('checker').class,
                controls = new THREE.TrackballControls(camera, renderer.domElement);

            /**
             * disable it if it was already enabled before
             */
            if (this.controls && this.controls.enabled === false)
                this.controls.enabled = false;

            this.controls = controls;

            checker.add(function () {

                /**
                 * Disable Controls if requested
                 */
                if (controls.enabled === false) {

                    controls.dispose();

                    return true;

                }

                controls.update();

            }, this, 'Check if control is disabled, so if so remove controls')

        },

        moveTo: function (element, callback, context) {

            var tween    = e.module('tween').class,
                camera   = this.camera,
                controls = this.controls,
                distance = 10;

            //return

            var clone = camera.clone();
            clone.position.set(element.position.x - distance, element.position.y - distance, element.position.z - distance);
            clone.lookAt(element.position);

            var initialQuaternion = camera.quaternion.clone();
            var endingQuaternion  = clone.quaternion;
            var targetQuaternion  = new THREE.Quaternion();

            /**
             * Element position needs to fix
             * @type {{time: number, position: *}}
             */
            var destination = {time: 1, position: clone.position.clone()},
                origin      = {
                    time: 0,
                    position: camera.position
                },
                start       = function () {
                    if (controls.enabled)
                        controls.enabled = false;
                },
                complete    = function () {
                    callback.call(context || e);
                };

            tween.create(destination, {
                duration: 2,
                origin: origin,
                start: start,
                complete: complete
            }, function (param) {

                camera.position.copy(param.position);

                THREE.Quaternion.slerp(initialQuaternion, endingQuaternion, targetQuaternion, param.time);
                camera.setRotationFromQuaternion(targetQuaternion);

            });

        }

    };

})(Engine);