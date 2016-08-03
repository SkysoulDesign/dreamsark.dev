"use strict";
/**
 * Nav Component
 */
var Ripple = (function () {
    function Ripple() {
    }
    Ripple.prototype.register = function (Vue) {
        Vue.component('ripple-button', {
            template: require('html!../templates/ripple-button.html'),
            props: ['type'],
            methods: {
                submit: function (e) {
                    /**
                     * If its not a submit type then prevent defaults
                     */
                    if (this.type != 'submit')
                        e.preventDefault();
                }
            }
        });
    };
    return Ripple;
}());
exports.Ripple = Ripple;
//
// export class Ripple {
//
//     construct(event, timing) {
// let ripple = this.getElementsByTagName('use')[0],
//     tl = new TimelineMax(),
//
//     x = event.offsetX,
//     y = event.offsetY,
//     w = event.target.offsetWidth,
//     h = event.target.offsetHeight,
//
//     offsetX = Math.abs((w / 2) - x),
//     offsetY = Math.abs((h / 2) - y),
//
//     deltaX = (w / 2) + offsetX,
//     deltaY = (h / 2) + offsetY,
//
//     scale_ratio = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
//
// tl.fromTo(ripple, timing, {
//     x: x,
//     y: y,
//     transformOrigin: '50% 50%',
//     scale: 0,
//     opacity: 1,
//     ease: Linear.easeIn
// }, {
//     scale: scale_ratio,
//     opacity: 0
// });
//
// return tl;
// }
//
//
// // return {
// //     init: function (target, timing) {
// //
// //         var rippables = document.querySelectorAll(target);
// //
// //         for (var i = 0; i < rippables.length; i++) {
// //
// //             rippables[i].addEventListener('click', function (event) {
// //                 rippleAnimation.call(this, event, timing);
// //             });
// //
// //         }
// //
// //     }
// //
// // }
// }
// {{--<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/TweenMax.min.js"></script>--}}
// {{--<script src="http://tympanus.net/Tutorials/SVGRipples/js/ripple-config.js"></script>--}}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmlwcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmlwcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTs7R0FFRztBQUNIO0lBQUE7SUFzQkEsQ0FBQztJQXBCRyx5QkFBUSxHQUFSLFVBQVMsR0FBRztRQUVSLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFO1lBQzNCLFFBQVEsRUFBRSxPQUFPLENBQUMsc0NBQXNDLENBQUM7WUFDekQsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2YsT0FBTyxFQUFFO2dCQUNMLE1BQU0sWUFBQyxDQUFZO29CQUVmOzt1QkFFRztvQkFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQzt3QkFDdEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUUzQixDQUFDO2FBQ0o7U0FDSixDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUwsYUFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUF0QlksY0FBTSxTQXNCbEIsQ0FBQTtBQUVELEVBQUU7QUFDRix3QkFBd0I7QUFDeEIsRUFBRTtBQUNGLGlDQUFpQztBQUdqQyxvREFBb0Q7QUFDcEQsOEJBQThCO0FBQzlCLEVBQUU7QUFDRix5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLG9DQUFvQztBQUNwQyxxQ0FBcUM7QUFDckMsRUFBRTtBQUNGLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsRUFBRTtBQUNGLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsRUFBRTtBQUNGLDBFQUEwRTtBQUMxRSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLFlBQVk7QUFDWixZQUFZO0FBQ1osa0NBQWtDO0FBQ2xDLGdCQUFnQjtBQUNoQixrQkFBa0I7QUFDbEIsMEJBQTBCO0FBQzFCLE9BQU87QUFDUCwwQkFBMEI7QUFDMUIsaUJBQWlCO0FBQ2pCLE1BQU07QUFDTixFQUFFO0FBQ0YsYUFBYTtBQUViLElBQUk7QUFHSixFQUFFO0FBQ0YsRUFBRTtBQUNGLGNBQWM7QUFDZCwyQ0FBMkM7QUFDM0MsS0FBSztBQUNMLGdFQUFnRTtBQUNoRSxLQUFLO0FBQ0wsMERBQTBEO0FBQzFELEtBQUs7QUFDTCwyRUFBMkU7QUFDM0UsZ0VBQWdFO0FBQ2hFLHFCQUFxQjtBQUNyQixLQUFLO0FBQ0wsZUFBZTtBQUNmLEtBQUs7QUFDTCxXQUFXO0FBQ1gsS0FBSztBQUNMLE9BQU87QUFDUCxJQUFJO0FBRUoscUdBQXFHO0FBQ3JHLCtGQUErRiJ9