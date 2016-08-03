"use strict";
/**
 * Profiles Component
 */
var Animation = (function () {
    function Animation() {
    }
    Animation.prototype.register = function (vue, app) {
        vue.component('ark-animation', {
            template: require('html!../templates/animation/animation.html'),
            props: {
                class: String,
                composition: {
                    type: String,
                    required: true,
                },
                payload: {
                    type: Array
                },
            },
            ready: function () {
                var animation = app.plugin('profile', this.$el);
                animation.start.apply(animation, [this.composition].concat(this.payload));
                this.$dispatch.apply(this, ['animation.started'].concat(this.payload));
            }
        });
    };
    return Animation;
}());
exports.Animation = Animation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTs7R0FFRztBQUNIO0lBQUE7SUE0QkEsQ0FBQztJQTFCRyw0QkFBUSxHQUFSLFVBQVMsR0FBRyxFQUFFLEdBQUc7UUFFYixHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRTtZQUMzQixRQUFRLEVBQUUsT0FBTyxDQUFDLDRDQUE0QyxDQUFDO1lBQy9ELEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsTUFBTTtnQkFDYixXQUFXLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLE1BQU07b0JBQ1osUUFBUSxFQUFFLElBQUk7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsS0FBSztpQkFDZDthQUNKO1lBQ0QsS0FBSztnQkFFRCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzNDLFNBQVMsQ0FBQyxLQUFLLE9BQWYsU0FBUyxHQUFPLElBQUksQ0FBQyxXQUFXLFNBQUssSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFBO2dCQUV0RCxJQUFJLENBQUMsU0FBUyxPQUFkLElBQUksR0FBVyxtQkFBbUIsU0FBSyxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUM7WUFFekQsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTCxnQkFBQztBQUFELENBQUMsQUE1QkQsSUE0QkM7QUE1QlksaUJBQVMsWUE0QnJCLENBQUEifQ==