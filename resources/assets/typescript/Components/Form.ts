import {ComponentInterface} from "../Interfaces/ComponentInterface";
import {popByKey} from "../Helpers";

/**
 * Form Component
 */
export class Form implements ComponentInterface {

    register(vue, app) {

        app.vue({
            plugins: [
                require('vue-resource')
            ]
        })

        vue.component('ark-fields', {
                template: require('../templates/form/fields.html'),
                props: {
                    columns: {
                        type: Number,
                        default: 2
                    }
                }
            }
        );

        vue.component('ark-button', {
                template: require('../templates/form/button.html'),
                props: {
                    type: {
                        type: String,
                        default: 'submit'
                    },
                    class: {
                        type: String,
                        default: '--default'
                    }
                }
            }
        );

        vue.component('ark-ajax-button', {
                template: require('../templates/form/ajax-button.html'),
                data: function () {
                    return {
                        formData: new FormData()
                    }
                },
                props: {
                    type: {
                        type: String,
                        default: 'submit'
                    },
                    action: {
                        type: String,
                        required: true
                    },
                    method: {
                        type: String,
                        default: 'post'
                    },
                    class: {
                        type: String,
                        default: '--default'
                    },
                    data: {
                        type: [Object, Array],
                        default: null,
                        coerce: data => JSON.parse(data)
                    },
                    dataFrom: {
                        type: String
                    }
                },
                methods: {
                    send(e:MouseEvent){
                        e.preventDefault();

                        let response = this.$http[this.method](this.action, this.formData);

                        response.then(function (e) {
                            console.log(e)
                        }, function (e) {
                            console.log(e)
                        })

                    }
                },

                ready(){

                    let form = null;

                    if (this.dataFrom) {
                        form = <HTMLFormElement>document.querySelector(`#${this.dataFrom}`);
                        this.$set('formData', new FormData(form));
                    }

                    for (let key in this.data) {
                        this.formData.append(key, this.data[key])
                    }

                }
            }
        );

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

                    let parent = this.$parent;

                    /**
                     * In Case its an instance of ArkFields
                     */
                    if (this.$parent.constructor.name !== 'ArkForm')
                        parent = parent.$parent;

                    return popByKey(parent.errors, this.name);
                }
            }
        });

        vue.component('ark-form', {
            template: require('../templates/form/form.html'),
            props: {
                id: String,
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

