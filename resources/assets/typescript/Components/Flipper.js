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
            methods: {
                flip: function () {
                    this.$children.forEach(function (child) {
                        child.$el.classList.toggle('+hidden');
                    });
                    this.$el.classList.toggle('--flipped');
                },
            }
        });
        vue.component('ark-flipper-front', {
            template: require('../templates/flipper/front.html'),
            ready: function () {
                var _this = this;
                getTrigger(this.$el).addEventListener('click', function (event) {
                    event.preventDefault();
                    _this.$parent.flip();
                });
            }
        });
        vue.component('ark-flipper-back', {
            template: require('../templates/flipper/back.html'),
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