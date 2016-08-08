module.exports = (function (e) {

    /**
     * Append Camera to Engine
     */
    return e.tween = {

        tween: null,

        init: function () {
            this.tween = this;
        },

        create: function (obj, ease, callback, context) {

            /**
             * if not an object then assume it is a duration only
             */
            if (!e.helpers.isObject(ease))
                ease = {duration: ease};

            var defaults = {
                begin: 0,
                ease: 'quintInOut',
                duration: 1,
                origin: false,
                delay: false,
                start: function () {
                },
                complete: function () {
                }
            };

            e.helpers.extend(defaults, ease);

            /**
             * if Delay is set, delay this function execution
             */
            if (defaults.delay !== false) {

                e.helpers.timeout(defaults.delay, function(){

                    /**
                     * Set delay to false so it wont fall here again
                     * @type {boolean}
                     */
                    defaults.delay = false;

                    this.create(obj, defaults, callback, context);

                }, this);

                return;

            }

            /**
             * if Origin is set, subtract it from origin to re-add in the end
             */
            if (defaults.origin !== false) {
                defaults.origin = e.helpers.clone(defaults.origin);
                obj             = e.helpers.sub(obj, defaults.origin);

            }

            /**
             * amplify to time base
             * @type {number}
             */
            defaults.duration *= 1000;

            var instance = {},
                checker  = e.module('checker').class;

            /**
             * Call Start when it begins
             */
            defaults.start.call(context || e);

            checker.add(function (elapsed_time) {

                if (elapsed_time <= defaults.duration) {

                    var progress = elapsed_time / defaults.duration;

                    instance = e.helpers.map(obj, function (value) {
                        return Easie[defaults.ease](progress, defaults.begin, value, 1);
                    });

                    if (defaults.origin !== false)
                        instance = e.helpers.add(instance, defaults.origin);

                    /**
                     * Call the CallBack
                     */
                    callback.call(context || e, instance);

                    return false;

                }

                /**
                 * Call Complete when the time is up
                 */
                defaults.complete.call(context || e);

                /**
                 * Destroy Checker
                 */
                return true;

            }, this);

        },

        add: function (target, duration, vars) {
            return new TweenLite(target, duration, vars);
        }

    };

})(Engine);