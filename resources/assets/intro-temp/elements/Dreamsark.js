module.exports = (function () {

    return {
        name: 'dreamsark',
        create: function (e) {
            var factor   = 100;
            var geometry = new THREE.PlaneGeometry(4 * factor, factor, 1);
            var map      = e.loader.l('lib/dreamsark.png');
            var material = new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: map,
                transparent: true
            });
            return new THREE.Mesh(geometry, material);
        }
    }

})();