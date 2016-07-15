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
                    gap: {
                        type: String,
                        default: 'normal' // normal, small, medium, large, huge
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
                    state: {
                        type: String
                    },
                    class: {
                        type: String
                    }
                }
            }
        );

        vue.component('ark-ajax-button', {
                template: require('../templates/form/ajax-button.html'),
                data: function () {
                    return {
                        disabled: false,
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
                        default: 'post',
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
                    },
                    setTimer: {
                        type: Number,
                        default: 0
                    },
                    setDisabled: {
                        type: String,
                        default: 'no'
                    },
                    timerText: {
                        type: String,
                        default: ''
                    }
                },
                methods: {
                    send(e:MouseEvent){
                        e.preventDefault();
                        if (this.setDisabled == 'yes')
                            this.disabled = true;
                        let button = this;

                        let response = button.$http[button.method](button.action,
                            new FormData(
                                <HTMLFormElement>document.querySelector(`#${button.dataFrom}`)
                            )
                        );

                        response.then(e => {
                            this.$dispatch('ajax.button.success', ...[e, button]);
                        }, e => {
                            button.disabled = false;
                            this.$dispatch('ajax.button.fail', ...[e, button]);
                            console.log(e)
                        })

                    }
                },

                ready(){

                    for (let key in this.data) {
                        this.formData.append(key, this.data[key])
                    }

                }
            }
        );

        vue.component('ark-input', {
            template: require('../templates/form/input.html'),
            props: {
                name: String,
                required: Boolean,
                optional: Boolean,
                caption: String,
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
                },
                readOnly: {
                    type: Boolean,
                    default: false
                },
                value: {
                    type: String,
                },
                label: {
                    type: String
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

        vue.component('ark-textarea', {
            template: require('../templates/form/textarea.html'),
            props: {
                name: {
                    type: String
                },
                rows: {
                    type: Number,
                    default: 3
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
                },
                readOnly: {
                    type: Boolean,
                    default: false
                },
                value: {
                    type: String,
                },
                label: {
                    type: String
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
            },
            events: {
                'ajax.button.fail': function (e, button) {
                    if (e.status == 422)
                        this.errors = e.json()
                }
            }
        });

    }

}

