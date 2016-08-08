module.exports = (function () {

    return {
        name: 'Dreamsark',
        maps: function () {
            return {
                texture: 'lib/universe.png',
                //texturea: 'http://www.gettyimages.ca/gi-resources/images/Homepage/Category-Creative/UK/UK_Creative_462809583.jpg',
                //textuasrea: 'http://www.planwallpaper.com/static/images/magic-of-blue-universe-images.jpg',
                //textxure: 'http://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg',
                //textfure: 'http://blog.jimdo.com/wp-content/uploads/2014/01/tree-247122.jpg'
            }
        },
        share: function () {

            return {
                factor: 100
            }

        },
        create: function (e, maps, share) {

            var geometry = new THREE.PlaneGeometry(4 * share.factor, share.factor, 1);
            var map      = maps.texture;

            var material = new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: map,
                transparent: true
            });

            return new THREE.Mesh(geometry, material);

        }
    }

})();