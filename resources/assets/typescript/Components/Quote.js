"use strict";
/**
 * Quote Component
 */
var Quote = (function () {
    function Quote() {
    }
    Quote.prototype.register = function (vue, app) {
        vue.component('ark-quote', {
            template: require('../templates/quote/quote.html'),
            props: {
                expandable: {
                    type: Boolean,
                    default: true
                },
                maxHeight: {
                    type: Number,
                    default: 500
                },
                expandText: {
                    type: String,
                    default: 'expand'
                }
            },
            methods: {
                expand: function () {
                    this.$el.classList.remove('--collapsed');
                    this.$el.style.removeProperty('max-height');
                }
            },
            ready: function () {
                if (this.expandable &&
                    this.$el.offsetHeight > this.maxHeight) {
                    this.$el.classList.add('--collapsed');
                    this.$el.style.maxHeight = this.maxHeight + 'px';
                }
            }
        });
    };
    return Quote;
}());
exports.Quote = Quote;
//# sourceMappingURL=Quote.js.map