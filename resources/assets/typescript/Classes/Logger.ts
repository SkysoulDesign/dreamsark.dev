import {Application} from "../Abstract/Aplication";

/**
 * Logger
 */
export class Logger extends Application {

    private debug:Boolean;

    boot() {
        this.debug = this.app.config.debug;
    }

    /**
     * Log Message to console
     *
     * @param type
     * @param message
     * @param bindings
     */
    public log(type = 'log', message, ...bindings) {

        if (this.debug) {
            console[type](`${message} ${this.inlineBindings(...bindings)}`);
        }

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

    dir(message, ...bindings) {
        this.log('dir', message, ...bindings);
    }

    private inlineBindings(...list) {
        return `{${list.join('} {')}}`;
    }

}
