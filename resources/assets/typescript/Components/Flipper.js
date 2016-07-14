"use strict";
/**
 * Flipper Component
 */
var Flipper = (function () {
    function Flipper() {
    }
    Flipper.prototype.register = function (vue) {
        var getTrigger = function (el) {
            return el.querySelector('[data-flipper-trigger]');
        };
        vue.component('ark-flipper', {
            template: require('../templates/flipper/flipper.html'),
            props: {
                class: String,
            },
            methods: {
                flip: function () {
                    this.$children.forEach(function (child) {
                        child.$el.classList.toggle('+hidden');
                    });
                    this.$el.classList.toggle('--flipped');
                },
            }
        });
        vue.component('ark-flipper-content', {
            template: require('../templates/flipper/side.html'),
            props: {
                class: String,
                side: {
                    type: String,
                    required: true
                },
            },
            ready: function () {
                var _this = this;
                getTrigger(this.$el).addEventListener('click', function (event) {
                    event.preventDefault();
                    _this.$parent.flip();
                });
            }
        });
    };
    return Flipper;
}());
exports.Flipper = Flipper;
//# sourceMappingURL=Flipper.js.map