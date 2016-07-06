/**
 * Logger
 */
export class Logger {

    private debug:Boolean;

    constructor(config) {
        this.debug = config.debug;
        console.time('Application Runtime');
    }

    /**
     * Log Message to console
     *
     * @param type
     * @param message
     * @param bindings
     */
    private log(type = 'log', message, ...bindings) {

        if (this.debug && type != 'dir') {
            console[type](`${message} ${this.inlineBindings(...bindings)}`);
        }

        if (type === 'dir') {
            console.dir(bindings)
        }

    }

    /**
     * Trace Execution Time
     *
     * @param string title
     * @param function callback
     */
    time(title:string, callback?:Function) {
        console.time(title);

        if (callback instanceof Function) {
            callback(this);
        }

        console.timeEnd(title)
    }

    /**
     * Group Console logs
     * @param string title
     * @param boolean collapsed
     */
    group(title:string, callback?:Function, collapsed:boolean = true):void {

        if (!this.debug && callback instanceof Function)
            return callback(this);

        if (collapsed)
            console.groupCollapsed(title);
        else
            console.group(title);

        /**
         * Trance Time
         */
        this.time('Total Execution Time', callback);

        this.closeGroup();

    }

    /**
     * Close Console group
     */
    closeGroup() {
        console.groupEnd();
    }

    info(message, ...bindings) {
        this.log('info', message, ...bindings);
    }

    error(message, ...bindings) {
        this.log('error', message, ...bindings);
    }

    warn(message, ...bindings) {
        this.log('warm', message, ...bindings);
    }

    dir(...bindings) {
        this.log('dir', null, ...bindings);
    }

    private inlineBindings(...list) {
        return `{${list.join('} {')}}`;
    }

}
