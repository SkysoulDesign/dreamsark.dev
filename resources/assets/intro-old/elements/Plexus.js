module.exports = (function () {

    /**
     * Point
     * @type {number}
     */
    var maxPoints = 50;

    return {

        name: 'Plexus',

        maps: function () {
            return {
                point1: 'lib/point-1.png',
                point2: 'lib/point-2.png',
                point3: 'lib/point-3.png',
                point4: 'lib/point-4.png',
                cover: 'lib/cover-hunger.png'
            }
        },

        create: function (e, share, maps, objs) {

            var group = e.helpers.group();

            /**
             * Add Vertices to Points
             */
            e.helpers.for(maxPoints, function (i) {

                var particles         = new THREE.BufferGeometry();
                var particlePositions = new Float32Array(3);

                var material = new THREE.PointsMaterial({
                    map: maps['point' + e.helpers.random(1, 4)],
                    size: 10,
                    transparent: true,
                    sizeAttenuation: true,
                    alphaTest: 0.2,
                    opacity: 0
                });

                particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));

                var point = new THREE.Points(particles, material);

                /**
                 * Set Point Meta Data
                 * @type {{src: *, title: string, description: string}}
                 */
                point.userData = {
                    position: e.helpers.random3(Math.random() * 3, Math.random() * 3, Math.random() * 3, 500, false),
                    opacity: 1,
                    connections: 0,
                    src: material.map.image.src,
                    cover: maps.cover.image.src,
                    title: 'Project Beta Tittle',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias corporis deleniti deserunt eveniet expedita fuga fugiat.'
                };

                /**
                 * Set Position in real world so can be accessible by lookAt
                 */
                    //point.position.copy(vector);

                group.add(point);

            });

            return group;

        }

    }

})();