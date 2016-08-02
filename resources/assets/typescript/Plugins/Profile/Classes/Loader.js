"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Helpers_1 = require("../../Helpers");
/**
 * Loaders
 */
require('../../../../../../node_modules/three/examples/js/loaders/FBXLoader');
/**
 * Loader Class
 */
var Loader = (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        _super.apply(this, arguments);
        this.loaded = {};
        this.queue = [];
        this.working = false;
    }
    Loader.prototype.boot = function (app) {
        // this.fbx = new THREE.FBXLoader(app.manager);
        this.json = new THREE.JSONLoader(app.manager);
        this.anim = new THREE.XHRLoader(app.manager);
        var imageLoader = new THREE.TextureLoader(app.manager);
        this.png = imageLoader;
        this.jpg = imageLoader;
    };
    Loader.prototype.load = function (path, callback) {
        var loader = Helpers_1.extension(path);
        if (!this.hasOwnProperty(loader)) {
            return window['dreamsark'].logger.error("Unknown loader:", loader);
        }
        this.queue.push({
            loader: loader, path: path, callback: callback
        });
    };
    Loader.prototype.process = function () {
        var _this = this;
        if (this.working || this.queue.length < 1)
            return;
        this.working = true;
        var item = this.queue.shift();
        if (this.loaded.hasOwnProperty(item.path)) {
            item.callback(this.loaded[item.path].object, this.loaded[item.path].material);
            window['dreamsark'].logger.info('Item already in cache, loading it instead.', item.path);
            return this.working = false;
        }
        this[item.loader].load(item.path, function (object, material) {
            /**
             * Parse Json if loader is anim
             */
            if (item.loader === 'anim') {
                object = JSON.parse(object);
            }
            /**
             * Store an instance on memory
             * @type {{object: any, material: any}}
             */
            _this.loaded[item.path] = {
                object: object, material: material
            };
            item.callback(object, material);
            _this.working = false;
        }, function () {
        }, function (error) {
            // this.queue.push(item);
            _this.working = false;
        });
    };
    return Loader;
}(Components_1.Components));
exports.Loader = Loader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUF5Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ2xELHdCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUV4Qzs7R0FFRztBQUNILE9BQU8sQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO0FBRTlFOztHQUVHO0FBQ0g7SUFBNEIsMEJBQVU7SUFBdEM7UUFBNEIsOEJBQVU7UUFRM0IsV0FBTSxHQUFPLEVBQUUsQ0FBQztRQUNmLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxZQUFPLEdBQUcsS0FBSyxDQUFDO0lBNkU1QixDQUFDO0lBM0VHLHFCQUFJLEdBQUosVUFBSyxHQUFHO1FBQ0osK0NBQStDO1FBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFNUMsSUFBSSxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQztJQUUzQixDQUFDO0lBRUQscUJBQUksR0FBSixVQUFLLElBQVcsRUFBRSxRQUFpQjtRQUUvQixJQUFJLE1BQU0sR0FBRyxtQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNaLFFBQUEsTUFBTSxFQUFFLE1BQUEsSUFBSSxFQUFFLFVBQUEsUUFBUTtTQUN6QixDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQsd0JBQU8sR0FBUDtRQUFBLGlCQStDQztRQTdDRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUM7UUFFWCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUVwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEMsSUFBSSxDQUFDLFFBQVEsQ0FDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUNqRSxDQUFBO1lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNENBQTRDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFDLE1BQU0sRUFBRSxRQUFRO1lBRS9DOztlQUVHO1lBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMvQixDQUFDO1lBRUQ7OztlQUdHO1lBQ0gsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQ3JCLFFBQUEsTUFBTSxFQUFFLFVBQUEsUUFBUTthQUNuQixDQUFDO1lBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFaEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFekIsQ0FBQyxFQUFFO1FBQ0gsQ0FBQyxFQUFFLFVBQUMsS0FBSztZQUNMLHlCQUF5QjtZQUN6QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTCxhQUFDO0FBQUQsQ0FBQyxBQXZGRCxDQUE0Qix1QkFBVSxHQXVGckM7QUF2RlksY0FBTSxTQXVGbEIsQ0FBQSJ9