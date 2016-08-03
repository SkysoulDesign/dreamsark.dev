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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7O0dBRUc7QUFDSDtJQUFBO0lBaUNBLENBQUM7SUEvQkcsd0JBQVEsR0FBUixVQUFTLEdBQUcsRUFBRSxHQUFHO1FBRWIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDdkIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQztZQUN2RCxLQUFLLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxNQUFNO29CQUNaLFFBQVEsRUFBRSxJQUFJO2lCQUNqQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osSUFBSSxFQUFFLE1BQU07b0JBQ1osUUFBUSxFQUFFLElBQUk7aUJBQ2pCO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSTtvQkFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0QsS0FBSztvQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7YUFDSjtZQUVELEtBQUs7Z0JBQUwsaUJBR0M7Z0JBRkcsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBd0IsSUFBSSxDQUFDLE9BQU8sUUFBSSxDQUFDLENBQUM7Z0JBQzNFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUM7WUFDaEUsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTCxZQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSxhQUFLLFFBaUNqQixDQUFBIn0=