module.exports = (function () {

    return {
        name: 'cube',
        create: function (e) {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
            return new THREE.Mesh(geometry, material);
        }
    }

})();