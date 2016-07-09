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
        ];
        /**
         * Initialized Objects
         */
        this.initialized = {};
        /**
         * Routes Mapping
         */
        this.routes = {};
        this.collection.forEach(function (page) {
            var _loop_1 = function(name_1) {
                var object = _this.initialize(name_1, page[name_1]);
                if (object.hasOwnProperty('routes')) {
                    object.routes.forEach(function (route) { return _this.setRoute(route, name_1); });
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
     * @param name
     * @param object
     * @returns {any}
     */
    Pages.prototype.initialize = function (name, object) {
        return this.initialized[name] = new object;
    };
    /**
     * Init
     * @param string routeName
     */
    Pages.prototype.init = function (routeName) {
        this.app.logger.info("Current Route", routeName);
        var route = Helpers_1.toCamelCase(routeName);
        if (!this.routes.hasOwnProperty(route)) {
            this.app.logger.info('The current route has no listeners', routeName);
            /**
             * If there is no class listening to this request then only
             * run the common classes That has been set to listen to all {*}
             */
            this.create(this.routes['all']);
            return this.start();
        }
        this.create(this.routes['all'].concat(this.routes[route]));
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
            var obj = _this.initPlugins(app.vue());
            new Vue(Helpers_1.extend(defaults, obj));
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
    Pages.prototype.create = function (routes) {
        var _this = this;
        if (routes instanceof Array)
            return routes.forEach(function (name) { return _this.initialized[name].boot(_this.app); });
        this.app.logger.error('The Current route doesn\'t contain any bootable instances.');
    };
    /**
     * Merge Routes
     * @param key
     * @param routes
     * @returns string[]
     */
    Pages.prototype.mergeRoutes = function (route, value) {
        if (this.routes.hasOwnProperty(route)) {
            return this.routes[route].concat(value);
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
        this.routes[key] = this.mergeRoutes(key, element);
    };
    return Pages;
}(Aplication_1.Application));
exports.Pages = Pages;
//# sourceMappingURL=Pages.js.map