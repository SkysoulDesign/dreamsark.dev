module.exports = function (e, scene, camera, elements) {

    return {

        /**
         * Manually Load Assets
         */
        load: [elements.Cube, elements.Logo, elements.Particles, elements.Circle, elements.Percentage],

        setup: function () {

            var mouse = e.module('mouse'),
                tween = e.module('tween');

            /**
             * Percentage text
             */
            var percentage = elements.Percentage;
            percentage.text.position.setZ(0.8);

            /**
             * Starting Logo
             */
            var logo = elements.Logo;
            logo.scale.set(.5, .5, .5);
            logo.position.setY(3.5);

            /**
             * Play Button
             */
            var startButton = elements.Cube.clone(),
                startText   = elements.Percentage.clone('Start');

            startButton.position.set(-2, -1, 0);
            startButton.add(startText.text);

            /**
             * skip Button
             */
            var skipButton = elements.Cube.clone(),
                skipText   = elements.Percentage.clone('Skip');

            skipButton.material = new THREE.MeshBasicMaterial({color: 0xFFE401, wireframe: true});
            skipButton.position.set(2, -1, 0);
            skipButton.add(skipText.text);

            /**
             * Skip to Homepage when click in Skip
             */
            mouse.click(skipButton, function () {

                var form         = document.querySelector('#skipForm'),
                    buttonOrigin = {
                        start: startButton.position.clone(),
                        skip: skipButton.position.clone()
                    },
                    buttonParams = {
                        start: new THREE.Vector3(50, 0, 0),
                        skip: new THREE.Vector3(-50, 0, 0)
                    };

                form.submit();

                /**
                 * Animate buttons Apart
                 */
                tween.create(buttonParams, {
                    ease: 'expoInOut',
                    origin: buttonOrigin,
                    duration: 2
                }, function (param) {
                    skipButton.position.x  = param.skip.x;
                    startButton.position.x = param.start.x;
                });

                /**
                 * Remove Click Event
                 */
                return true;

            }, null, null, 'buttons');

            /**
             * Loading Circle
             */
            var loadingCircle = elements.Circle;
            loadingCircle.position.set(0, 2, 5);
            //loadingCircle.geometry.rotateX(Math.PI / 2);

            /**
             * Particles
             */
            var particles = elements.Particles;
            //particles.mesh.rotateX(Math.PI / 2);

            /**
             * When Click on the start button
             */
            mouse.click(startButton, function () {

                /**
                 * Scale the Buttons down and remove it from scene
                 *
                 * @type {{startX: number, skipX: number, scaleX: number, scaleY: number, opacity: number}}
                 */
                var buttonParameters = {
                    startX: 0.1,
                    skipX: 0.1,
                    scaleX: 0.001,
                    scaleY: 0.001,
                    opacity: 0
                },
                    buttonOrigin     = {
                        startX: startButton.position.x,
                        skipX: skipButton.position.x,
                        scaleX: skipButton.scale.x,
                        scaleY: skipButton.scale.y,
                        opacity: 1
                    },
                    buttonComplete   = function () {
                        scene.remove(startButton, skipButton);
                    };

                /**
                 * Hide Buttons
                 */
                tween.create(buttonParameters, {
                    duration: 1,
                    origin: buttonOrigin,
                    complete: buttonComplete
                }, function (param) {

                    startButton.position.x = param.startX;
                    skipButton.position.x  = param.skipX;

                    startButton.scale.set(param.scaleX, param.scaleY, param.scaleY);
                    skipButton.scale.set(param.scaleX, param.scaleY, param.scaleY);

                    startButton.material.opacity = param.opacity;
                    skipButton.material.opacity  = param.opacity;

                });

                /**
                 * Show Percentage Counter
                 */
                var percentageDestination = {scale: new THREE.Vector3(1, 1, 1)},
                    percentageStart       = function () {
                        scene.add(percentage.text);
                    };

                tween.create(percentageDestination, {
                    duration: 1,
                    delay: 0.5,
                    start: percentageStart
                }, function (param) {
                    percentage.text.scale.copy(param.scale);
                });

                /**
                 * Tween Logo Back to 100% and center
                 */
                var logoDestination = {
                    scale: new THREE.Vector3(1, 1, 1),
                    position: new THREE.Vector3(0, 0, 0)
                }, logoOrigin       = {
                    scale: logo.scale,
                    position: logo.position
                };

                tween.create(logoDestination, {ease: 'quintInOut', duration: 1, origin: logoOrigin}, function (param) {
                    logo.scale.copy(param.scale);
                    logo.position.copy(param.position);
                });

                /**
                 * Particles Cloud
                 */
                var logoPositions          = logo.geometry.getAttribute('position'),
                    loadingCirclePositions = loadingCircle.geometry.vertices;

                /**
                 * Grab some Particles and set the destination to the logo Position
                 */
                particles.for('particles', logoPositions.count, function (i) {

                    return {
                        x: logoPositions.array[i * 3],
                        y: logoPositions.array[i * 3 + 1],
                        z: logoPositions.array[i * 3 + 2]
                    };

                });

                particles.for('circle', loadingCirclePositions.length, function (i) {
                    return loadingCirclePositions[i];
                });

                /**
                 * Tween the Particles back to the logo
                 */
                particles.tween('circle', 2);
                particles.tween('particles', 3);

                /**
                 * Start Loading
                 */
                e.start(function (on) {

                    on.start = function () {
                        console.log('starting')
                    };

                    on.progress = function (progress) {
                        percentage.update(progress + "%");
                    };

                    on.load = function () {

                        var checker = e.module('checker');

                        checker.add(function () {

                            if (particles.animating) return;

                            percentage.update("loaded");

                            /**
                             * Disable Camera and center it
                             */
                            camera.class.followEnabled = false;
                            camera.class.center();

                            e.compositor.next();

                            return true;

                        }, null, 'Wait for Particles to finish animating to start next composition');

                    };

                });

                /**
                 * Remove Click Event
                 */
                return true;

            }, null, null, 'buttons');

            scene.add(logo, particles.mesh, startButton, skipButton);

        },

        share: function () {
            return {}
        },

        animation: function () {

            //elements.Cube.rotation.x += 0.05;
            //elements.Cube.rotation.y += 0.05;
            //elements.Cube.rotation.z += 0.05;
        }

    };

}
;