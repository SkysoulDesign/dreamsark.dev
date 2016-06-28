import {ComponentInterface} from "../interfaces/ComponentInterface";

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
                },
                content: String
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
                    element: document.querySelector(`#${this.content}`)
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
                selectTab(){
                    this.$parent.selectTab(this.element);
                }
            },
            computed: {
                style: function () {
                    return this.active ? '--active' : '';
                }
            },
            ready(){
                console.log('hi');
                this.element.classList.add('+hidden')
                this.$parent.$data.tabs.push(
                    this.element
                )
            }
        });

        Vue.component('ark-nav', {
            template: require('../templates/nav/nav.html'),
            data: function () {
                return {
                    tabs: []
                }
            },
            methods: {
                selectTab: function (element) {

                    this.tabs.forEach(function (tab:HTMLElement) {

                        if (element === tab) {
                            tab.classList.remove('+hidden');
                        } else {
                            tab.classList.add('+hidden')
                        }

                    })

                }
            }
        });

        Vue.component('ark-item', item);
        Vue.component('ark-tab', tab);

    }
}
