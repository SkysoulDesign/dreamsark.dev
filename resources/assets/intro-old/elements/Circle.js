module.exports = (function () {

    return {

        name: 'Circle',

        create: function (e, maps, share) {

            var material = new THREE.MeshBasicMaterial({
                color: 0xffffff
            });

            var radius   = 2;
            var segments = 32;

            var circleGeometry = new THREE.CircleGeometry(radius, segments);

            return new THREE.Mesh(circleGeometry, material);

        }

    }

})();