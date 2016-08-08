module.exports = (function (e) {

    /**
     * Append Camera to Engine
     */
    return e.mouse = {

        mouse: null,
        x: null, y: null,
        ratio: null,
        normalized: null,
        collection: [],
        enabled: false,

        init: function () {

            this.mouse = this;
            this.x     = 0;
            this.y     = 0;
            this.ratio = new THREE.Vector2(0, 0);

            this.normalized = new THREE.Vector2(0, 0);

            this.enabled = true;

            var events = e.module('events');

            /**
             * Attach the core event for mouse to work
             */
            events.add(window, 'mousemove', this.core, this);

        },

        set: function (x, y) {
            this.x = x;
            this.y = y;
        },

        core: function (event) {

            /**
             * if not enabled then destroy it
             */
            if (!this.enabled)
                return this.destroy();

            var browser = e.module('browser');

            this.mouse.set(event.clientX, event.clientY);

            /**
             * Normalized
             * @type {number}
             */
            var x = ( event.clientX / browser.innerWidth ) * 2 - 1,
                y = -( event.clientY / browser.innerHeight ) * 2 + 1;

            this.normalized.set(x, y);

            if (e.helpers.isNull(browser.width) && e.helpers.isNull(browser.height)) {
                this.ratio.x = event.clientX / browser.innerWidth;
                this.ratio.y = event.clientY / browser.innerHeight;
            }

        },

        destroy: function () {
            this.mouse = null
            return true;
        },

        click: function (element, callback, context, userCapture, group) {

            /**
             * if it's an THREE object then dispatches it to raycaster
             */
            if (element instanceof THREE.Mesh || element instanceof THREE.Object3D) {

                var raycaster = e.module('raycaster').class;
                raycaster.click(element, group, callback, context);

                return;

                //this.collection.push({
                //    element: element,
                //    group: group,
                //    type: 'click',
                //    raycaster: true
                //});
                //
                ///**
                // * return the index of the last element
                // */
                //return e.helpers.length(this.collection) - 1;

            }

            var events = e.module('events');
            events.add(element, 'click', callback, context || this, userCapture);

            this.collection.push({
                element: element,
                type: 'click'
            });

            /**
             * return the index of the last element
             */
            return e.helpers.length(this.collection) - 1;

        },

        move: function (element, callback, context, userCapture) {

            /**
             * if it's an THREE object then dispatches it to raycaster
             */
            if (element instanceof THREE.Mesh || element instanceof THREE.Object3D) {

                var raycaster = e.module('raycaster').class;
                raycaster.move(element, callback, context);

                return;

                ///**
                // * return the index of the last element
                // */
                //return e.helpers.length(this.collection) - 1;

            }

            var events = e.module('events');
            events.add(element, 'mousemove', callback, context || this, userCapture);

            this.collection.push({
                element: element,
                type: 'mousemove'
            });

            /**
             * return the index of the last element
             */
            return e.helpers.length(this.collection) - 1;

        },

        hover: function (element, callbackIn, callbackOut, context, userCapture, group) {

            /**
             * if it's an THREE object then dispatches it to raycaster
             */
            if (element instanceof THREE.Mesh || element instanceof THREE.Object3D) {

                var raycaster = e.module('raycaster').class;
                raycaster.hover(element, group, callbackIn, callbackOut, context);

                return;

                //this.collection.push({
                //    element: element,
                //    group: group,
                //    type: 'hover',
                //    raycaster: true
                //});
                //
                ///**
                // * return the index of the last element
                // */
                //return e.helpers.length(this.collection) - 1;

            }

            console.log('still to implement the hover method')

        },

        hoverClick: function (element, callbackIn, callbackOut, callbackClick, context, userCapture, group) {

            /**
             * if it's an THREE object then dispatches it to raycaster
             */
            if (element instanceof THREE.Mesh || element instanceof THREE.Object3D) {

                var raycaster = e.module('raycaster').class;
                raycaster.hoverClick(element, group, callbackIn, callbackOut, callbackClick, context);

                return;

                //this.collection.push({
                //    element: element,
                //    group: group,
                //    type: 'hoverClick',
                //    raycaster: true
                //});
                //
                ///**
                // * return the index of the last element
                // */
                //return e.helpers.length(this.collection) - 1;

            }

            console.log('still to implement the hoverClick method')

        },

        delete: function (index) {

            var collection = this.collection;

            /**
             * if it`s an raycaster object so remove it
             */
            if (!e.helpers.isNull(collection[index].raycaster)) {

                var raycaster = e.module('raycaster').class
                raycaster.delete(collection[index]);

            }

            this.collection.splice(index, 1);
        }

    };

})(Engine);