"use strict";
var Helpers_1 = require("../Helpers");
/**
 * Form Component
 */
var Form = (function () {
    function Form() {
    }
    Form.prototype.register = function (vue, app) {
        var getParentForm = function (object, parent) {
            if (parent === void 0) { parent = null; }
            /**
             * If object parent is already vue instance then there will be no ArkForm
             */
            if (object.$parent.constructor.name === 'Vue') {
                return false;
            }
            if (parent && parent.constructor.name === 'ArkForm') {
                return parent;
            }
            if (parent)
                return getParentForm(object, parent.$parent);
            return getParentForm(object, object.$parent);
        };
        app.vue({
            plugins: [
                require('vue-resource')
            ],
            data: {
                model: {}
            },
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
            template: require('html!../templates/form/fields.html'),
            props: {
                gap: {
                    type: String,
                    default: 'normal' // normal, small, medium, large, huge
                }
            }
        });
        vue.component('ark-button', {
            template: require('html!../templates/form/button.html'),
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
                class: String,
                href: String,
            },
            methods: {
                click: function (event) {
                    if (this.href) {
                        event.preventDefault();
                        window.location = this.href;
                    }
                }
            }
        });
        vue.component('ark-ajax-button', {
            template: require('html!../templates/form/ajax-button.html'),
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
            template: require('html!../templates/form/input.html'),
            props: {
                name: String,
                required: Boolean,
                optional: Boolean,
                caption: String,
                model: Boolean,
                min: Number,
                max: Number,
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
            computed: {
                value: function () {
                    return getParentForm(this).old(this.name);
                },
                errors: function () {
                    var form = getParentForm(this);
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
            template: require('html!../templates/form/dropdown-option.html'),
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
            template: require('html!../templates/form/dropdown.html'),
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
            template: require('html!../templates/form/modal-form/form-header.html'),
            props: {
                class: String,
                color: {
                    type: String,
                    default: 'success'
                }
            }
        });
        vue.component('ark-switcher', {
            template: require('html!../templates/form/switcher.html'),
            data: function () {
                return {
                    classes: ['--a', '--b'],
                    active: null
                };
            },
            props: {
                color: {
                    type: String,
                    default: 'success'
                },
                name: {
                    type: String,
                    required: true
                }
            },
            ready: function () {
                if (!this.active)
                    this.active = this.$children[0].$el;
            }
        });
        vue.component('ark-switcher-option', {
            template: require('html!../templates/form/switcher-option.html'),
            props: {
                value: String,
                checked: Boolean,
                name: String,
                class: String,
            },
            ready: function () {
                this.class = this.$parent.classes.shift();
                if (this.checked) {
                    this.$parent.active = this.$el;
                }
            }
        });
        vue.component('ark-form-step', {
            template: require('html!../templates/form/modal-form/form-step.html'),
            data: function () {
                return {
                    step: getParentForm(this).steps++
                };
            },
            props: {
                color: {
                    type: String,
                    default: 'success'
                }
            }
        });
        vue.component('ark-textarea', {
            template: require('html!../templates/form/textarea.html'),
            props: {
                name: String,
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
                label: String,
                class: String,
                richText: Boolean,
                richOptions: Object,
                value: String
            },
            computed: {
                content: function () {
                    /**
                     * hacky
                     */
                    if (this._slotContents && this._slotContents.default) {
                        return this._slotContents.default.textContent;
                    }
                    return getParentForm(this).old(this.name);
                },
                errors: function () {
                    var form = getParentForm(this);
                    if (!form)
                        return;
                    return Helpers_1.popByKey(form.errors, this.name);
                }
            },
            ready: function () {
                if (this.richText) {
                    app.plugin('medium', this.$els.textarea, this.richOptions);
                }
            }
        });
        vue.component('ark-form', {
            template: require('html!../templates/form/form.html'),
            data: function () {
                return {
                    steps: 1,
                    globalErrors: [],
                    oldInput: JSON.parse(document.querySelector('meta[name="form-data"]').content)
                };
            },
            props: {
                id: String,
                token: String,
                bind: {
                    type: Object,
                    default: function () {
                        return {};
                    }
                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHdCQUF1QixZQUFZLENBQUMsQ0FBQTtBQUVwQzs7R0FFRztBQUNIO0lBQUE7SUFpakJBLENBQUM7SUE5aUJHLHVCQUFRLEdBQVIsVUFBUyxHQUFHLEVBQUUsR0FBRztRQUViLElBQUksYUFBYSxHQUFHLFVBQUMsTUFBTSxFQUFFLE1BQWE7WUFBYixzQkFBYSxHQUFiLGFBQWE7WUFFdEM7O2VBRUc7WUFDSCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDUCxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7WUFFaEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpELENBQUMsQ0FBQTtRQUVELEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDSixPQUFPLEVBQUU7Z0JBQ0wsT0FBTyxDQUFDLGNBQWMsQ0FBQzthQUMxQjtZQUNELElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsRUFBRTthQUNaO1lBQ0QsS0FBSztnQkFBTCxpQkFzQkM7Z0JBcEJHLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBQSxRQUFRO29CQUU5QixNQUFNLEdBQUcs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