module.exports = (function (e) {

    return {

        constructor: function (E) {
            return {
                maxConnections: 100,
                limitConnections: false,
                INTERSECTED: null,
                PARTICLE_SIZE: 20,
            }
        },

        setup: function (data, E, ex) {

            /**
             * Scene Settings
             */
            e.scene.a.add(E.particles, E.skybox, E.dreamsark, E.ground, E.coloredParticles);

            /**
             * Camera Settings
             */
            e.camera.a.position.z = 800;

            /**
             * Plugin Init
             */
            e.plugins.OrbitControls.init();
            //e.plugins.TrackballControls.init();

            e.events.add('mousemove', function (mouse, event) {
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
            });

            e.events.add('click', function (mouse, event) {
                e.raycaster.click();
            });

            //e.events.add('click', window, function (mouse, event) {
            //    console.log(e.raycaster.intersected);
            //});

            //e.helpers.timeout(5000, function () {
            //    e.compositor.next();
            //});

        },

        GUI: {
            controller: function (data) {
                return {
                    maxPoints: data.maxPoints,
                    minDistance: data.minDistance,
                    maxConnections: data.maxConnections,
                    limitConnections: data.limitConnections,
                }
            },
            gui: function (controller, data, gui) {
                gui.add(data, 'maxPoints', 0, 200);
                gui.add(data, 'minDistance', 0, 500);
                gui.add(data, 'maxConnections', 0, 30);
                gui.add(data, 'limitConnections')
            }
        },

        raycaster: function (data, E) {

            //this.params.Points.threshold = 10;

            this.objects = data.points;
            this.setFrom(e.events.mouse, e.camera.a);
            //var intersects = this.intersectObjects(data.particles);

            this.on = function (index, intersected) {
                e.tween.l(intersected.material, .3, {
                    size: 100
                });
            };

            this.onClick = function (index, intersected) {

                var onComplete = function () {
                    e.tween.l(e.camera.a.position, 1, {
                        x: intersected.position.x * .8,
                        y: intersected.position.y * .8,
                        z: intersected.position.z * .8,
                        ease: 'Expo.easeOut'
                    });

                    e.compositor.next({
                        point: intersected
                    });

                };

                e.helpers.smoothLookAt(e.camera.a, intersected, 1, 8, onComplete);

                //e.helpers.smoothMovePlugin(e.plugins.TrackballControls.instance, intersected, 1, 2);
                //e.camera.a.position = intersected.position
            };

            this.out = function (index, intersected) {
                e.tween.l(intersected.material, .3, {
                    size: 50
                });
            };

        },

        animation: function (data, E) {

            //e.plugins.TrackballControls.instance.update();

            var lines  = data.lines,
                points = data.points;

            var vertexPos   = 0,
                colorPos    = 0,
                connections = 0;

            for (var i = 0; i < data.maxPoints; i++) {

                var particleData = data.particlesData[i];

                if (data.limitConnections && particleData.connections >= data.maxConnections)
                    continue;

                for (var j = i + 1; j < data.maxPoints; j++) {

                    var particleDataB = data.particlesData[j];

                    if (data.limitConnections && particleDataB.connections >= data.maxConnections)
                        continue;

                    var dx   = points[i].position.x - points[j].position.x;
                    var dy   = points[i].position.y - points[j].position.y;
                    var dz   = points[i].position.z - points[j].position.z;
                    var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < data.minDistance) {

                        particleData.connections++;
                        particleDataB.connections++;

                        lines.vertices[vertexPos++] = points[i].position.x;
                        lines.vertices[vertexPos++] = points[i].position.y;
                        lines.vertices[vertexPos++] = points[i].position.z;

                        lines.vertices[vertexPos++] = points[j].position.x;
                        lines.vertices[vertexPos++] = points[j].position.y;
                        lines.vertices[vertexPos++] = points[j].position.z;

                        var alpha = 1.0 - dist / data.minDistance;

                        lines.colors[colorPos++] = alpha;
                        lines.colors[colorPos++] = alpha;
                        lines.colors[colorPos++] = alpha;

                        lines.colors[colorPos++] = alpha;
                        lines.colors[colorPos++] = alpha;
                        lines.colors[colorPos++] = alpha;

                        connections++;

                    }

                }
            }

            lines.geometry.setDrawRange(0, connections * 2);
            lines.geometry.attributes.position.needsUpdate = true;
            lines.geometry.attributes.color.needsUpdate    = true;
            //points.geometry.attributes.position.needsUpdate = true;

        }

    };

})(Engine);