import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Nav Component
 * Events nav.tab.selected
 *        nav.[tab-name].click
 */
export class Nav implements ComponentInterface {

    register(vue, app) {

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

        let tab = vue.extend({
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
                icon: {
                    type: String
                },
            },
            methods: {
                selectTab(e:MouseEvent){

                    /**
                     * If the selected tab is already selected return
                     */
                    if (this.active)
                        return;

                    this.$dispatch(`nav.${this.content}.click`, ...[e, this.element]);

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

                this.$emit('nav.tab.click', 'test')
                this.$emit('test', 'test')

                let hashValue = window.location.hash.replace('#', '');

                this.$children.forEach((child, index) => {

                    /**
                     * If not instance of Tab content wont be available
                     * so in this case return immediately
                     */
                    if (!child.content) return;

                    let element = <HTMLElement>document.querySelector(`#${child.content}`);

                    if (hashValue)
                        child.active = hashValue === child.content;

                    child.$set('element', element);

                    if (!child.active)
                        element.classList.add('+hidden')

                })

            }

        });

        vue.component('ark-item', item);
        vue.component('ark-tab', tab);

    }
}
