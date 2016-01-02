module.exports = (function () {

    var maxPoints     = 100;
    var radius        = 1000;
    var particlesData = [];
    var points        = new Float32Array(maxPoints * 3);
    var particles     = [];

    /**
     * Create Point
     * @returns {{geometry: THREE.BufferGeometry, vertices: Float32Array, create: create}}
     */
    var point = function () {
        return {
            geometry: new THREE.BufferGeometry(),
            vertices: new Float32Array(maxPoints * 3),
            create: function (material) {
                return new THREE.Points(this.geometry, material);
            }
        }
    };

    /**
     * Create Connection Lines
     * @type {{geometry: THREE.BufferGeometry, colors: Float32Array, vertices: Float32Array, create: lines.create}}
     */
    var lines = {
        geometry: new THREE.BufferGeometry(),
        colors: new Float32Array(maxPoints * 3),
        vertices: new Float32Array((maxPoints * maxPoints) * 3),
        material: function () {
            return new THREE.LineBasicMaterial({color: new THREE.Color('blue'), opacity: 1, linewidth: 1});
        },
        create: function () {
            return new THREE.LineSegments(this.geometry, this.material());
        }
    };

    return {
        name: 'coloredParticles',
        create: function (e) {

            var group = e.helpers.group();

            /**
             * Add Vertices to Points
             */
            for (var i = 0; i < maxPoints; i++) {

                var p = point();

                var x = Math.random() * radius - radius / 2;
                var y = Math.random() * radius - radius / 2;
                var z = Math.random() * radius - radius / 2;

                var material = new THREE.PointsMaterial({
                    size: 1,
                    color: 0xFFFFF,
                });

                p.vertices[i * 3] = points[i * 3] = x;
                p.vertices[i * 3 + 1] = points[i * 3 + 1] = y;
                p.vertices[i * 3 + 2] = points[i * 3 + 2] = z;

                var attribute = new THREE.BufferAttribute(p.vertices, 3).setDynamic(true);
                p.geometry.addAttribute('position', attribute);

                /**
                 * Limit to display only one particle per p
                 */
                p.geometry.setDrawRange(i, 1);

                /**
                 * Create and add to the Group
                 */
                p = p.create(material);
                particles.push(p);
                group.add(p);

                particlesData.push({
                    velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
                    connections: 0
                });

                //for (var i = 0; i < maxPoints; i++) {
                //
                //    var particleData = data.particlesData[i];
                //
                //    if (data.limitConnections && particleData.connections >= data.maxConnections)
                //        continue;
                //
                //    for (var j = i + 1; j < data.maxPoints; j++) {
                //
                //        var particleDataB = data.particlesData[j];
                //
                //        if (data.limitConnections && particleDataB.connections >= data.maxConnections)
                //            continue;
                //
                //        var dx   = points[i].position.x - points[j].position.x;
                //        var dy   = points[i].position.y - points[j].position.y;
                //        var dz   = points[i].position.z - points[j].position.z;
                //        var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                //
                //        if (dist < data.minDistance) {
                //
                //            particleData.connections++;
                //            particleDataB.connections++;
                //
                //            lines.vertices[vertexPos++] = points[i].position.x;
                //            lines.vertices[vertexPos++] = points[i].position.y;
                //            lines.vertices[vertexPos++] = points[i].position.z;
                //
                //            lines.vertices[vertexPos++] = points[j].position.x;
                //            lines.vertices[vertexPos++] = points[j].position.y;
                //            lines.vertices[vertexPos++] = points[j].position.z;
                //
                //            var alpha = 1.0 - dist / data.minDistance;
                //
                //            lines.colors[colorPos++] = alpha;
                //            lines.colors[colorPos++] = alpha;
                //            lines.colors[colorPos++] = alpha;
                //
                //            lines.colors[colorPos++] = alpha;
                //            lines.colors[colorPos++] = alpha;
                //            lines.colors[colorPos++] = alpha;
                //
                //            connections++;
                //
                //        }
                //
                //    }
                //}

            }

            /**
             * Add Position Attribute to the Geometry
             */
            var LinePositionAttribute = new THREE.BufferAttribute(lines.vertices, 3).setDynamic(true),
                LineColorAttribute    = new THREE.BufferAttribute(lines.colors, 3).setDynamic(true);

            lines.geometry.addAttribute('position', LinePositionAttribute);
            lines.geometry.addAttribute('color', LineColorAttribute);

            return group.add(lines.create());

        },

        share: function (e) {
            return {
                c_maxPoints: 100,
                c_minDistance: 150,
                c_radius: 10,
                c_points: points,
                c_lines: lines,
                c_particlesData: particlesData,
                c_particles: particles
            }
        }

    }

})();