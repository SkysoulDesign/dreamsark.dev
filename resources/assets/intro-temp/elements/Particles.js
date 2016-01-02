module.exports = (function () {

    var maxPoints     = 100;
    var radius        = 1000;
    var particlesData = [];
    //var points        = new Float32Array(maxPoints * 3);
    var points = [];
    //var particles     = [];

    /**
     * Create Point
     * @returns {{geometry: THREE.BufferGeometry, vertices: Float32Array, create: create}}
     */
    var point = function () {
        return {
            geometry: new THREE.Geometry(), //new THREE.BufferGeometry()
            //vertices: new Float32Array(maxPoints * 3),
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
            return new THREE.LineBasicMaterial({color: 0xffffff, opacity: 1, linewidth: 1});
        },
        create: function () {
            return new THREE.LineSegments(this.geometry, this.material());
        }
    };

    return {
        name: 'particles',
        create: function (e) {

            var group = e.helpers.group();
            var maps  = e.loader.l(['lib/point-1.png', 'lib/point-2.png', 'lib/point-3.png', 'lib/point-4.png']);

            /**
             * Add Vertices to Points
             */
            for (var i = 0; i < maxPoints; i++) {

                var p = point();

                var x = Math.random() * radius - radius / 2;
                var y = Math.random() * radius - radius / 2;
                var z = Math.random() * radius - radius / 2;

                var material = new THREE.PointsMaterial({
                    map: maps[e.helpers.random(0, 3)],
                    size: 50,
                    transparent: true
                });

                /**
                 * Create one point on the center
                 */
                p.geometry.vertices.push(new THREE.Vector3(0, 0, 0));

                //p.vertices[i * 3] = points[i * 3] = x;
                //p.vertices[i * 3 + 1] = points[i * 3 + 1] = y;
                //p.vertices[i * 3 + 2] = points[i * 3 + 2] = z;

                //var attribute = new THREE.BufferAttribute(p.vertices, 3).setDynamic(true);
                //p.geometry.addAttribute('position', attribute);

                /**
                 * Limit to display only one particle per p
                 */
                //p.geometry.setDrawRange(i, 1);

                /**
                 * Create and add to the Group
                 */
                p = p.create(material);

                p.position.set(x, y, z);
                //p.rotation.y = -Math.PI / 2;

                points.push(p);

                group.add(p);

                particlesData.push({
                    velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
                    connections: 0
                });

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
                maxPoints: 100,
                minDistance: 150,
                radius: 10,
                points: points,
                lines: lines,
                particlesData: particlesData
                //particles: particles
            }
        }

    }

})();