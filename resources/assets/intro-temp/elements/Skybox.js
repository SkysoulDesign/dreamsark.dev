module.exports = (function () {

    return {
        name: 'skybox',
        create: function (e) {

            var map = (new THREE.TextureLoader(e.manager)).load('lib/universe.jpg');
            var geo = new THREE.SphereGeometry(500, 50, 50);
            geo.scale(-1, 1, 1);
            var mat = new THREE.MeshBasicMaterial({map: map});
            return new THREE.Mesh(geo, mat);

        }
    }

})();