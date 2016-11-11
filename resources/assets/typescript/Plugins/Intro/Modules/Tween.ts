import { BootableInterface } from "../../../Interfaces/BootableInterface";
import { ModulesInterface } from "../Interfaces/ModulesInterface";
import { is } from "../../Helpers";
import { extend } from "../../../Helpers";
import Promise = require('bluebird');

export interface TweenInterface {
    clock?: THREE.Clock,
    ease?: string,
    begin?: number,
    origin: {},
    target: {},
    container?: {},
    resolver?: Function,
    duration?: number,
    update?: Function,
    before?: Function,
    after?: Function,
    done?: boolean,
    afterCalled?: boolean,
    result?: {}
}

/**
 * Tween Class
 */
export class Tween implements BootableInterface, ModulesInterface {

    public boot() { }
    private pool: TweenInterface[] = []
    private promises = [];
    get defaults() {
        return {
            ease: Tween.LINEAR,
            duration: 1,
            begin: 0,
            //Return false to break the update loop and release the animation
            update: function (origin, data, completion, elapsed): boolean {
                return false;
            },
            before: function () { },
            after: function () { },
            afterCalled: false
        }
    };

    public promise<A>(options: TweenInterface, defaults = this.defaults): PromiseLike<A> {

        return new Promise((resolve, reject) => {

            defaults['resolver'] = resolve;
            defaults['container'] = this.clone(options['origin'] || defaults['origin'], options.target)
            defaults['clock'] = new THREE.Clock();
            defaults['done'] = false;
            defaults['result'] = null;
            defaults['update'] = (): boolean => false;
            defaults['before'] = () => null;
            defaults['after'] = () => null;
            defaults['afterCalled'] = false;

            const final = extend(defaults, options);

            final.before();

            this.pool.push(final);

        })
    }

    public animate(options: TweenInterface) {

        let chain = {
            running: false,
            queue: [],
            promise: this.promise(options),
            process: result => {

                if (!chain.queue.length) {
                    return chain.promise;
                }

                const options = chain.queue.shift();

                if (is.Object(options)) {
                    chain.promise = this.promise(options, result);
                    chain.promise.then(chain.process)
                } else if (is.Function(options)) {

                    /**
                     * Allow break in a then
                     */
                    chain.promise.then(result => {
                        /**
                         * If return value is trully, stop the animation
                         */
                        if (!options(chain.process.bind(result))) {
                            chain.promise.then(chain.process)
                        }
                    })
                }

                return chain.promise;

            },

            then: (options: any, ease?: string): any => {

                if (ease) {
                    options.ease = ease
                }

                chain.queue.push(options);

                if (!chain.running) {
                    chain.running = true;
                    chain.promise.then(chain.process);
                }

                return chain;
            }

        };

        return chain;

    }

    private looper(origin, target, container = {}, callback: Function = (o, t, c, p) => { }, keys = {}) {

        for (let property in target) {

            if (is.Object(target[property])) {

                this.looper(origin[property], target[property], container[property], callback, keys[property] = {})

                continue;

            } else {
                keys[property] = callback(origin, target, container, property) || origin[property]
            }

        }

        return keys;

    }

    /**
     * Copy param from Origin to new Object based on the Target Property
     * Example: O => {A:1,B:2,C:3}, T => {B:50}, Result => {B:2}
     */
    private clone(origin: {}, target: {}) {
        return this.looper(origin, target);
    }

    private process(original: TweenInterface, origin: {}, target: {}, container: {}, property: string): {} {

        let {clock, duration, begin, ease} = original,
            elapsed = clock.getElapsedTime(),
            completion = (elapsed / duration) * 100;

        if (elapsed >= duration) {

            /**
             * If time up, set the end position
             */
            origin[property] = target[property];

        } else {

            origin[property] = container[property] - this[ease](
                elapsed, begin, container[property] - target[property], duration
            );

        }

        return {
            complete: completion >= 100 ? true : false,
            completion: completion,
            value: origin[property]
        };

    }

    public analizer(data: any) {

        if (!data) return false;

        if (data.hasOwnProperty('complete')) {
            return data.complete;
        }

        return Object.keys(data).map(prop => {

            if (is.Object(data[prop])) {
                return this.analizer(data[prop]);
            }

            return data[prop].complete;

        }).reduce(function (previousValue, currentValue, index, array) {
            return previousValue || currentValue;
        });

    }

    /**
     * Update Animations
     * @param time
     * @param delta
     */
    public update(time: number, delta: number): void {

        if (!this.pool.length) {
            return;
        }

        this.pool.forEach((item, index) => {

            let elapsed = item.clock.getElapsedTime(),
                completion = (elapsed / item.duration) * 100;

            if (!(item.done = this.analizer(item.result || null)) && completion < 100) {

                item.result = this.looper(item.origin, item.target, item.container, (o, t, c, p) => {
                    return this.process(item, o, t, c, p);
                });

            }

            let done = item.update(item.result, completion, elapsed)

            /**
             * IF its only waiting for the update to finish.. call after meanwhile
             */
            if (completion >= 100 && !item.afterCalled || item.done) {
                item.after();
                item.afterCalled = true;
            }

            if (completion >= 100 && !done || item.done) {
                item.clock.stop();
                item.resolver(item);
                this.pool.splice(index, 1);
            }

        });

    }

    static OVERSHOOT = 1.70158;
    static BACKIN = 'backIn';
    static BACKOUT = 'backOut';
    static BACKINOUT = 'backInOut';
    static BOUNCEOUT = 'bounceOut';
    static BOUNCEIN = 'bounceIn';
    static BOUNCEINOUT = 'bounceInOut';
    static CIRCIN = 'circIn';
    static CIRCOUT = 'circOut';
    static CIRCINOUT = 'circInOut';
    static CUBICIN = 'cubicIn';
    static CUBICOUT = 'cubicOut';
    static CUBICINOUT = 'cubicInOut';
    static ELASTICOUT = 'elasticOut';
    static ELASTICIN = 'elasticIn';
    static ELASTICINOUT = 'elasticInOut';
    static EXPOIN = 'expoIn';
    static EXPOOUT = 'expoOut';
    static EXPOINOUT = 'expoInOut';
    static LINEAR = 'linear';
    static LINEARIN = 'linearIn';
    static LINEAROUT = 'linearOut';
    static LINEARINOUT = 'linearInOut';
    static QUADIN = 'quadIn';
    static QUADOUT = 'quadOut';
    static QUADINOUT = 'quadInOut';
    static QUARTIN = 'quartIn';
    static QUARTOUT = 'quartOut';
    static QUARTINOUT = 'quartInOut';
    static QUINTIN = 'quintIn';
    static QUINTOUT = 'quintOut';
    static QUINTINOUT = 'quintInOut';
    static SINEIN = 'sineIn';
    static SINEOUT = 'sineOut';
    static SINEINOUT = 'sineInOut';

    private backIn(time, begin, change, duration, overshoot) {

        if (overshoot == null)
            overshoot = Tween.OVERSHOOT;

        return change * (time /= duration) * time * ((overshoot + 1) * time - overshoot) + begin;
    }

    private backOut(time, begin, change, duration, overshoot) {

        if (overshoot == null)
            overshoot = Tween.OVERSHOOT;

        return change * ((time = time / duration - 1) * time * ((overshoot + 1) * time + overshoot) + 1) + begin;

    }

    private backInOut(time, begin, change, duration, overshoot) {

        if (overshoot == null)
            overshoot = Tween.OVERSHOOT;

        if ((time = time / (duration / 2)) < 1) {
            return change / 2 * (time * time * (((overshoot *= 1.525) + 1) * time - overshoot)) + begin;
        }

        return change / 2 * ((time -= 2) * time * (((overshoot *= 1.525) + 1) * time + overshoot) + 2) + begin;

    }

    private bounceOut(time, begin, change, duration) {

        if ((time /= duration) < 1 / 2.75) {
            return change * (7.5625 * time * time) + begin;
        } else if (time < 2 / 2.75) {
            return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
        } else if (time < 2.5 / 2.75) {
            return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
        }

        return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;

    }

    private bounceIn(time, begin, change, duration) {
        return change - this.bounceOut(duration - time, 0, change, duration) + begin;
    }

    private bounceInOut(time, begin, change, duration) {

        if (time < duration / 2) {
            return this.bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
        }

        return this.bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;

    }

    private circIn(time, begin, change, duration) {
        return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
    }

    private circOut(time, begin, change, duration) {
        return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
    }

    private circInOut(time, begin, change, duration) {

        if ((time = time / (duration / 2)) < 1) {
            return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
        }

        return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;

    }

    private cubicIn(time, begin, change, duration) {
        return change * (time /= duration) * time * time + begin;
    }

    private cubicOut(time, begin, change, duration) {
        return change * ((time = time / duration - 1) * time * time + 1) + begin;
    }

    private cubicInOut(time, begin, change, duration) {

        if ((time = time / (duration / 2)) < 1) {
            return change / 2 * time * time * time + begin;
        }

        return change / 2 * ((time -= 2) * time * time + 2) + begin;

    }

    private elasticOut(time, begin, change, duration, amplitude, period) {

        var overshoot;

        if (time === 0) {
            return begin;
        } else if ((time = time / duration) === 1) {
            return begin + change;
        }

        if (!(period != null)) {
            period = duration * 0.3;
        }

        if (!(amplitude != null) || amplitude < Math.abs(change)) {
            amplitude = change;
            overshoot = period / 4;
        }

        overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);

        return (amplitude * Math.pow(2, -10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;

    }

    private elasticIn(time, begin, change, duration, amplitude, period) {

        let overshoot;

        if (time === 0) {
            return begin;
        } else if ((time = time / duration) === 1) {
            return begin + change;
        }

        if (!(period != null)) {
            period = duration * 0.3;
        }

        if (!(amplitude != null) || amplitude < Math.abs(change)) {
            amplitude = change;
            overshoot = period / 4;
        }

        overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);

        time -= 1;

        return -(amplitude * Math.pow(2, 10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + begin;

    }

    private elasticInOut(time, begin, change, duration, amplitude, period) {

        let overshoot;

        if (time === 0) {
            return begin;
        } else if ((time = time / (duration / 2)) === 2) {
            return begin + change;
        }

        if (!(period != null)) {
            period = duration * (0.3 * 1.5);
        }

        if (!(amplitude != null) || amplitude < Math.abs(change)) {
            amplitude = change;
            overshoot = period / 4;
        }

        overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);

        if (time < 1) {
            return -0.5 * (amplitude * Math.pow(2, 10 * (time -= 1))) * Math.sin((time * duration - overshoot) * ((2 * Math.PI) / period)) + begin;
        }

        return amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;


    }

    private expoIn(time, begin, change, duration) {

        if (time === 0) {
            return begin;
        }

        return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
    }

    private expoOut(time, begin, change, duration) {

        if (time === duration) {
            return begin + change;
        }

        return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
    }

    private expoInOut(time, begin, change, duration) {

        if (time === 0) {
            return begin;
        } else if (time === duration) {
            return begin + change;
        } else if ((time = time / (duration / 2)) < 1) {
            return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
        }

        return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;

    }

    private linear(time, begin, change, duration) {
        return change * time / duration + begin;
    }

    private linearIn(time, begin, change, duration) {
        return this.linear(time, begin, change, duration);
    }

    private linearOut(time, begin, change, duration) {
        return this.linear(time, begin, change, duration);
    }

    private linearInOut(time, begin, change, duration) {
        return this.linear(time, begin, change, duration);
    }

    private quadIn(time, begin, change, duration) {
        return change * (time = time / duration) * time + begin;
    }

    private quadOut(time, begin, change, duration) {
        return -change * (time = time / duration) * (time - 2) + begin;
    }

    private quadInOut(time, begin, change, duration) {

        if ((time = time / (duration / 2)) < 1) {
            return change / 2 * time * time + begin;
        }

        return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;

    }

    private quartIn(time, begin, change, duration) {
        return change * (time = time / duration) * time * time * time + begin;
    }

    private quartOut(time, begin, change, duration) {
        return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
    }

    private quartInOut(time, begin, change, duration) {

        if ((time = time / (duration / 2)) < 1) {
            return change / 2 * time * time * time * time + begin;
        }

        return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;

    }

    private quintIn(time, begin, change, duration) {
        return change * (time = time / duration) * time * time * time * time + begin;
    }

    private quintOut(time, begin, change, duration) {
        return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
    }

    private quintInOut(time, begin, change, duration) {

        if ((time = time / (duration / 2)) < 1) {
            return change / 2 * time * time * time * time * time + begin;
        }

        return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;

    }

    private sineIn(time, begin, change, duration) {
        return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
    }

    private sineOut(time, begin, change, duration) {
        return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
    }

    private sineInOut(time, begin, change, duration) {
        return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
    }

}
