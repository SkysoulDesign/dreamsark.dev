import {ComponentInterface} from "../Interfaces/ComponentInterface";
import {popByKey} from "../Helpers";

/**
 * Form Component
 */
export class Form implements ComponentInterface {


    register(vue, app) {

        let getParentForm = (object, parent = null) => {

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
                return getParentForm(object, parent.$parent)

            return getParentForm(object, object.$parent);

        }

        app.vue({
            plugins: [
                require('vue-resource')
            ],
            data: {
                model: {}
            },
            ready(){

                let active = null;

                this.$on('dropdown-open', dropdown => {

                    active = dropdown;

                    this.$children.forEach(function (child) {
                        if (child.constructor.name === 'ArkDropdown' && child !== dropdown)
                            child.$set('active', false)
                    })

                })

                window.onclick = event => {

                    if (!event.target.classList.contains('dropdown__trigger') && active)
                        active.$set('active', false)

                }

            }
        })

        vue.component('ark-fields', {
                template: require('html!../templates/form/fields.html'),
                props: {
                    gap: {
                        type: String,
                        default: 'normal' // normal, small, medium, large, huge
                    }
                }
            }
        );

        vue.component('ark-select', {
                template: require('html!../templates/form/select.html'),
                props: {
                    name: String,
                    label: String
                }
            }
        );

        vue.component('ark-select-option', {
                template: require('html!../templates/form/select-option.html'),
                props: {
                    value: String,
                    selected: Boolean
                }
            }
        );


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
                    id: String,
                    class: String,
                    href: String,
                },
                methods: {
                    click(event: MouseEvent){

                        if (this.href) {
                            event.preventDefault();
                            window.location = this.href;
                        }

                    }
                }
            }
        );

        vue.component('ark-ajax-button', {
                template: require('html!../templates/form/ajax-button.html'),
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
                    send(e: MouseEvent){
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
                label: {
                    type: String
                }
            },
            computed: {
                value: function () {

                    let old = getParentForm(this).old(this.name);

                    if (!old && this._slotContents && this._slotContents.default) {
                        return this._slotContents.default.textContent
                    }

                    return old;
                },
                errors: function () {

                    let form = getParentForm(this);

                    if (sessionStorage.getItem('form-action') === form.action) {

                        if (form.errors instanceof Array && form.errors.length) {
                            form.errors.shift().forEach(function (e) {
                                form.globalErrors.push(e)
                            })
                        }

                        return popByKey(form.errors, this.name);

                    }

                },
            },
            ready(){

                if (this.type === 'datetime-local') {
                    this.type = 'text';
                    app.plugin('datetime', this.$els.input);
                }

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

                    if (this.href) window.location = this.href;

                    this.$parent.$set('title', this.content);
                    this.$parent.$set('active', false);
                },

            },
            ready(){

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
                    }
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
                ready(){

                    /**
                     * If no tittle, then select the first element
                     */
                    if (!this.title)
                        this.$set('title', this.$children[0].content);

                }
            }
        );

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
                }
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
            ready(){
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
            ready(){
                this.class = this.$parent.classes.shift();

                if (this.checked) {
                    this.$parent.active = this.$el
                }

            }
        });

        vue.component('ark-form-step', {
            template: require('html!../templates/form/modal-form/form-step.html'),
            data: function () {
                return {
                    step: getParentForm(this).steps++
                }
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

                    let form = getParentForm(this);

                    if (!form) return;

                    return popByKey(form.errors, this.name);

                }
            },
            ready(){

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
                    oldInput: JSON.parse(
                        (<HTMLMetaElement>document.querySelector('meta[name="form-data"]')).content
                    )
                }
            },
            props: {
                id: String,
                token: String,
                bind: {
                    type: Object,
                    default: function () {
                        return {}
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
                old(name, defaults = null){

                    var result;

                    if (!name) {
                        return false
                    }

                    name.match(/([\w\s]+)/g).forEach((name) => {

                        if (result instanceof Object) {
                            return result = result[name];
                        }

                        result = this.oldInput[name];

                    })

                    if (!result && this.bind.hasOwnProperty(name)) {
                        return this.bind[name];
                    }

                    return result;

                },
                slotExists (slotName) {
                    if (!this['_slotContents'])
                        return false
                    return this._slotContents[slotName];
                }
            },
            computed: {
                errors: function () {
                    return JSON.parse(
                        (<HTMLMetaElement>document.querySelector('meta[name="form-errors"]')).content
                    )
                }
            },
            events: {
                'ajax.button.fail': function (e, button) {
                    if (e.status == 422)
                        this.errors = e.json()
                }
            },
            ready(){
                this.$el.addEventListener('submit', (e: Event) => {

                    /**
                     * Store Which form reference to display errors correctly later
                     */
                    sessionStorage.setItem('form-action', this.action);

                    /**
                     * Not for get
                     */
                    if (this.method === 'get')
                        return;

                    e.preventDefault();

                    let token = <HTMLMetaElement>document.querySelector('meta[name="csrf-token"]'),
                        input = <HTMLInputElement>document.createElement('input');

                    input.setAttribute('type', 'hidden')
                    input.setAttribute('name', '_token')
                    input.setAttribute('value', token.content)

                    /**
                     * if its other than post
                     */
                    if (['patch', 'put', 'delete'].includes(this.method)) {

                        let method = input.cloneNode();
                        method.setAttribute('type', 'hidden')
                        method.setAttribute('name', '_method');
                        method.setAttribute('value', this.method);

                        this.$el.appendChild(
                            method
                        );

                    }

                    this.$el.appendChild(
                        input
                    )

                    this.$el.submit();

                })
            }
        });

    }

}

