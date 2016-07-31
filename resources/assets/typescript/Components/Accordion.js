"use strict";
/**
 * Accordion Component
 */
var Accordion = (function () {
    function Accordion() {
    }
    Accordion.prototype.register = function (vue, app) {
        vue.component('ark-accordion-item', {
            template: require('html!../templates/accordion/accordion-item.html'),
            props: {
                show: Boolean
            },
            methods: {
                toggle: function () {
                    this.show = !this.show;
                    this.$dispatch('item-show', this);
                }
            }
        });
        vue.component('ark-accordion', {
            template: require('html!../templates/accordion/accordion.html'),
            data: function () {
                return {
                    active: null
                };
            },
            events: {
                'item-show': function (active) {
                    this.$children.forEach(function (accordion) {
                        if (accordion !== active)
                            accordion.show = false;
                    });
                },
            }
        });
    };
    return Accordion;
}());
exports.Accordion = Accordion;
//# sourceMappingURL=Accordion.js.map