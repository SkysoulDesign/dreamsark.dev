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
            for (var component in components)
                container[component].boot(container);
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
//# sourceMappingURL=App.js.map