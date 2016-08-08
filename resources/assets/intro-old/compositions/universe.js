module.exports = function (e, scene, camera, elements) {

    return {

        setup: function () {

            var mouse = e.module('mouse'),
                tween = e.module('tween');

            /**
             * Logo
             */
            var logo            = elements.Logo,
                logoDestination = {
                    rotation: new THREE.Vector3(logo.rotation.x, logo.rotation.y, Math.PI * 2)
                }, logoOrigin   = {
                rotation: logo.rotation.toVector3()
            };

            tween.create(logoDestination, {ease: 'quintInOut', origin: logoOrigin, duration: 3}, function (param) {
                logo.rotation.setFromVector3(param.rotation);
            });

            /**
             * Particles
             */
            var particles = elements.Particles;
            particles.reset();

            /**
             * Fade in the skybox
             */
            var skybox            = elements.Skybox,
                skyboxDestination = {
                    opacity: 1
                };

            tween.create(skyboxDestination, 2, function (param) {
                skybox.material.opacity = param.opacity;
            });

            /**
             * Remove Percentage Button
             */
            var percentage            = elements.Percentage,
                percentageOrigin      = {
                    scale: percentage.text.scale.clone()
                },
                percentageDestination = {
                    scale: new THREE.Vector3(0, 0, 0)
                },
                percentageComplete    = function () {
                    scene.remove(percentage.text);
                };

            tween.create(percentageDestination, {duration: 1, origin: percentageOrigin, complete: percentageComplete},
                function (param) {
                    percentage.text.scale.copy(param.scale)
                });

            /**
             * Singularity
             */
            var singularity          = elements.SingularityBuffer,
                singularityPositions = singularity.getAttribute('position');

            particles.for('singularity', singularityPositions.count, function (i) {

                return {
                    x: singularityPositions.array[i * 3],
                    y: singularityPositions.array[i * 3 + 1],
                    z: singularityPositions.array[i * 3 + 2]
                };

            });

            /**
             * Expand the particles back in
             */
            var expandUniverse = function () {

                particles.reset();

                /**
                 * Universe Buffer
                 */
                var universe          = elements.UniverseBuffer;
                var universePositions = universe.getAttribute('position');

                particles.for('universe', universePositions.count, function (i) {

                    return {
                        x: universePositions.array[i * 3],
                        y: universePositions.array[i * 3 + 1],
                        z: universePositions.array[i * 3 + 2]
                    };

                });

                /**
                 * Build Universe
                 */
                particles.tween('universe', 2, {

                    complete: function () {

                        /**
                         * Initialize Controls
                         */
                        camera.class.initControls();

                    }

                });

                /**
                 * Add Plexus
                 */
                var plexus      = elements.Plexus,
                    destination = [];

                e.helpers.keys(plexus.children, function (el) {
                    destination.push(el.userData);
                });

                tween.create(destination, {duration: 5, delay: 0.5, ease: 'expoOut'}, function (param) {
                    e.helpers.keys(plexus.children, function (el, index) {
                        el.position.copy(param[index].position);
                        el.material.opacity = param[index].opacity;
                    });
                });

                var lines          = elements.Lines,
                    linesPositions = lines.geometry.getAttribute('position'),
                    vertexPos      = 0,
                    connections    = 0;

                var particlePosition = particles.mesh.geometry.attributes.position,
                    count            = particlePosition.count / 100;

                e.helpers.for(count, function (i) {

                    //var plexusI = plexus.children[i].userData;
                    //
                    //if (plexusI.connections >= 1)
                    //    return;

                    var positionI = new THREE.Vector3(
                        particlePosition[i * 3],
                        particlePosition[i * 3 + 1],
                        particlePosition[i * 3 + 2]
                    );

                    e.helpers.for2(count, i, function (start, j) {

                        //var plexusJ = plexus.children[j].userData;
                        //var plexusJ = particles.mesh;

                        //if (plexusI.connections >= 1 && plexusJ.connections >= 1)
                        //    return;

                        var positionJ = new THREE.Vector3(
                            particlePosition[j * 3],
                            particlePosition[j * 3 + 1],
                            particlePosition[j * 3 + 2]
                        );

                        if (positionI.distanceTo(positionJ) < 50) {

                            //plexusI.connections++;
                            //plexusJ.connections++;

                            /**
                             * Start |-------
                             */
                            linesPositions.array[vertexPos++] = particlePosition.array[i * 3];//plexusI.position.x;
                            linesPositions.array[vertexPos++] = particlePosition.array[i * 3 + 1];//plexusI.position.y;
                            linesPositions.array[vertexPos++] = particlePosition.array[i * 3 + 2];//plexusI.position.z;

                            /**
                             * End -------|
                             */
                            linesPositions.array[vertexPos++] = particlePosition.array[j * 3];//plexusJ.position.x;
                            linesPositions.array[vertexPos++] = particlePosition.array[j * 3 + 1];//plexusJ.position.y;
                            linesPositions.array[vertexPos++] = particlePosition.array[j * 3 + 2];//plexusJ.position.z;

                            connections++

                        }

                    })

                });

                lines.geometry.setDrawRange(0, connections * 2);
                linesPositions.needsUpdate = true;

                scene.add(lines);

                /**
                 * Add Hover and Click Events
                 */
                var dom          = {
                    overlay: document.querySelector('#show-entry'),
                    closeButton: document.querySelector('#view-project'),
                    miniature: document.querySelector('#miniature'),
                    title: document.querySelector('#title'),
                    description: document.querySelector('#description'),
                    cover: document.querySelector('#cover')
                },
                    hoverIn      = function (element) {

                        var destination = {size: 25},
                            options     = {
                                ease: 'expoInOut',
                                origin: element.material.size,
                                duration: 0.5
                            },
                            update      = function (param) {
                                element.material.size = param.size;
                            };

                        tween.create(destination, options, update);

                    },
                    hoverOut     = function (element) {

                        var destination = {size: 10},
                            options     = {
                                ease: 'elasticOut',
                                origin: element.material.size,
                                duration: 0.3
                            },
                            update      = function (param) {
                                element.material.size = param.size
                            };

                        tween.create(destination, options, update);

                    },
                    click        = function (element) {

                        var complete = function () {

                            /**
                             * Restyle Page
                             */
                            dom.overlay.style.display = 'block';
                            dom.miniature.src           = element.userData.src;
                            dom.cover.src               = element.userData.cover;
                            dom.title.textContent       = element.userData.title;
                            dom.description.textContent = element.userData.description;

                            mouse.click(dom.closeButton, function () {

                                dom.overlay.style.display = 'none';

                                /**
                                 * Re-enable Controls
                                 */
                                camera.class.initControls();

                                /**
                                 * Reattach click events
                                 */
                                plexusEvents();

                                /**
                                 * Remove Click Event on exit
                                 */
                                return true;

                            });

                        };

                        /**
                         * Move Camera to element
                         */
                        camera.class.moveTo(element, complete);

                        /**
                         * Remove All events
                         */
                        return true;

                    },

                    plexusEvents = function () {
                        e.helpers.keys(plexus.children, function (el) {
                            mouse.hoverClick(el, hoverIn, hoverOut, click, null, null, 'plexus');
                            //mouse.click(el, click, null, null, 'plexus');
                        });
                    };

                /**
                 * Init Plexus Events
                 */
                plexusEvents();

                scene.add(plexus);

            };

            particles.tween('singularity', 2, {
                ease: 'quadInOut', complete: expandUniverse
            });

            scene.add(skybox)

        },

        animation: function () {

        }

    }

}
;