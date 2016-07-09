"use strict";
/**
 * Logger
 */
var Logger = (function () {
    function Logger(config) {
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
    Logger.prototype.log = function (type, message) {
        if (type === void 0) { type = 'log'; }
        var bindings = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            bindings[_i - 2] = arguments[_i];
        }
        if (this.debug && type != 'dir') {
            console[type](message + " " + this.inlineBindings.apply(this, bindings));
        }
        if (type === 'dir') {
            console.dir(bindings);
        }
    };
    /**
     * Trace Execution Time
     *
     * @param string title
     * @param function callback
     */
    Logger.prototype.time = function (title, callback) {
        console.time(title);
        if (callback instanceof Function) {
            callback(this);
        }
        console.timeEnd(title);
    };
    /**
     * Group Console logs
     * @param string title
     * @param boolean collapsed
     */
    Logger.prototype.group = function (title, callback, collapsed) {
        if (collapsed === void 0) { collapsed = true; }
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
    };
    /**
     * Close Console group
     */
    Logger.prototype.closeGroup = function () {
        console.groupEnd();
    };
    Logger.prototype.info = function (message) {
        var bindings = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            bindings[_i - 1] = arguments[_i];
        }
        this.log.apply(this, ['info', message].concat(bindings));
    };
    Logger.prototype.error = function (message) {
        var bindings = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            bindings[_i - 1] = arguments[_i];
        }
        this.log.apply(this, ['error', message].concat(bindings));
    };
    Logger.prototype.warn = function (message) {
        var bindings = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            bindings[_i - 1] = arguments[_i];
        }
        this.log.apply(this, ['warm', message].concat(bindings));
    };
    Logger.prototype.dir = function () {
        var bindings = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bindings[_i - 0] = arguments[_i];
        }
        this.log.apply(this, ['dir', null].concat(bindings));
    };
    Logger.prototype.inlineBindings = function () {
        var list = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            list[_i - 0] = arguments[_i];
        }
        return "{" + list.join('} {') + "}";
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map