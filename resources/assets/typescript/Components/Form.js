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
            ],
            ready: function () {
                var _this = this;
                var active = null;
                this.$on('dropdown-open', function (dropdown) {
                    active = dropdown;
                    _this.$children.forEach(function (child) {
                        if (child.constructor.name === 'ArkDropdown' && child !== dropdown)
                            child.$set('active', false);
                    });
                });
                window.onclick = function (event) {
                    if (!event.target.classList.contains('dropdown__trigger') && active)
                        active.$set('active', false);
                };
            }
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
                color: {
                    type: String,
                    default: 'gray'
                },
                icon: String,
                class: String
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
        vue.component('ark-dropdown-option', {
            template: require('../templates/form/dropdown-option.html'),
            props: {
                icon: String,
                href: String,
                selected: Boolean
            },
            computed: {
                content: function () {
                    return this.$el.innerText.trim();
                }
            },
            methods: {
                select: function () {
                    this.$dispatch('dropdown-option-selected', this.$el.innerText);
                    if (this.href)
                        window.location = this.href;
                    this.$parent.$set('title', this.content);
                    this.$parent.$set('active', false);
                },
            },
            ready: function () {
                /**
                 * if this is selected then set parent title as this content
                 */
                if (this.selected)
                    this.$parent.$set('title', this.content);
            }
        });
        vue.component('ark-dropdown', {
            template: require('../templates/form/dropdown.html'),
            data: function () {
                return {
                    active: false
                };
            },
            props: {
                avatar: String,
                icon: String,
                mode: {
                    type: String,
                    default: 'button' //Simple, Button, Icon
                },
                pop: {
                    type: String,
                    default: 'down' // up, down
                },
                title: String
            },
            methods: {
                open: function () {
                    this.$set('active', !this.active);
                    this.$dispatch('dropdown-open', this);
                }
            },
            ready: function () {
                /**
                 * If no tittle, then select the first element
                 */
                if (!this.title)
                    this.$set('title', this.$children[0].content);
            }
        });
        vue.component('ark-form-header', {
            template: require('../templates/form/modal-form/form-header.html'),
            props: {
                color: {
                    type: String,
                    default: 'success'
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
                bind: Object,
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
                    if (!result && this.bind.hasOwnProperty(name)) {
                        return this.bind[name];
                    }
                    return result;
                },
                slotExists: function (slotName) {
                    if (!this['_slotContents'])
                        return false;
                    return this._slotContents[slotName];
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
                     * Not for get
                     */
                    if (_this.method === 'get')
                        return;
                    e.preventDefault();
                    var token = document.querySelector('meta[name="csrf-token"]'), input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', '_token');
                    input.setAttribute('value', token.content);
                    /**
                     * if its other than post
                     */
                    if (['patch', 'put', 'delete'].includes(_this.method)) {
                        var method = input.cloneNode();
                        method.setAttribute('type', 'hidden');
                        method.setAttribute('name', '_method');
                        method.setAttribute('value', _this.method);
                        _this.$el.appendChild(method);
                    }
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