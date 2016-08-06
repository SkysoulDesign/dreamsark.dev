module.exports = (function () {

    return {
        name: 'NebuleBuffer',
        create: function (e, maps, share) {

            var maxParticleCount = 15000 / 2,
                distance         = 300;

            var particles         = new THREE.BufferGeometry(),
                particlePositions = new Float32Array(maxParticleCount * 3);

            /**
             * Add Vertices to Points
             */
            e.helpers.for(maxParticleCount, function (i) {

                var vector = e.helpers.random3(0, 0, 0, distance, false);

                particlePositions[i * 3]     = vector.x;
                particlePositions[i * 3 + 1] = vector.y;
                particlePositions[i * 3 + 2] = vector.z;

            });

            particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));

            return particles;

        }

    }

})();