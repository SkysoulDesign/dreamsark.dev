import {ComponentInterface} from "../Interfaces/ComponentInterface";
import {popByKey} from "../Helpers";

/**
 * Form Component
 */
export class Form implements ComponentInterface {

    register(vue) {

        vue.component('ark-input', {
            template: require('../templates/form/input.html'),
            props: {
                name: {
                    type: String,
                    required: true
                },
                placeholder: {
                    type: String,
                    default: function () {
                        return this.name
                    }
                },
                type: {
                    type: String,
                    default: 'text'
                },
                title: {
                    type: String,
                    default: function () {
                        return this.name
                    }
                }
            },
            computed: {
                errors: function () {
                    return popByKey(this.$parent.errors, this.name);
                }
            }
        });

        vue.component('ark-form', {
            template: require('../templates/form/form.html'),
            props: {
                token: String,
                action: {
                    type: String,
                    required: true
                },
                method: {
                    type: String,
                    default: 'post'
                },
                errors: {
                    type: [Object, Array],
                    coerce: data => JSON.parse(data)
                }
            }
        });

    }

}

