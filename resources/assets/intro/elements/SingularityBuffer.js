module.exports = (function () {

    return {
        name: 'SingularityBuffer',
        create: function (e, maps, share) {

            var maxParticleCount = 15000,
                radius           = 0;

            var particles         = new THREE.BufferGeometry(),
                particlePositions = new Float32Array(maxParticleCount * 3);

            /**
             * Add Vertices to Points
             */
            e.helpers.for(maxParticleCount, function (i) {

                var vector = e.helpers.random3(0, 0, 0, radius / 4, true);

                particlePositions[i * 3]     = vector.x;
                particlePositions[i * 3 + 1] = vector.y;
                particlePositions[i * 3 + 2] = vector.z;

            });

            particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));

            return particles;

        }

    }

})();