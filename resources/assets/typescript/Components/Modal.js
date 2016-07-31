"use strict";
/**
 * Form Component
 */
var Modal = (function () {
    function Modal() {
    }
    Modal.prototype.register = function (vue, app) {
        vue.component('ark-modal', {
            template: require('html!../templates/modal/modal.html'),
            props: {
                trigger: {
                    type: String,
                    required: true,
                },
                header: {
                    type: String,
                    required: true,
                }
            },
            methods: {
                show: function () {
                    this.$el.classList.add('--open');
                },
                close: function () {
                    this.$el.classList.remove('--open');
                }
            },
            ready: function () {
                var _this = this;
                var trigger = document.querySelector("[data-modal-trigger=\"" + this.trigger + "\"]");
                trigger.addEventListener('click', function (event) { return _this.show(); });
            }
        });
    };
    return Modal;
}());
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map