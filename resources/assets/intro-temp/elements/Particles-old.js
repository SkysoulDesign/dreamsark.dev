module.exports = (function () {

    var PARTICLE_SIZE = 20;
    var particles, uniforms;

    return {
        name:   'particles',
        create: function (e) {

            var geometry1 = new THREE.BoxGeometry(200, 200, 200, 16, 16, 16);
            var vertices  = geometry1.vertices;

            var positions = new Float32Array(vertices.length * 3);
            var colors    = new Float32Array(vertices.length * 3);
            var sizes     = new Float32Array(vertices.length);

            var vertex;
            var color = new THREE.Color();

            for (var i = 0, l = vertices.length; i < l; i++) {

                vertex = vertices[i];
                vertex.toArray(positions, i * 3);

                color.setHSL(0.01 + 0.1 * ( i / l ), 1.0, 0.5)
                color.toArray(colors, i * 3);

                sizes[i] = PARTICLE_SIZE * 0.5;

            }

            var geometry = new THREE.BufferGeometry();
            geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
            geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));

            //

            var loader   = new THREE.TextureLoader(e.manager);
            var material = new THREE.ShaderMaterial({

                uniforms:       {
                    color:   {type: "c", value: new THREE.Color(0xffffff)},
                    texture: {type: "t", value: loader.load("lib/disc.png")}
                },

                vertexShader:   document.getElementById('vertexshader').textContent,
                fragmentShader: document.getElementById('fragmentshader').textContent,

                alphaTest: 0.9,

            });

            //

            return new THREE.Points(geometry, material);

        }
    }

})();