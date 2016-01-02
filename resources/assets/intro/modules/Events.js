module.exports = (function (e) {

    /**
     * Append Camera to Engine
     */
    return e.events = {

        events: null,
        collection: [],

        init: function () {
            this.events = this;
        },

        add: function (element, event, callback, context, useCapture) {

            /**
             * push the element to the collection
             */
            this.collection.push({
                element: element,
                event: event
            });

            var temp = {
                element: element,
                trigger: false,
                event: event
            };

            temp.callback = function (ev) {
                temp.trigger = callback.call(context || e, ev)
            };

            //console.log(callback)

            /**
             * Add Event Listener
             */
            element.addEventListener(event, temp.callback, useCapture || false);

            var checker = e.module('checker').class;

            /**
             * Checker to check if the event was removed
             */
            checker.add(function () {

                if (temp.trigger === true)
                    return this.remove(temp);

            }, this, 'Event Listener: ' + event)

        },

        remove: function (object) {

            var collection = this.collection;

            e.helpers.keys(collection, function (el, index) {

                if (el.element === object.element && object.event === el.event) {
                    object.element.removeEventListener(object.event, object.callback);
                    collection.splice(index, 1);
                }

            });

            return true;

        }

    };

})(Engine);