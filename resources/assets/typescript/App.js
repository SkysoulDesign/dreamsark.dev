"use strict";
var Helpers_1 = require("./Helpers");
var Promise = require('bluebird');
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
        this.bootstrap(this, Helpers_1.requireAll(require.context("./Classes", false, /\.js$/)));
    }
    /**
     * Bootstrap all classes
     */
    App.prototype.bootstrap = function (container, components) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var collection = [], parameters = params.length ? params : [container];
        for (var component in components) {
            for (var name_1 in components[component]) {
                var instance = new ((_a = components[component][name_1]).bind.apply(_a, [void 0].concat(parameters)))();
                collection.push(instance);
                container[name_1.toLowerCase()] = instance;
            }
        }
        collection.forEach(function (component) {
            component.boot.apply(component, parameters);
        });
        return collection;
        var _a;
    };
    /**
     * Install Plugins
     * @param plugin
     */
    App.prototype.install = function (plugins) {
        for (var name_2 in plugins) {
            this.plugins[name_2.toLowerCase()] = plugins[name_2];
        }
    };
    /**
     * Get Plugin
     *
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
            return this.plugins[name];
        }
        console.log("Plugin { " + name + " } not found. did you install it already?");
        var _a;
    };
    /**
     * Helper Function to Init a Page
     *
     * @param name
     * @param payload
     */
    App.prototype.page = function (routeName) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        this.pages.init(routeName, payload);
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
     *
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
                console.log('You are overriding an already set object, caution it might lead to undesirable behavior', instance, name_3);
            }
            window[name_3] = instance[name_3];
        }
    };
    return App;
}());
exports.App = App;
/**
 * Register to the window object
 */
window['dreamsark'] = new App();
//# sourceMappingURL=App.js.map