module.exports = (function () {

    return {
        name: 'Cube',
        create: function (e, maps, share) {

            var geometry = new THREE.BoxGeometry(3, 1, 1);
            var material = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, wireframe: true});
            return new THREE.Mesh(geometry, material);

        }

    }

})();