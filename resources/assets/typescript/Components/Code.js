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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBOztHQUVHO0FBQ0g7SUFBQTtJQWdCQSxDQUFDO0lBZEcsdUJBQVEsR0FBUixVQUFTLEdBQUcsRUFBRSxHQUFHO1FBRWIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDdEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQztZQUNyRCxLQUFLO2dCQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUNuQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4RCxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLFlBQUksT0FnQmhCLENBQUEifQ==