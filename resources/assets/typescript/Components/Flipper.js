"use strict";
/**
 * Flipper Component
 */
var Flipper = (function () {
    function Flipper() {
    }
    Flipper.prototype.register = function (vue) {
        var getTrigger = function (el) {
            return el.querySelector('[data-flipper-trigger]');
        };
        vue.component('ark-flipper', {
            template: require('html!../templates/flipper/flipper.html'),
            props: {
                class: String,
            },
            methods: {
                flip: function () {
                    this.$children.forEach(function (child) {
                        child.$el.classList.toggle('+hidden');
                    });
                    this.$el.classList.toggle('--flipped');
                },
            }
        });
        vue.component('ark-flipper-content', {
            template: require('html!../templates/flipper/side.html'),
            props: {
                class: String,
                side: {
                    type: String,
                    required: true
                },
            },
            ready: function () {
                var _this = this;
                getTrigger(this.$el).addEventListener('click', function (event) {
                    event.preventDefault();
                    _this.$parent.flip();
                });
                this.$dispatch.apply(this, ['flipper.block.enabled'].concat([this]));
            }
        });
    };
    return Flipper;
}());
exports.Flipper = Flipper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxpcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZsaXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBOztHQUVHO0FBQ0g7SUFBQTtJQWlEQSxDQUFDO0lBL0NHLDBCQUFRLEdBQVIsVUFBUyxHQUFHO1FBRVIsSUFBSSxVQUFVLEdBQUcsVUFBVSxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFBO1FBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUU7WUFDekIsUUFBUSxFQUFFLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQztZQUMzRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLE1BQU07YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSTtvQkFDQSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUs7d0JBQ2xDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFDekMsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUMxQyxDQUFDO2FBQ0o7U0FFSixDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFO1lBRWpDLFFBQVEsRUFBRSxPQUFPLENBQUMscUNBQXFDLENBQUM7WUFDeEQsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsTUFBTTtvQkFDWixRQUFRLEVBQUUsSUFBSTtpQkFDakI7YUFDSjtZQUNELEtBQUs7Z0JBQUwsaUJBU0M7Z0JBUEcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQSxLQUFLO29CQUNoRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxTQUFTLE9BQWQsSUFBSSxHQUFXLHVCQUF1QixTQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQTtZQUV0RCxDQUFDO1NBRUosQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVMLGNBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBakRZLGVBQU8sVUFpRG5CLENBQUEifQ==