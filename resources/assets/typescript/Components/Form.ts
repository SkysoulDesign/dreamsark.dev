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
            ],
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
                    color: {
                        type: String,
                        default: 'gray'
                    },
                    icon: String,
                    class: String
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
                label: {
                    type: String
                }
            },
            methods: {
                getParentForm(parent){

                    if (parent && parent.constructor.name === 'ArkForm') {
                        return parent;
                    }

                    if (parent)
                        return this.getParentForm(parent.$parent)

                    return this.getParentForm(this.$parent);

                }
            },
            computed: {
                value: function () {
                    return this.getParentForm().old(this.name);
                },
                errors: function () {

                    let form = this.getParentForm();

                    if (sessionStorage.getItem('form-action') === form.action) {

                        if (form.errors instanceof Array && form.errors.length) {
                            form.errors.shift().forEach(function (e) {
                                form.globalErrors.push(e)
                            })
                        }

                        return popByKey(form.errors, this.name);

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
                template: require('../templates/form/dropdown.html'),
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
            methods: {
                getParentForm(parent){

                    if (parent && parent.constructor.name === 'ArkForm') {
                        return parent;
                    }

                    if (parent)
                        return this.getParentForm(parent.$parent)

                    return this.getParentForm(this.$parent);

                }
            },
            computed: {
                value: function () {
                    return this.getParentForm().old(this.name);
                },
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
            data: function () {
                return {
                    globalErrors: [],
                    oldInput: JSON.parse(
                        (<HTMLMetaElement>document.querySelector('meta[name="form-data"]')).content
                    )
                }
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
                old(name, defaults = null){

                    var result;

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

