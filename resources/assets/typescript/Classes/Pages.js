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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQYWdlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3QkFBNEMsWUFBWSxDQUFDLENBQUE7QUFDekQsMkJBQTBCLHdCQUF3QixDQUFDLENBQUE7QUFDbkQsSUFBTyxHQUFHLFdBQVcsS0FBSyxDQUFDLENBQUM7QUFHNUI7O0dBRUc7QUFDSDtJQUEyQix5QkFBVztJQXlCbEMsZUFBWSxHQUFHO1FBekJuQixpQkFxT0M7UUExTU8sa0JBQU0sR0FBRyxDQUFDLENBQUM7UUF6QmY7O1dBRUc7UUFDSSxlQUFVLEdBQUc7WUFDaEIsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1lBQzFCLE9BQU8sQ0FBQyxlQUFlLENBQUM7WUFDeEIsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1lBQzVCLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztZQUNoQyxPQUFPLENBQUMsa0JBQWtCLENBQUM7U0FDOUIsQ0FBQTtRQUVEOztXQUVHO1FBQ0ssZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFNUI7O1dBRUc7UUFDSyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osV0FBTSxHQUFHLEVBQUUsQ0FBQztRQU1oQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFFeEI7Z0JBRUksSUFBSSxNQUFNLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFJLEVBQUUsSUFBSSxDQUFDLE1BQUksQ0FBQyxDQUFDLENBQUM7Z0JBRS9DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQUksQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7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