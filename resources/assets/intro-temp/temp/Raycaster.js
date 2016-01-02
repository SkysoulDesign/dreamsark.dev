module.exports = function (e) {

    /**
     * Raycaster
     * @type {THREE.Raycaster}
     */
    return e.raycaster = {
        index: null,
        intersected: null,
        a: null,
        objects: [],
        on: null,
        out: null,
        onClick: null,


        init: function (configs) {
            this.a = new THREE.Raycaster();
            this.configure(configs);
        },

        configure: function (configs) {
            var defaults                   = {
                params: {
                    Points: {
                        threshold: 10
                    }
                }
            };
            this.a.params.Points.threshold = 10;
        },

        setFrom: function (origin, direction) {
            this.a.setFromCamera(origin, direction);
        },

        click: function () {
            if (typeof this.onClick === 'function' && this.index !== null)
                this.onClick.call(this, this.index, this.intersected);
        },

        calculate: function () {

            /**
             * If not initialized then returns
             * If raycaster not set then returns
             */
            if (this.a === null || typeof e.compositor.active.raycaster !== 'function') return;

            e.compositor.active.raycaster.call(this, e.compositor.public, e.elements);

            var intersects = this.a.intersectObjects(this.objects);

            if (intersects.length > 0) {

                if (this.index != intersects[0].index) {

                    this.index       = intersects[0].index;
                    this.intersected = intersects[0].object;

                    if (typeof this.on === 'function')
                        this.on.call(this, this.index, this.intersected);

                }

            } else if (this.index !== null) {

                if (typeof this.out === 'function')
                    this.out.call(this, this.index, this.intersected);

                this.index = null;

            }

        }
    };

};