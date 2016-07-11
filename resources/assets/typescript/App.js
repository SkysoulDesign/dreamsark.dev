"use strict";
var Helpers_1 = require("./Helpers");
var Logger_1 = require("./Classes/Logger");
var Config_1 = require("./Classes/Config");
/**
 * Application
 */
var App = (function () {
    function App() {
        this.vueObject = {};
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
    App.prototype.install = function (plugin) {
        var _this = this;
        this.logger.group("Plugin: " + plugin.name, function (logger) {
            _this.plugins[plugin.name.toLowerCase()] = new plugin(_this);
        }, false);
    };
    /**
     * Get Plugin
     * @param name
     * @returns {any}
     */
    App.prototype.plugin = function (name) {
        name = name.toLowerCase();
        if (this.plugins.hasOwnProperty(name)) {
            return this.plugins[name];
        }
        this.logger.error("Plugin { " + name + " } not found. did you install it already?");
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
     * @returns {{}}
     */
    App.prototype.vue = function (obj) {
        if (obj === void 0) { obj = {}; }
        if (obj.hasOwnProperty('ready')) {
            console.log('todo: better merge the ready property on vue-js');
        }
        return this.vueObject = Helpers_1.extend(this.vueObject, obj);
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
    return App;
}());
/**
 * Register to the window object
 * @type {App}
 */
exports.app = new App();
global.app = exports.app;
//# sourceMappingURL=App.js.map