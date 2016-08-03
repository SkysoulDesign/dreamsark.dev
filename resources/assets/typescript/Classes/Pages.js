"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Helpers_1 = require("../Helpers");
var Aplication_1 = require("../Abstract/Aplication");
var Vue = require('vue');
/**
 * Components
 */
var Pages = (function (_super) {
    __extends(Pages, _super);
    function Pages(app) {
        var _this = this;
        _super.call(this, app);
        /**
         * List of Loaded Classes
         */
        this.collection = [
            require('../Pages/Common'),
            require('../Pages/Test'),
            require('../Pages/Purchase'),
            require('../Pages/User/Profile'),
            require('../Pages/Project'),
        ];
        /**
         * Initialized Objects
         */
        this.initialized = {};
        this.currentRoute = null;
        /**
         * Routes Mapping
         */
        this.routes = {};
        this.except = {};
        this.collection.forEach(function (page) {
            var _loop_1 = function(name_1) {
                var object = _this.initialize(name_1, page[name_1]);
                if (object.hasOwnProperty('routes')) {
                    object.routes.forEach(function (route) { return _this.setRoute(route, name_1); });
                }
                if (object.hasOwnProperty('except')) {
                    object.except.forEach(function (route) { return _this.setException(route, name_1); });
                }
            };
            for (var name_1 in page) {
                _loop_1(name_1);
            }
        });
    }
    /**
     * Initialize Object
     *
     * @param app
     * @param name
     * @param object
     * @returns {any}
     */
    Pages.prototype.initialize = function (name, object) {
        return this.initialized[name] = new object(this.app);
    };
    /**
     * Init
     * @param string routeName
     */
    Pages.prototype.init = function (routeName, payload) {
        this.app.logger.info("Current Route", routeName);
        var route = this.currentRoute = Helpers_1.toCamelCase(routeName);
        if (!this.routes.hasOwnProperty(route)) {
            this.app.logger.info('The current route has no listeners', routeName);
            /**
             * If there is no class listening to this request then only
             * run the common classes That has been set to listen to all {*}
             */
            this.create(this.routes['all'], payload);
            return this.start();
        }
        this.create(this.routes['all'].concat(this.routes[route]), payload);
        this.start();
    };
    /**
     * Start Vue Js
     */
    Pages.prototype.start = function () {
        var _this = this;
        this.app.logger.info('Initializing Vue.js');
        /**
         * Binding Vue
         */
        this.app.ready().then(function (app) {
            var defaults = {
                el: '#app-root',
            };
            /**
             * Plugins
             */
            var obj = _this.initPlugins(app.vueObject);
            var vue = new Vue(Helpers_1.extend(defaults, obj));
            app.vueInstance = vue;
        });
    };
    /**
     * Init Plugins
     * @param plugins
     */
    Pages.prototype.initPlugins = function (obj) {
        var _this = this;
        if (obj.hasOwnProperty('plugins'))
            Helpers_1.popByKey(obj, 'plugins', []).forEach(function (Plugin) {
                if (Plugin instanceof Function)
                    return Vue.use(Plugin);
                _this.app.logger.error('Invalid Plugin', Plugin);
            });
        return obj;
    };
    /**
     * Bootstrap All the Routes
     *
     * @param routes
     */
    Pages.prototype.create = function (routes, payload) {
        var _this = this;
        if (routes instanceof Array)
            return routes.forEach(function (name) {
                var currentRoute = _this.currentRoute;
                /**
                 * If page explicit exclude an route, then return before calling boot on it
                 */
                if (_this.except.hasOwnProperty(currentRoute)
                    && _this.except[currentRoute].includes(name)) {
                    return;
                }
                _this.initialized[name].route = currentRoute;
                (_a = _this.initialized[name]).boot.apply(_a, payload);
                var _a;
            });
        this.app.logger.error('The Current route doesn\'t contain any bootable instances.');
    };
    /**
     * Merge Routes
     * @param key
     * @param routes
     * @returns string[]
     */
    Pages.prototype.mergeRoutes = function (routes, route, value) {
        if (routes.hasOwnProperty(route)) {
            return routes[route].concat(value);
        }
        return [value];
    };
    /**
     * Set or Merge Route
     *
     * @param string route
     * @param string element
     */
    Pages.prototype.setRoute = function (route, element) {
        route = route === '*' ? 'all' : route;
        var key = Helpers_1.toCamelCase(route);
        this.routes[key] = this.mergeRoutes(this.routes, key, element);
    };
    /**
     * Set or Merge Route
     *
     * @param string route
     * @param string element
     */
    Pages.prototype.setException = function (route, element) {
        var key = Helpers_1.toCamelCase(route);
        this.except[key] = this.mergeRoutes(this.except, key, element);
    };
    return Pages;
}(Aplication_1.Application));
exports.Pages = Pages;
//# sourceMappingURL=Pages.js.map