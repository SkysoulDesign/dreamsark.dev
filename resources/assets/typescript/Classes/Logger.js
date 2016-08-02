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
        this.log.apply(this, ['warn', message].concat(bindings));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRztBQUNIO0lBSUksZ0JBQVksTUFBTTtRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLG9CQUFHLEdBQVgsVUFBWSxJQUFZLEVBQUUsT0FBTztRQUFyQixvQkFBWSxHQUFaLFlBQVk7UUFBVyxrQkFBVzthQUFYLFdBQVcsQ0FBWCxzQkFBVyxDQUFYLElBQVc7WUFBWCxpQ0FBVzs7UUFFMUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUksT0FBTyxTQUFJLElBQUksQ0FBQyxjQUFjLE9BQW5CLElBQUksRUFBbUIsUUFBUSxDQUFHLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN6QixDQUFDO0lBRUwsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gscUJBQUksR0FBSixVQUFLLEtBQVksRUFBRSxRQUFrQjtRQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBRUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHNCQUFLLEdBQUwsVUFBTSxLQUFZLEVBQUUsUUFBa0IsRUFBRSxTQUF3QjtRQUF4Qix5QkFBd0IsR0FBeEIsZ0JBQXdCO1FBRTVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLFlBQVksUUFBUSxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ1YsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJO1lBQ0EsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6Qjs7V0FFRztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRXRCLENBQUM7SUFFRDs7T0FFRztJQUNILDJCQUFVLEdBQVY7UUFDSSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHFCQUFJLEdBQUosVUFBSyxPQUFPO1FBQUUsa0JBQVc7YUFBWCxXQUFXLENBQVgsc0JBQVcsQ0FBWCxJQUFXO1lBQVgsaUNBQVc7O1FBQ3JCLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxHQUFLLE1BQU0sRUFBRSxPQUFPLFNBQUssUUFBUSxFQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELHNCQUFLLEdBQUwsVUFBTSxPQUFPO1FBQUUsa0JBQVc7YUFBWCxXQUFXLENBQVgsc0JBQVcsQ0FBWCxJQUFXO1lBQVgsaUNBQVc7O1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxHQUFLLE9BQU8sRUFBRSxPQUFPLFNBQUssUUFBUSxFQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELHFCQUFJLEdBQUosVUFBSyxPQUFPO1FBQUUsa0JBQVc7YUFBWCxXQUFXLENBQVgsc0JBQVcsQ0FBWCxJQUFXO1lBQVgsaUNBQVc7O1FBQ3JCLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxHQUFLLE1BQU0sRUFBRSxPQUFPLFNBQUssUUFBUSxFQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELG9CQUFHLEdBQUg7UUFBSSxrQkFBVzthQUFYLFdBQVcsQ0FBWCxzQkFBVyxDQUFYLElBQVc7WUFBWCxpQ0FBVzs7UUFDWCxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksR0FBSyxLQUFLLEVBQUUsSUFBSSxTQUFLLFFBQVEsRUFBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTywrQkFBYyxHQUF0QjtRQUF1QixjQUFPO2FBQVAsV0FBTyxDQUFQLHNCQUFPLENBQVAsSUFBTztZQUFQLDZCQUFPOztRQUMxQixNQUFNLENBQUMsTUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFHLENBQUM7SUFDbkMsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQUFDLEFBL0ZELElBK0ZDO0FBL0ZZLGNBQU0sU0ErRmxCLENBQUEifQ==