module.exports = (function (e) {

    return {

        setup: function (data, E, ex) {


            points = e.helpers.group();

            var lastPoint = null;

            var coordinates = {
                0: new THREE.Vector2(20, 0),
                1: new THREE.Vector2(0, 20),
                2: new THREE.Vector2(40, 0),
                3: new THREE.Vector2(0, 40),
            };

            for (var i = 0; i < 4; i++) {

                var point = E.point.clone();

                point.material.size = 25;

                point.position.copy(ex.point.position);

                point.position.x = coordinates.x;
                point.position.y = coordinates.y;

                points.add(point);

            }

            e.scene.a.add(points);

            e.plugins.OrbitControls.instance.enabled = false;

        },

        animation: function (data, E) {

        }

    };

})(Engine);