module.exports = (function () {

    return {
        name: 'point',
        create: function (e) {

            var map = e.loader.l('lib/point-1.png');

            var material = new THREE.PointsMaterial({
                map: map,
                size: 50,
                transparent: true
            });

            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, 0, 0));

            return new THREE.Points(geometry, material);

        }

    }

})();