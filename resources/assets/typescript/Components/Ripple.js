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
//# sourceMappingURL=Ripple.js.map