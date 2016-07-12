"use strict";
/**
 * Steps Component
 */
var Steps = (function () {
    function Steps() {
    }
    Steps.prototype.register = function (vue, app) {
        vue.component('ark-steps', {
            template: require('../templates/steps/steps.html'),
            props: {},
            ready: function () {
                this.$children.forEach(function (child) {
                    if (!child.active)
                        child.setDone();
                });
            }
        });
        vue.component('ark-step', {
            template: require('../templates/steps/step.html'),
            data: function () {
                return {
                    done: false
                };
            },
            props: {
                description: {
                    type: String
                },
                active: {
                    type: Boolean
                }
            },
            methods: {
                setDone: function () {
                    this.done = true;
                    this.$el.classList.add('--done');
                }
            }
        });
    };
    return Steps;
}());
exports.Steps = Steps;
//# sourceMappingURL=Steps.js.map