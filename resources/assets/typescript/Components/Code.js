"use strict";
/**
 * Code Component
 */
var Code = (function () {
    function Code() {
    }
    Code.prototype.register = function (vue, app) {
        vue.component('ark-code', {
            template: require('html!../templates/code/code.html'),
            ready: function () {
                var content = this.$el.children.item(0);
                content.style.display = 'none';
                var textArea = this.$el.children.item(1);
                textArea.textContent = content.innerHTML.trim();
            }
        });
    };
    return Code;
}());
exports.Code = Code;
//# sourceMappingURL=Code.js.map