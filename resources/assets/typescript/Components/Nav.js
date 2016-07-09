"use strict";
/**
 * Nav Component
 */
var Nav = (function () {
    function Nav() {
    }
    Nav.prototype.register = function (Vue) {
        var item = Vue.extend({
            template: require('../templates/nav/item.html'),
            props: {
                url: {
                    type: String,
                    default: '#'
                },
                active: {
                    type: Boolean,
                    default: false
                },
                content: String
            },
            computed: {
                style: function () {
                    return this.active ? '--active' : '';
                }
            }
        });
        var tab = Vue.extend({
            template: require('../templates/nav/tab.html'),
            data: function () {
                return {
                    element: document.querySelector("#" + this.content)
                };
            },
            props: {
                content: {
                    type: String,
                    required: true
                },
                active: {
                    type: Boolean,
                    default: false
                },
            },
            methods: {
                selectTab: function (e) {
                    /**
                     * Do not scroll on click
                     */
                    e.preventDefault();
                    this.$parent.selectTab(this.element);
                }
            },
            computed: {
                style: function () {
                    return this.active ? '--active' : '';
                }
            },
            ready: function () {
                this.element.classList.add('+hidden');
                this.$parent.$data.tabs.push(this.element);
            }
        });
        Vue.component('ark-nav', {
            template: require('../templates/nav/nav.html'),
            data: function () {
                return {
                    tabs: []
                };
            },
            methods: {
                selectTab: function (element) {
                    this.tabs.forEach(function (tab) {
                        if (element === tab) {
                            tab.classList.remove('+hidden');
                        }
                        else {
                            tab.classList.add('+hidden');
                        }
                    });
                }
            }
        });
        Vue.component('ark-item', item);
        Vue.component('ark-tab', tab);
    };
    return Nav;
}());
exports.Nav = Nav;
//# sourceMappingURL=Nav.js.map