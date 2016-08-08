var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var Animator = (function () {
            function Animator() {
            }
            Animator.prototype.init = ;
            return Animator;
        })();
        Modules.Animator = Animator;
        {
        }
        backIn(parameters, Tweenable, context ?  : any);
        {
            var tween = new Tween('backIn', parameters, context);
            if (parameters.autoStart)
                return tween;
            tween.init();
        }
        ;
        backOut(parameters, Tweenable, context ?  : any);
        {
            var tween = new Tween('backOut', parameters, context);
            if (parameters.autoStart)
                return tween;
            tween.init();
        }
        ;
        backInOut(parameters, Tweenable, context ?  : any);
        {
            return this.init('backInOut', parameters, context);
            var tween = new Tween('backInOut', parameters, context);
            if (parameters.autoStart)
                return tween;
            tween.init();
        }
        ;
        bounceOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('bounceOut', parameters, context).init();
        }
        ;
        bounceIn(parameters, Tweenable, context ?  : any);
        {
            new Tween('bounceIn', parameters, context).init();
        }
        ;
        bounceInOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('bounceInOut', parameters, context).init();
        }
        ;
        circIn(parameters, Tweenable, context ?  : any);
        {
            new Tween('circIn', parameters, context).init();
        }
        ;
        circOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('circOut', parameters, context).init();
        }
        ;
        circInOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('circInOut', parameters, context).init();
        }
        ;
        cubicIn(parameters, Tweenable, context ?  : any);
        {
            new Tween('cubicIn', parameters, context).init();
        }
        ;
        cubicOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('cubicOut', parameters, context).init();
        }
        ;
        cubicInOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('cubicInOut', parameters, context).init();
        }
        ;
        elasticIn(parameters, Tweenable, context ?  : any);
        {
            new Tween('elasticIn', parameters, context).init();
        }
        ;
        elasticOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('elasticOut', parameters, context).init();
        }
        ;
        elasticInOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('elasticInOut', parameters, context).init();
        }
        ;
        expoIn(parameters, Tweenable, context ?  : any);
        {
            new Tween('expoIn', parameters, context).init();
        }
        ;
        expoOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('expoOut', parameters, context).init();
        }
        ;
        expoInOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('expoInOut', parameters, context).init();
        }
        ;
        linearIn(parameters, Tweenable, context ?  : any);
        {
            new Tween('linearIn', parameters, context).init();
        }
        ;
        linearOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('linearOut', parameters, context).init();
        }
        ;
        linearInOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('linearInOut', parameters, context).init();
        }
        ;
        quadIn(parameters, Tweenable, context ?  : any);
        {
            new Tween('quadIn', parameters, context).init();
        }
        ;
        quadOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('quadOut', parameters, context).init();
        }
        ;
        quadInOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('quadInOut', parameters, context).init();
        }
        ;
        quartIn(parameters, Tweenable, context ?  : any);
        {
            new Tween('quartIn', parameters, context).init();
        }
        ;
        quartOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('quartOut', parameters, context).init();
        }
        ;
        quartInOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('quartInOut', parameters, context).init();
        }
        ;
        quintIn(parameters, Tweenable, context ?  : any);
        {
            new Tween('quintIn', parameters, context).init();
        }
        ;
        quintOut(parameters, Tweenable, context ?  : any);
        {
            var tween = new Tween('quintOut', parameters, context);
            if (parameters.autoStart)
                return tween;
            tween.init();
        }
        ;
        quintInOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('quintInOut', parameters, context).init();
        }
        ;
        sineIn(parameters, Tweenable, context ?  : any);
        {
            new Tween('sineIn', parameters, context).init();
        }
        ;
        sineOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('sineOut', parameters, context).init();
        }
        ;
        sineInOut(parameters, Tweenable, context ?  : any);
        {
            new Tween('sineInOut', parameters, context).init();
        }
        ;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
var Tween = (function () {
    function Tween(equation, parameters, context) {
        if (context === void 0) { context = DreamsArk; }
        this.equation = equation;
        this.context = context;
        this.bounceInOut = function (time, begin, change, duration) {
            if (time < duration / 2) {
                return this.bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
            }
            else {
                return this.bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
            }
        };
        this.circIn = function (time, begin, change, duration) {
            return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
        };
        this.circOut = function (time, begin, change, duration) {
            return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
        };
        this.circInOut = function (time, begin, change, duration) {
            if ((time = time / (duration / 2)) < 1) {
                return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
            }
            else {
                return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
            }
        };
        this.cubicIn = function (time, begin, change, duration) {
            return change * (time /= duration) * time * time + begin;
        };
        this.cubicOut = function (time, begin, change, duration) {
            return change * ((time = time / duration - 1) * time * time + 1) + begin;
        };
        this.cubicInOut = function (time, begin, change, duration) {
            if ((time = time / (duration / 2)) < 1) {
                return change / 2 * time * time * time + begin;
            }
            else {
                return change / 2 * ((time -= 2) * time * time + 2) + begin;
            }
        };
        this.elasticOut = function (time, begin, change, duration, amplitude, period) {
            var overshoot;
            if (amplitude == null) {
                amplitude = null;
            }
            if (period == null) {
                period = null;
            }
            if (time === 0) {
                return begin;
            }
            else if ((time = time / duration) === 1) {
                return begin + change;
            }
            else {
                if (!(period != null)) {
                    period = duration * 0.3;
                }
                if (!(amplitude != null) || amplitude < Math.abs(change)) {
                    amplitude = change;
                    overshoot = period / 4;
                }
                else {
                    overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
                }
                return (amplitude * Math.pow(2, -10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
            }
        };
        this.elasticIn = function (time, begin, change, duration, amplitude, period) {
            var overshoot;
            if (amplitude == null) {
                amplitude = null;
            }
            if (period == null) {
                period = null;
            }
            if (time === 0) {
                return begin;
            }
            else if ((time = time / duration) === 1) {
                return begin + change;
            }
            else {
                if (!(period != null)) {
                    period = duration * 0.3;
                }
                if (!(amplitude != null) || amplitude < Math.abs(change)) {
                    amplitude = change;
                    overshoot = period / 4;
                }
                else {
                    overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
                }
                time -= 1;
                return -(amplitude * Math.pow(2, 10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + begin;
            }
        };
        this.elasticInOut = function (time, begin, change, duration, amplitude, period) {
            var overshoot;
            if (amplitude == null) {
                amplitude = null;
            }
            if (period == null) {
                period = null;
            }
            if (time === 0) {
                return begin;
            }
            else if ((time = time / (duration / 2)) === 2) {
                return begin + change;
            }
            else {
                if (!(period != null)) {
                    period = duration * (0.3 * 1.5);
                }
                if (!(amplitude != null) || amplitude < Math.abs(change)) {
                    amplitude = change;
                    overshoot = period / 4;
                }
                else {
                    overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
                }
                if (time < 1) {
                    return -0.5 * (amplitude * Math.pow(2, 10 * (time -= 1))) * Math.sin((time * duration - overshoot) * ((2 * Math.PI) / period)) + begin;
                }
                else {
                    return amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
                }
            }
        };
        this.expoIn = function (time, begin, change, duration) {
            if (time === 0) {
                return begin;
            }
            return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
        };
        this.expoOut = function (time, begin, change, duration) {
            if (time === duration) {
                return begin + change;
            }
            return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
        };
        this.expoInOut = function (time, begin, change, duration) {
            if (time === 0) {
                return begin;
            }
            else if (time === duration) {
                return begin + change;
            }
            else if ((time = time / (duration / 2)) < 1) {
                return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
            }
            else {
                return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;
            }
        };
        this.linearIn = function (time, begin, change, duration) {
            return this.linearNone(time, begin, change, duration);
        }.bind(this);
        this.linearOut = function (time, begin, change, duration) {
            return this.linearNone(time, begin, change, duration);
        }.bind(this);
        this.linearInOut = function (time, begin, change, duration) {
            return this.linearNone(time, begin, change, duration);
        }.bind(this);
        this.quadIn = function (time, begin, change, duration) {
            return change * (time = time / duration) * time + begin;
        };
        this.quadOut = function (time, begin, change, duration) {
            return -change * (time = time / duration) * (time - 2) + begin;
        };
        this.quadInOut = function (time, begin, change, duration) {
            if ((time = time / (duration / 2)) < 1) {
                return change / 2 * time * time + begin;
            }
            else {
                return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;
            }
        };
        this.quartIn = function (time, begin, change, duration) {
            return change * (time = time / duration) * time * time * time + begin;
        };
        this.quartOut = function (time, begin, change, duration) {
            return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
        };
        this.quartInOut = function (time, begin, change, duration) {
            if ((time = time / (duration / 2)) < 1) {
                return change / 2 * time * time * time * time + begin;
            }
            else {
                return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
            }
        };
        this.quintIn = function (time, begin, change, duration) {
            return change * (time = time / duration) * time * time * time * time + begin;
        };
        this.quintOut = function (time, begin, change, duration) {
            return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
        };
        this.quintInOut = function (time, begin, change, duration) {
            if ((time = time / (duration / 2)) < 1) {
                return change / 2 * time * time * time * time * time + begin;
            }
            else {
                return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
            }
        };
        this.sineIn = function (time, begin, change, duration) {
            return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
        };
        this.sineOut = function (time, begin, change, duration) {
            return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
        };
        this.sineInOut = function (time, begin, change, duration) {
            return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
        };
        this.duration = parameters.duration * 1000;
        this.destination = parameters.destination;
        this.origin = parameters.origin;
        this.update = parameters.update;
        this.complete = parameters.complete;
        this.start = parameters.start;
        this.delay = parameters.delay;
        this.overshoot = parameters.overshoot;
    }
    Tween.prototype.init = function () {
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
        var checker = module('Checker'), instance = {}, equation = this[this.equation], overshoot = this.overshoot, duration = this.duration, origin = !is.Null(this.origin) ? clone(this.origin) : null, destination = is.Null(this.origin) ? clone(this.destination) : {};
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
                this.update.call(this.context, instance);
                return false;
            }
            /**
             * Call on the last frame to make sure the end result is 100% and not a fraction
             */
            this.update.call(this.context, this.destination);
            if (is.Function(this.complete))
                this.complete();
            /**
             * Destroy Checker
             */
            return true;
        }, this);
    };
    Tween.prototype.backIn = function (time, begin, change, duration, overshoot) {
        if (overshoot == null) {
            overshoot = 1.70158;
        }
        return change * (time /= duration) * time * ((overshoot + 1) * time - overshoot) + begin;
    };
    ;
    Tween.prototype.backOut = function (time, begin, change, duration, overshoot) {
        if (overshoot == null) {
            overshoot = 1.70158;
        }
        return change * ((time = time / duration - 1) * time * ((overshoot + 1) * time + overshoot) + 1) + begin;
    };
    ;
    Tween.prototype.backInOut = function (time, begin, change, duration, overshoot) {
        if (overshoot == null) {
            overshoot = 1.70158;
        }
        if ((time = time / (duration / 2)) < 1) {
            return change / 2 * (time * time * (((overshoot *= 1.525) + 1) * time - overshoot)) + begin;
        }
        else {
            return change / 2 * ((time -= 2) * time * (((overshoot *= 1.525) + 1) * time + overshoot) + 2) + begin;
        }
    };
    ;
    Tween.prototype.bounceOut = function (time, begin, change, duration) {
        if ((time /= duration) < 1 / 2.75) {
            return change * (7.5625 * time * time) + begin;
        }
        else if (time < 2 / 2.75) {
            return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
        }
        else if (time < 2.5 / 2.75) {
            return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
        }
        else {
            return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
        }
    };
    ;
    Tween.prototype.bounceIn = function (time, begin, change, duration) {
        return change - this.bounceOut(duration - time, 0, change, duration) + begin;
    };
    ;
    Tween.prototype.linearNone = function (time, begin, change, duration) {
        return change * time / duration + begin;
    };
    ;
    return Tween;
})();
exports.Tween = Tween;
//# sourceMappingURL=Animator.js.map