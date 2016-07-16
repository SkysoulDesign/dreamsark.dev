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
                state: {
                    type: String
                },
                class: {
                    type: String
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
                    var _this = this;
                    e.preventDefault();
                    if (this.setDisabled == 'yes')
                        this.disabled = true;
                    var button = this;
                    var response = button.$http[button.method](button.action, new FormData(document.querySelector("#" + button.dataFrom)));
                    response.then(function (e) {
                        _this.$dispatch.apply(_this, ['ajax.button.success'].concat([e, button]));
                    }, function (e) {
                        button.disabled = false;
                        _this.$dispatch.apply(_this, ['ajax.button.fail'].concat([e, button]));
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
                name: String,
                required: Boolean,
                optional: Boolean,
                caption: String,
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
                label: {
                    type: String
                }
            },
            methods: {
                getParentForm: function (parent) {
                    if (parent && parent.constructor.name === 'ArkForm') {
                        return parent;
                    }
                    if (parent)
                        return this.getParentForm(parent.$parent);
                    return this.getParentForm(this.$parent);
                }
            },
            computed: {
                value: function () {
                    return this.getParentForm().old(this.name);
                },
                errors: function () {
                    var form = this.getParentForm();
                    if (sessionStorage.getItem('form-action') === form.action) {
                        if (form.errors instanceof Array && form.errors.length) {
                            form.errors.shift().forEach(function (e) {
                                form.globalErrors.push(e);
                            });
                        }
                        return Helpers_1.popByKey(form.errors, this.name);
                    }
                },
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
                label: {
                    type: String
                }
            },
            methods: {
                getParentForm: function (parent) {
                    if (parent && parent.constructor.name === 'ArkForm') {
                        return parent;
                    }
                    if (parent)
                        return this.getParentForm(parent.$parent);
                    return this.getParentForm(this.$parent);
                }
            },
            computed: {
                value: function () {
                    return this.getParentForm().old(this.name);
                },
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
            data: function () {
                return {
                    globalErrors: [],
                    oldInput: JSON.parse(document.querySelector('meta[name="form-data"]').content)
                };
            },
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
                }
            },
            methods: {
                old: function (name, defaults) {
                    var _this = this;
                    if (defaults === void 0) { defaults = null; }
                    var result;
                    name.match(/([\w\s]+)/g).forEach(function (name) {
                        if (result instanceof Object) {
                            return result = result[name];
                        }
                        result = _this.oldInput[name];
                    });
                    return result;
                }
            },
            computed: {
                errors: function () {
                    return JSON.parse(document.querySelector('meta[name="form-errors"]').content);
                }
            },
            events: {
                'ajax.button.fail': function (e, button) {
                    if (e.status == 422)
                        this.errors = e.json();
                }
            },
            ready: function () {
                var _this = this;
                this.$el.addEventListener('submit', function (e) {
                    /**
                     * Store Which form reference to display errors correctly later
                     */
                    sessionStorage.setItem('form-action', _this.action);
                    /**
                     * Only for post Method
                     */
                    if (_this.method !== 'post') {
                        return;
                    }
                    e.preventDefault();
                    var token = document.querySelector('meta[name="csrf-token"]'), input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', '_token');
                    input.setAttribute('value', token.content);
                    _this.$el.appendChild(input);
                    _this.$el.submit();
                });
            }
        });
    };
    return Form;
}());
exports.Form = Form;
//# sourceMappingURL=Form.js.map