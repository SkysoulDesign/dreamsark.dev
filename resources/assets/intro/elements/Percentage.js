module.exports = (function () {

    return {

        name: 'Percentage',

        create: function (e, share, maps, objs) {

            var defaults = {
                size: 1,
                height: 0.3
            };

            var material = new THREE.MeshPhongMaterial({
                color: new THREE.Color('red'),
                emissive: new THREE.Color('red'),
                side: THREE.DoubleSide,
                shading: THREE.FlatShading
            });

            var geometry = new THREE.TextGeometry('Loading...', defaults);

            geometry.center();

            var text = new THREE.Mesh(geometry, material);

            return {

                text: text,

                defaults: {
                    size: 1,
                    height: 0.3
                },

                update: function (text, options) {

                    /**
                     * Dispose Geometry from Memory
                     */
                    this.delete();

                    geometry = new THREE.TextGeometry(text, e.helpers.extend(this.defaults, options));
                    geometry.center();

                    this.text.geometry = geometry;

                },

                delete: function () {
                    this.text.geometry.dispose();
                },

                clone: function (text) {

                    /**
                     * Clone but ignore text property as it has to be cloned by its own clone method
                     */
                    var clone = e.helpers.clone(this, 'text');

                    clone.text = this.text.clone();

                    /**
                     * Update if text is set
                     */
                    if (text) clone.update(text);

                    return clone;
                }

            };
        }

    }

})();