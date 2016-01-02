module.exports = (function () {

    return {
        name: 'Skybox',
        maps: function () {
            return {
                skybox: 'lib/background-sphere.jpg'
            }
        },
        create: function (e, share, maps, objs) {

            var geometry = new THREE.SphereGeometry(500, 50, 50);
            geometry.scale(-1, 1, 1);
            var material = new THREE.MeshBasicMaterial({map: maps.skybox, transparent: true, opacity: 0});
            return new THREE.Mesh(geometry, material);

        }
    }

})();