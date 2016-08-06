module.exports = (function () {

    /**
     * Point
     * @type {number}
     */
    var maxPoints = 500;

    return {

        name: 'Connections',

        create: function (e, share, maps, objs) {

            var material = new THREE.LineBasicMaterial({color: 0xffffff, opacity: 1, linewidth: 1});

            var geometry       = new THREE.BufferGeometry(),
                linesPositions = new Float32Array((maxPoints * maxPoints) * 3),
                linesColors    = new Float32Array(maxPoints * 3);

            var LinePositionAttribute = new THREE.BufferAttribute(linesPositions, 3).setDynamic(true),
                LineColorAttribute    = new THREE.BufferAttribute(linesColors, 3).setDynamic(true);

            geometry.addAttribute('position', LinePositionAttribute);
            geometry.addAttribute('color', LineColorAttribute);

            return new THREE.LineSegments(geometry, material);

        }

    }

})();