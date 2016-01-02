module.exports = (function () {

    return {
        name: 'ground',
        create: function (e) {

            var map = e.loader.l('lib/ground.png');

            var material = new THREE.MeshBasicMaterial({
                map: map,
                side: THREE.DoubleSide,
                transparent: true
            });

            var radius   = 200;
            var segments = 10;

            var circleGeometry = new THREE.CircleGeometry(radius, segments);

            var ground = new THREE.Mesh(circleGeometry, material);

            ground.rotation.x = Math.PI / 2;
            ground.position.y = -21;

            return ground;
        }
    }

})();