import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Nav Component
 */
export class Nav implements ComponentInterface {

    register(Vue) {

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
                }
            },
            computed: {
                style: function () {
                    return this.active ? '--active' : '';
                }
            }
        });

        let tab = Vue.extend({
            template: require('../templates/nav/tab.html'),
            data: function () {
                return {
                    element: null
                }
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
                selectTab(e:MouseEvent){

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
            }
        });

        Vue.component('ark-nav', {
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

                    this.$children.forEach(function (child) {

                        if (child.element === element) {
                            child.$set('active', true)
                            child.element.classList.remove('+hidden');
                        } else {
                            child.$set('active', false)
                            child.element.classList.add('+hidden')
                        }

                    })

                }
            },

            ready(){

                this.$children.forEach((child, index) => {

                    /**
                     * If not instance of Tab content wont be available
                     * so in this case return immediately
                     */
                    if (!child.content) return;

                    let element = <HTMLElement>document.querySelector(`#${child.content}`);

                    child.$set('element', element);

                    if (!child.active)
                        element.classList.add('+hidden')

                })

            }

        });

        Vue.component('ark-item', item);
        Vue.component('ark-tab', tab);

    }
}
