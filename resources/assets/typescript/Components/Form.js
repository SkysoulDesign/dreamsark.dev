"use strict";
var Helpers_1 = require("../Helpers");
/**
 * Form Component
 */
var Form = (function () {
    function Form() {
    }
    Form.prototype.register = function (vue, app) {
        app.vue({
            plugins: [
                require('vue-resource')
            ]
        });
        vue.component('ark-fields', {
            template: require('../templates/form/fields.html'),
            props: {
                gap: {
                    type: String,
                    default: 'normal' // normal, small, medium, large, huge
                }
            }
        });
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
        });
        vue.component('ark-ajax-button', {
            template: require('../templates/form/ajax-button.html'),
            data: function () {
                return {
                    disabled: false,
                    formData: new FormData()
                };
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
                    coerce: function (data) { return JSON.parse(data); }
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
                send: function (e) {
                    e.preventDefault();
                    if (this.setDisabled == 'yes')
                        this.disabled = true;
                    var button = this;
                    var response = button.$http[button.method](button.action, new FormData(document.querySelector("#" + button.dataFrom)));
                    response.then(function (e) {
                        var responseData = e.json();
                        if (responseData.result == undefined || responseData.result != 0) {
                            if (responseData.message != undefined && responseData.message != '')
                                alert(responseData.message);
                            button.disabled = false;
                        }
                        else {
                            if (button.setTimer > 0) {
                                var countDown_1 = button.setTimer;
                                var buttonElement_1 = button.$el.firstElementChild, buttonText_1 = buttonElement_1.innerText;
                                var doTimer_1 = setInterval(function () {
                                    if (countDown_1 == -1) {
                                        buttonElement_1.innerText = buttonText_1;
                                        button.disabled = false;
                                        clearInterval(doTimer_1);
                                    }
                                    else {
                                        buttonElement_1.innerText = countDown_1 + ' ' + button.timerText;
                                    }
                                    countDown_1--;
                                }, 1000);
                            }
                        }
                    }, function (e) {
                        button.disabled = false;
                        console.log(e);
                    });
                }
            },
            ready: function () {
                for (var key in this.data) {
                    this.formData.append(key, this.data[key]);
                }
            }
        });
        vue.component('ark-input', {
            template: require('../templates/form/input.html'),
            props: {
                name: {
                    type: String
                },
                placeholder: {
                    type: String,
                    default: function () {
                        return this.name;
                    }
                },
                type: {
                    type: String,
                    default: 'text'
                },
                title: {
                    type: String,
                    default: function () {
                        return this.name;
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
                    var parent = this.$parent;
                    /**
                     * In Case its an instance of ArkFields
                     */
                    if (this.$parent.constructor.name !== 'ArkForm')
                        parent = parent.$parent;
                    return Helpers_1.popByKey(parent.errors, this.name);
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
                    coerce: function (data) { return JSON.parse(data); }
                }
            }
        });
    };
    return Form;
}());
exports.Form = Form;
//# sourceMappingURL=Form.js.map