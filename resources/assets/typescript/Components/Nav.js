"use strict";
/**
 * Nav Component
 * Events nav.tab.selected
 *        nav.[tab-name].click
 */
var Nav = (function () {
    function Nav() {
    }
    Nav.prototype.register = function (vue, app) {
        var item = vue.extend({
            template: require('../templates/nav/item.html'),
            props: {
                url: {
                    type: String,
                    default: '#'
                },
                active: {
                    type: Boolean,
                    default: false
                }
            },
            computed: {
                style: function () {
                    return this.active ? '--active' : '';
                }
            }
        });
        var tab = vue.extend({
            template: require('../templates/nav/tab.html'),
            data: function () {
                return {
                    element: null
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
                icon: {
                    type: String
                },
            },
            methods: {
                selectTab: function (e) {
                    /**
                     * If the selected tab is already selected return
                     */
                    if (this.active)
                        return;
                    this.$dispatch.apply(this, ["nav." + this.content + ".click"].concat([e, this.element]));
                    this.$parent.selectTab(this.element);
                }
            },
            computed: {
                style: function () {
                    return this.active ? '--active' : '';
                }
            }
        });
        vue.component('ark-nav', {
            template: require('../templates/nav/nav.html'),
            props: {
                class: {
                    type: String,
                    default: 'row --fluid nav --hover align-center'
                },
                basic: {
                    type: Boolean,
                },
            },
            computed: {
                style: function () {
                    return this.basic ? 'row nav --basic' : this.class;
                }
            },
            methods: {
                selectTab: function (element) {
                    this.$dispatch('nav.tab.selected', element);
                    this.$children.forEach(function (child) {
                        if (child.element === element) {
                            child.$set('active', true);
                            child.element.classList.remove('+hidden');
                        }
                        else {
                            child.$set('active', false);
                            child.element.classList.add('+hidden');
                        }
                    });
                }
            },
            ready: function () {
                this.$emit('nav.tab.click', 'test');
                this.$emit('test', 'test');
                var hashValue = window.location.hash.replace('#', '');
                this.$children.forEach(function (child, index) {
                    /**
                     * If not instance of Tab content wont be available
                     * so in this case return immediately
                     */
                    if (!child.content)
                        return;
                    var element = document.querySelector("#" + child.content);
                    if (hashValue)
                        child.active = hashValue === child.content;
                    child.$set('element', element);
                    if (!child.active)
                        element.classList.add('+hidden');
                });
            }
        });
        vue.component('ark-item', item);
        vue.component('ark-tab', tab);
    };
    return Nav;
}());
exports.Nav = Nav;
//# sourceMappingURL=Nav.js.map