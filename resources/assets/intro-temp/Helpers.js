module.exports = function (e) {

    return e.helpers = {

        init: function () {

            for (var i = 0; i < arguments.length; i++) {

                /**
                 * Recursively Init All
                 */
                if (typeof arguments[i].init === 'undefined') {

                    var argument = arguments[i];

                    Object.keys(arguments[i]).forEach(function (key) {
                        this.init(argument[key]);
                    }, this);

                    return;

                }

                arguments[i].init();

                /**
                 * Configure if necessary
                 */
                if (typeof arguments[i].configure === "function") {
                    arguments[i].configure(arguments[i].instance);
                }

            }

        },

        set: function (object, closure) {
            closure.call(object, closure);
        },

        appendTo: function (element, domElement) {
            document.getElementById(element).appendChild(domElement)
        },

        timeout: function (time, closure) {
            setTimeout(function () {
                closure.call()
            }, time);
        },

        extend: function (obj, src) {
            Object.keys(src).forEach(function (key) {
                obj[key] = src[key];
            });
            return obj;
        },

        /**
         * Group objects
         * @returns {THREE.Group}
         */
        group: function () {

            var group = new THREE.Group();

            for (var i = 0; i < arguments.length; i++) {
                group.add(arguments[i]);
            }

            return group;

        },
        random: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        smoothLookAt: function (camera, target, time, distance, onComplete) {

            var clone = camera.clone();
            clone.position.set(target.position.x / distance, target.position.y / distance, target.position.z / distance);
            clone.lookAt(target.position);

            //var finalPosition = camera.clone();
            //finalPosition.position.set()

            var initialQuaternion = camera.quaternion;
            var endingQuaternion  = clone.quaternion;
            var targetQuaternion  = new THREE.Quaternion();

            var o = {time: 0};

            e.tween.l(camera.position, time, {
                x: target.position.x / distance,
                y: target.position.y / distance,
                z: target.position.z / distance
            });

            e.tween.l(o, time, {
                time: 1,
                onUpdate: function () {
                    THREE.Quaternion.slerp(initialQuaternion, endingQuaternion, targetQuaternion, o.time);
                    camera.setRotationFromQuaternion(targetQuaternion);
                },
                onComplete: function () {
                    if (typeof onComplete === 'function')
                        onComplete();
                }
            });

        }
    }

}(Engine);