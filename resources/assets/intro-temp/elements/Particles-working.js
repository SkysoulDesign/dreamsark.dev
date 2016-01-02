module.exports = (function () {

    var particlesData = [];
    var positions, colors;
    var particles;
    var pointCloud;
    var particlePositions;
    var linesMesh;

    var maxParticleCount = 500;
    var particleCount    = 260;
    var radius           = 800;

    return {
        name: 'particles',
        create: function (e) {

            var helper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(radius, radius, radius)));
            helper.material.color.setHex(0x080808);
            helper.material.blending    = THREE.AdditiveBlending;
            helper.material.transparent = true;

            var segments = maxParticleCount * maxParticleCount;

            positions = new Float32Array(segments * 3);
            colors    = new Float32Array(segments * 3);

            var sprite = (new THREE.TextureLoader(e.manager)).load("lib/disc.png");

            var PointMaterial = new THREE.PointsMaterial({
                color: 0xFFFFFF,
                size: 1,
                blending: THREE.AdditiveBlending,
                transparent: true,
                sizeAttenuation: false,
                map: sprite,
                alphaTest: 0.5
            });

            var group = e.helpers.group();

            particles         = new THREE.BufferGeometry();
            particlePositions = new Float32Array(maxParticleCount * 3);

            for (var i = 0; i < maxParticleCount; i++) {

                var x = Math.random() * radius - radius / 2;
                var y = Math.random() * radius - radius / 2;
                var z = Math.random() * radius - radius / 2;

                var geo = new THREE.Geometry();

                geo.vertices.push(
                    new THREE.Vector3(-x, y, z),
                    new THREE.Vector3(-x, -y, z),
                    new THREE.Vector3(x, -y, -z)
                );

                geo.faces.push(new THREE.Face3(0, 1, 2));

                geo.computeBoundingSphere();

                var point = new THREE.Points(geo);

                group.add(point);

                particlePositions[i * 3]     = x;
                particlePositions[i * 3 + 1] = y;
                particlePositions[i * 3 + 2] = z;

                // add it to the geometry
                particlesData.push({
                    velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
                    numConnections: 0
                });

            }

            particles.setDrawRange(0, particleCount);
            particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));

            /**
             * Lines
             * @type {THREE.BufferGeometry}
             */
            var geometry = new THREE.BufferGeometry();

            geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true));
            geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3).setDynamic(true));

            geometry.computeBoundingSphere();

            geometry.setDrawRange(0, 0);

            var material = new THREE.LineBasicMaterial({
                vertexColors: THREE.VertexColors,
                blending: THREE.AdditiveBlending,
                transparent: true
            });

            pointCloud = new THREE.Points(particles, PointMaterial);
            linesMesh  = new THREE.LineSegments(geometry, material);

            return group.add(helper, linesMesh);

        },

        share: function (e) {
            return {
                pointCloud: pointCloud,
                linesMesh: linesMesh,
                particlesData: particlesData,
                particlePositions: particlePositions,
                particleCount: particleCount,
                colors: colors,
                radius: radius,
                positions: positions,
                particles: particles
            }
        }
    }

})();