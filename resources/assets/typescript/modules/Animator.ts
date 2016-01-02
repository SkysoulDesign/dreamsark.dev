module DreamsArk.Modules {

    import map = DreamsArk.Helpers.map;
    import is = DreamsArk.Helpers.is;
    import math = DreamsArk.Helpers.math;
    import timeout = DreamsArk.Helpers.timeout;
    import clone = DreamsArk.Helpers.clone;

    export class Animator implements Initializable {

        private init(name:string, parameters:Tweenable, context?:any) {

            var tween = new Tween(name, parameters, context);

            if (parameters.autoStart === false)
                return tween;

            tween.init();

        };

        public backIn(parameters:Tweenable, context?:any) {
            return this.init('backIn', parameters, context);
        };

        public backOut(parameters:Tweenable, context?:any) {
            return this.init('backOut', parameters, context);
        };

        public backInOut(parameters:Tweenable, context?:any) {
            return this.init('backInOut', parameters, context);
        };

        public bounceOut(parameters:Tweenable, context?:any) {
            return this.init('bounceOut', parameters, context);
        };

        public bounceIn(parameters:Tweenable, context?:any) {
            return this.init('bounceIn', parameters, context);
        };

        public bounceInOut(parameters:Tweenable, context?:any) {
            return this.init('bounceInOut', parameters, context);
        };

        public circIn(parameters:Tweenable, context?:any) {
            return this.init('circIn', parameters, context);
        };

        public circOut(parameters:Tweenable, context?:any) {
            return this.init('circOut', parameters, context);
        };

        public circInOut(parameters:Tweenable, context?:any) {
            return this.init('circInOut', parameters, context);
        };

        public cubicIn(parameters:Tweenable, context?:any) {
            return this.init('cubicIn', parameters, context);
        };

        public cubicOut(parameters:Tweenable, context?:any) {
            return this.init('cubicOut', parameters, context);
        };

        public cubicInOut(parameters:Tweenable, context?:any) {
            return this.init('cubicInOut', parameters, context);
        };

        public elasticIn(parameters:Tweenable, context?:any) {
            return this.init('elasticIn', parameters, context);
        };

        public elasticOut(parameters:Tweenable, context?:any) {
            return this.init('elasticOut', parameters, context);
        };

        public elasticInOut(parameters:Tweenable, context?:any) {
            return this.init('elasticInOut', parameters, context);
        };

        public expoIn(parameters:Tweenable, context?:any) {
            return this.init('expoIn', parameters, context);
        };

        public expoOut(parameters:Tweenable, context?:any) {
            return this.init('expoOut', parameters, context);
        };

        public expoInOut(parameters:Tweenable, context?:any) {
            return this.init('expoInOut', parameters, context);
        };

        public linearIn(parameters:Tweenable, context?:any) {
            return this.init('linearIn', parameters, context);
        };

        public linearOut(parameters:Tweenable, context?:any) {
            return this.init('linearOut', parameters, context);
        };

        public linearInOut(parameters:Tweenable, context?:any) {
            return this.init('linearInOut', parameters, context);
        };

        public quadIn(parameters:Tweenable, context?:any) {
            return this.init('quadIn', parameters, context);
        };

        public quadOut(parameters:Tweenable, context?:any) {
            return this.init('quadOut', parameters, context);
        };

        public quadInOut(parameters:Tweenable, context?:any) {
            return this.init('quadInOut', parameters, context);
        };

        public quartIn(parameters:Tweenable, context?:any) {
            return this.init('quartIn', parameters, context);
        };

        public quartOut(parameters:Tweenable, context?:any) {
            return this.init('quartOut', parameters, context);
        };

        public quartInOut(parameters:Tweenable, context?:any) {
            return this.init('quartInOut', parameters, context);
        };

        public quintIn(parameters:Tweenable, context?:any) {
            return this.init('quintIn', parameters, context);
        };

        public quintOut(parameters:Tweenable, context?:any) {
            return this.init('quintOut', parameters, context);
        };

        public quintInOut(parameters:Tweenable, context?:any) {
            return this.init('quintInOut', parameters, context);
        };

        public sineIn(parameters:Tweenable, context?:any) {
            return this.init('sineIn', parameters, context);
        };

        public sineOut(parameters:Tweenable, context?:any) {
            return this.init('sineOut', parameters, context);
        };

        public sineInOut(parameters:Tweenable, context?:any) {
            return this.init('sineInOut', parameters, context);
        };

    }

    export class Tween implements Initializable, Tweenable {

        public duration:number;
        public destination:any;
        public origin:any;
        public update:(el:any)=>void;
        public complete:()=>void;
        public start:()=>void;
        public delay;
        public overshoot:number

        constructor(public equation:string, parameters:Tweenable, public context = DreamsArk) {

            this.duration = parameters.duration * 1000;
            this.destination = parameters.destination;
            this.origin = parameters.origin;
            this.update = parameters.update;
            this.complete = parameters.complete;
            this.start = parameters.start;
            this.delay = parameters.delay;
            this.overshoot = parameters.overshoot;

        }

        init():void {

            /**
             * if Delay is set, delay this function execution
             */
            if (this.delay !== false) {

                timeout(this.delay, function () {

                    /**
                     * Set delay to false so it wont fall here again
                     * @type {boolean}
                     */
                    this.delay = false;

                    this.init();

                }, this);

                return;

            }

            var checker = <Checker>module('Checker'),
                instance = {},
                equation = this[this.equation],
                overshoot = this.overshoot,
                duration = this.duration,

                onPlayed = false,
                on = function (currentProgress:number):Function {

                    if (onPlayed) return function () {
                    };

                    return function (progress:number, callback:any):void {

                        if (currentProgress >= progress / 1000) {

                            if (callback instanceof Tween)
                                callback.init();
                            else
                                callback();

                            onPlayed = true;

                        }

                    };

                },

                origin = !is.Null(this.origin) ? clone(is.Function(this.origin) ? this.origin() : this.origin) : null,
                destination = is.Null(this.origin) ? clone(is.Function(this.destination) ? this.destination() : this.destination) : {};

            /**
             * if Origin is set, subtract it from origin to re-add in the end
             */
            if (!is.Null(origin))
                destination = math.sub(this.destination, origin);

            if (is.Function(this.start))
                this.start();

            checker.add(function (elapsed_time) {

                if (elapsed_time <= duration) {

                    var progress = elapsed_time / duration;

                    instance = map(destination, function (value) {
                        return equation(progress, 0, value, 1, overshoot);
                    });

                    if (!is.Null(origin))
                        instance = math.add(instance, origin);

                    /**
                     * Call the CallBack

                     */
                    this.update.call(this.context, instance, progress, on(progress));

                    return false;

                }

                /**
                 * Call on the last frame to make sure the end result is 100% and not a fraction
                 * on 1 = 100%
                 */
                this.update.call(this.context, this.destination, progress, on(1));

                if (is.Function(this.complete))
                    this.complete();

                /**
                 * Destroy Checker
                 */
                return true;

            }, this)

        }

        public backIn(time:number, begin:number, change:number, duration:number, overshoot:number):number {
            if (overshoot == null) {
                overshoot = 1.70158;
            }
            return change * (time /= duration) * time * ((overshoot + 1) * time - overshoot) + begin;
        };

        public backOut(time:number, begin:number, change:number, duration:number, overshoot:number):number {
            if (overshoot == null) {
                overshoot = 1.70158;
            }
            return change * ((time = time / duration - 1) * time * ((overshoot + 1) * time + overshoot) + 1) + begin;
        };

        public backInOut(time:number, begin:number, change:number, duration:number, overshoot:number):number {
            if (overshoot == null) {
                overshoot = 1.70158;
            }
            if ((time = time / (duration / 2)) < 1) {
                return change / 2 * (time * time * (((overshoot *= 1.525) + 1) * time - overshoot)) + begin;
            } else {
                return change / 2 * ((time -= 2) * time * (((overshoot *= 1.525) + 1) * time + overshoot) + 2) + begin;
            }
        };

        public bounceOut(time:number, begin:number, change:number, duration:number):number {
            if ((time /= duration) < 1 / 2.75) {
                return change * (7.5625 * time * time) + begin;
            } else if (time < 2 / 2.75) {
                return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
            } else if (time < 2.5 / 2.75) {
                return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
            } else {
                return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
            }
        };

        public bounceIn(time:number, begin:number, change:number, duration:number):number {
            return change - this.bounceOut(duration - time, 0, change, duration) + begin;
        };

        public bounceInOut = function (time:number, begin:number, change:number, duration:number):number {
            if (time < duration / 2) {
                return this.bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
            } else {
                return this.bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
            }
        };

        public circIn = function (time:number, begin:number, change:number, duration:number):number {
            return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
        };

        public circOut = function (time:number, begin:number, change:number, duration:number):number {
            return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
        };

        public circInOut = function (time:number, begin:number, change:number, duration:number):number {
            if ((time = time / (duration / 2)) < 1) {
                return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
            } else {
                return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
            }
        };

        public cubicIn = function (time:number, begin:number, change:number, duration:number):number {
            return change * (time /= duration) * time * time + begin;
        };

        public cubicOut = function (time:number, begin:number, change:number, duration:number):number {
            return change * ((time = time / duration - 1) * time * time + 1) + begin;
        };

        public cubicInOut = function (time:number, begin:number, change:number, duration:number):number {
            if ((time = time / (duration / 2)) < 1) {
                return change / 2 * time * time * time + begin;
            } else {
                return change / 2 * ((time -= 2) * time * time + 2) + begin;
            }
        };

        public elasticOut = function (time, begin, change, duration, amplitude, period) {
            var overshoot;
            if (amplitude == null) {
                amplitude = null;
            }
            if (period == null) {
                period = null;
            }
            if (time === 0) {
                return begin;
            } else if ((time = time / duration) === 1) {
                return begin + change;
            } else {
                if (!(period != null)) {
                    period = duration * 0.3;
                }
                if (!(amplitude != null) || amplitude < Math.abs(change)) {
                    amplitude = change;
                    overshoot = period / 4;
                } else {
                    overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
                }
                return (amplitude * Math.pow(2, -10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
            }
        };

        public elasticIn = function (time, begin, change, duration, amplitude, period) {
            var overshoot;
            if (amplitude == null) {
                amplitude = null;
            }
            if (period == null) {
                period = null;
            }
            if (time === 0) {
                return begin;
            } else if ((time = time / duration) === 1) {
                return begin + change;
            } else {
                if (!(period != null)) {
                    period = duration * 0.3;
                }
                if (!(amplitude != null) || amplitude < Math.abs(change)) {
                    amplitude = change;
                    overshoot = period / 4;
                } else {
                    overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
                }
                time -= 1;
                return -(amplitude * Math.pow(2, 10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + begin;
            }
        };

        public elasticInOut = function (time, begin, change, duration, amplitude, period) {
            var overshoot;
            if (amplitude == null) {
                amplitude = null;
            }
            if (period == null) {
                period = null;
            }
            if (time === 0) {
                return begin;
            } else if ((time = time / (duration / 2)) === 2) {
                return begin + change;
            } else {
                if (!(period != null)) {
                    period = duration * (0.3 * 1.5);
                }
                if (!(amplitude != null) || amplitude < Math.abs(change)) {
                    amplitude = change;
                    overshoot = period / 4;
                } else {
                    overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
                }
                if (time < 1) {
                    return -0.5 * (amplitude * Math.pow(2, 10 * (time -= 1))) * Math.sin((time * duration - overshoot) * ((2 * Math.PI) / period)) + begin;
                } else {
                    return amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
                }
            }
        };

        public expoIn = function (time:number, begin:number, change:number, duration:number):number {
            if (time === 0) {
                return begin;
            }
            return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
        };

        public expoOut = function (time:number, begin:number, change:number, duration:number):number {
            if (time === duration) {
                return begin + change;
            }
            return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
        };

        public expoInOut = function (time:number, begin:number, change:number, duration:number):number {
            if (time === 0) {
                return begin;
            } else if (time === duration) {
                return begin + change;
            } else if ((time = time / (duration / 2)) < 1) {
                return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
            } else {
                return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;
            }
        };

        public linearNone(time:number, begin:number, change:number, duration:number):number {
            return change * time / duration + begin;
        };

        public linearIn = function (time:number, begin:number, change:number, duration:number):number {
            return this.linearNone(time, begin, change, duration);
        }.bind(this);

        public linearOut = function (time:number, begin:number, change:number, duration:number):number {
            return this.linearNone(time, begin, change, duration);
        }.bind(this);

        public linearInOut = function (time:number, begin:number, change:number, duration:number):number {
            return this.linearNone(time, begin, change, duration);
        }.bind(this);

        public quadIn = function (time:number, begin:number, change:number, duration:number):number {
            return change * (time = time / duration) * time + begin;
        };

        public quadOut = function (time:number, begin:number, change:number, duration:number):number {
            return -change * (time = time / duration) * (time - 2) + begin;
        };

        public quadInOut = function (time:number, begin:number, change:number, duration:number):number {
            if ((time = time / (duration / 2)) < 1) {
                return change / 2 * time * time + begin;
            } else {
                return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;
            }
        };

        public quartIn = function (time:number, begin:number, change:number, duration:number):number {
            return change * (time = time / duration) * time * time * time + begin;
        };

        public quartOut = function (time:number, begin:number, change:number, duration:number):number {
            return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
        };

        public quartInOut = function (time:number, begin:number, change:number, duration:number):number {
            if ((time = time / (duration / 2)) < 1) {
                return change / 2 * time * time * time * time + begin;
            } else {
                return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
            }
        };

        public quintIn = function (time:number, begin:number, change:number, duration:number):number {
            return change * (time = time / duration) * time * time * time * time + begin;
        };

        public quintOut = function (time:number, begin:number, change:number, duration:number):number {
            return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
        };

        public quintInOut = function (time:number, begin:number, change:number, duration:number):number {
            if ((time = time / (duration / 2)) < 1) {
                return change / 2 * time * time * time * time * time + begin;
            } else {
                return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
            }
        };

        public sineIn = function (time:number, begin:number, change:number, duration:number):number {
            return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
        };

        public sineOut = function (time:number, begin:number, change:number, duration:number):number {
            return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
        };

        public sineInOut = function (time:number, begin:number, change:number, duration:number):number {
            return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
        };

    }


}