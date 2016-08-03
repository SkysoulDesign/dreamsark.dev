"use strict";
var Helpers_1 = require("./Helpers");
var Logger_1 = require("./Classes/Logger");
var Config_1 = require("./Classes/Config");
/**
 * Application
 */
var App = (function () {
    function App() {
        this.vueObject = {
            events: {},
            plugins: [],
            mixins: []
        };
        this.plugins = {};
        this.config = new Config_1.Config();
        this.logger = new Logger_1.Logger(this.config);
        /**
         * List of Providers
         */
        this.components = {
            component: require('./Classes/Component'),
            pages: require('./Classes/Pages')
        };
        this.bootstrap(this, this.components);
    }
    /**
     * Bootstrap all classes
     */
    App.prototype.bootstrap = function (container, components) {
        if (container === void 0) { container = this; }
        this.logger.group('Core', function (logger) {
            var _loop_1 = function(component) {
                var _loop_2 = function(name_1) {
                    logger.group(name_1, function () {
                        container[component] = new components[component][name_1](container);
                    });
                };
                for (var name_1 in components[component]) {
                    _loop_2(name_1);
                }
            };
            for (var component in components) {
                _loop_1(component);
            }
            for (var component in components) {
                container[component].boot(container);
            }
        });
    };
    /**
     * Destruct all classes
     */
    App.prototype.destruct = function () {
        for (var component in this.components)
            this[component].destruct(this);
        console.timeEnd('Application Runtime');
    };
    /**
     * Install Plugins
     * @param plugin
     */
    App.prototype.install = function (plugins) {
        var _this = this;
        var _loop_3 = function(name_2) {
            this_1.logger.group("Plugin: " + name_2, function (logger) {
                _this.plugins[name_2.toLowerCase()] = plugins[name_2];
            }, false);
        };
        var this_1 = this;
        for (var name_2 in plugins) {
            _loop_3(name_2);
        }
    };
    /**
     * Get Plugin
     * @param name
     * @returns {any}
     */
    App.prototype.plugin = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        name = name.toLowerCase();
        if (this.plugins.hasOwnProperty(name)) {
            if (this.plugins[name] instanceof Function) {
                return new ((_a = this.plugins[name]).bind.apply(_a, [void 0].concat([this], args)))();
            }
            ;
            return this.plugins[name];
        }
        this.logger.error("Plugin { " + name + " } not found. did you install it already?");
        var _a;
    };
    /**
     * Helper Function to Init a Page
     *
     * @param name
     * @param payload
     */
    App.prototype.page = function (routeName) {
        var _this = this;
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        this.logger.group("Page", function (logger) {
            _this.pages.init(routeName, payload);
        }, false);
    };
    /**
     * Extend and get the vue Object
     *
     * @param obj
     */
    App.prototype.vue = function (obj) {
        if (obj === void 0) { obj = {}; }
        /**
         * if Plugins is set Append it to root plugin property
         */
        if (obj.hasOwnProperty('plugins')) {
            this.vueObject.plugins = obj.plugins.concat(this.vueObject.plugins);
            delete obj.plugins;
        }
        this.vueObject.mixins.push(obj);
    };
    /**
     * Subscribe on event listeners
     * @param name
     * @param callback
     */
    App.prototype.on = function (name, callback) {
        this.vueObject.events = Helpers_1.extend(this.vueObject.events, (_a = {},
            _a[name] = callback,
            _a
        ));
        var _a;
    };
    /**
     * Document Ready
     */
    App.prototype.ready = function () {
        var _this = this;
        return new Promise(function (resolve) { return document.addEventListener('DOMContentLoaded', function () {
            resolve(_this);
            _this.destruct();
        }); });
    };
    /**
     * Exposes Plugin globally
     * @param instance
     */
    App.prototype.exposes = function (instance) {
        /**
         * Register Globally Globaly
         */
        for (var name_3 in instance) {
            if (window.hasOwnProperty(name_3)) {
                this.logger.warn('You are overriding an already set object, caution it might lead to undesirable behavior', instance, name_3);
            }
            window[name_3] = instance[name_3];
        }
    };
    return App;
}());
/**
 * Register to the window object
 * @type {App}
 */
window['dreamsark'] = new App();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3QkFBcUIsV0FBVyxDQUFDLENBQUE7QUFDakMsdUJBQXFCLGtCQUFrQixDQUFDLENBQUE7QUFDeEMsdUJBQXFCLGtCQUFrQixDQUFDLENBQUE7QUFFeEM7O0dBRUc7QUFDSDtJQXdCSTtRQXJCTyxjQUFTLEdBQUc7WUFDZixNQUFNLEVBQUUsRUFBRTtZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRUssWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUViLFdBQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQ3RCLFdBQU0sR0FBRyxJQUFJLGVBQU0sQ0FDdEIsSUFBSSxDQUFDLE1BQU0sQ0FDZCxDQUFDO1FBRUY7O1dBRUc7UUFDSyxlQUFVLEdBQUc7WUFDakIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztZQUN6QyxLQUFLLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1NBQ3BDLENBQUM7UUFHRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ssdUJBQVMsR0FBakIsVUFBa0IsU0FBdUIsRUFBRSxVQUFhO1FBQXRDLHlCQUF1QixHQUF2QixnQkFBdUI7UUFFckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQUEsTUFBTTtZQUU1QjtnQkFFSTtvQkFFSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQUksRUFBRTt3QkFDZixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3RFLENBQUMsQ0FBQyxDQUFBOztnQkFKTixHQUFHLENBQUMsQ0FB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