"use strict";
/**
 * Profiles Component
 */
var Animation = (function () {
    function Animation() {
    }
    Animation.prototype.register = function (vue, app) {
        vue.component('ark-animation', {
            template: require('../templates/animation/animation.html'),
            props: {
                class: String,
                composition: {
                    type: String,
                    required: true,
                },
                payload: {
                    type: Array
                },
            },
            ready: function () {
                var animation = app.plugin('profile', this.$el);
                animation.start.apply(animation, [this.composition].concat(this.payload));
            }
        });
    };
    return Animation;
}());
exports.Animation = Animation;
//# sourceMappingURL=Animation.js.map