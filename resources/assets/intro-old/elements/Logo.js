module.exports = (function () {

    return {

        name: 'Logo',

        objs: function () {
            return {
                logo: 'models/ship.obj'
            }
        },

        create: function (e, share, maps, objs) {

            var material = new THREE.MeshBasicMaterial({
                color: new THREE.Color('blue'),
                wireframe: true
            });

            //objs.logo.rotation.x = -Math.PI / 2;
            objs.logo.material = material;
            //objs.logo.scale.multiplyScalar(3);
            objs.logo.geometry.scale(0.8, 0.8, 0.8);
            //objs.logo.position.y = 20;

            return objs.logo;

        }

    }

})();