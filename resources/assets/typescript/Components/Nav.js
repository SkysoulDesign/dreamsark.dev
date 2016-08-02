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
            template: require('html!../templates/nav/item.html'),
            props: {
                url: {
                    type: String,
                    default: '#'
                },
                active: {
                    type: Boolean,
                    default: false
                },
                icon: String
            },
            computed: {
                style: function () {
                    return this.active ? '--active' : '';
                }
            }
        });
        var tab = vue.extend({
            template: require('html!../templates/nav/tab.html'),
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
                icon: String,
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
            template: require('html!../templates/nav/nav.html'),
            props: {
                class: String,
                basic: Boolean,
                color: {
                    type: String,
                    default: 'white'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTmF2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTs7OztHQUlHO0FBQ0g7SUFBQTtJQWlJQSxDQUFDO0lBL0hHLHNCQUFRLEdBQVIsVUFBUyxHQUFHLEVBQUUsR0FBRztRQUViLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDbEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQztZQUNwRCxLQUFLLEVBQUU7Z0JBQ0gsR0FBRyxFQUFFO29CQUNELElBQUksRUFBRSxNQUFNO29CQUNaLE9BQU8sRUFBRSxHQUFHO2lCQUNmO2dCQUNELE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsT0FBTztvQkFDYixPQUFPLEVBQUUsS0FBSztpQkFDakI7Z0JBQ0QsSUFBSSxFQUFFLE1BQU07YUFDZjtZQUNELFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFDekMsQ0FBQzthQUNKO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUNqQixRQUFRLEVBQUUsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO1lBQ25ELElBQUksRUFBRTtnQkFDRixNQUFNLENBQUM7b0JBQ0gsT0FBTyxFQUFFLElBQUk7aUJBQ2hCLENBQUE7WUFDTCxDQUFDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsTUFBTTtvQkFDWixRQUFRLEVBQUUsSUFBSTtpQkFDakI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFBRSxLQUFLO2lCQUNqQjtnQkFDRCxJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFNBQVMsWUFBQyxDQUFZO29CQUVsQjs7dUJB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