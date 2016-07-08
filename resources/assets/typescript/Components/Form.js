"use strict";
var Helpers_1 = require("../Helpers");
/**
 * Form Component
 */
var Form = (function () {
    function Form() {
    }
    Form.prototype.register = function (vue) {
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
                }
            },
            computed: {
                errors: function () {
                    return Helpers_1.popByKey(this.$parent.errors, this.name);
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
                    coerce: function (data) { return JSON.parse(data); }
                }
            }
        });
    };
    return Form;
}());
exports.Form = Form;
//# sourceMappingURL=Form.js.map