"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Helpers_1 = require("../../../Helpers");
/**
 * Compositions Class
 */
var Compositions = (function (_super) {
    __extends(Compositions, _super);
    function Compositions() {
        _super.apply(this, arguments);
        this.compositions = Helpers_1.requireAll(require.context("../Compositions", true, /\.js$/));
        // private compositions = {
        //     main: require('../Compositions/Main'),
        //     project: require('../Compositions/Project')
        // };
        this.initialized = {};
        this.active = null;
    }
    Compositions.prototype.boot = function (app) {
        window['dreamsark'].bootstrap(this.initialized, this.compositions);
    };
    /**
     *
     * @param name
     * @returns {any}
     */
    Compositions.prototype.get = function (name) {
        for (var index in this.initialized) {
            if (this.initialized[index].constructor.name.toLowerCase() === name) {
                return this.initialized[index];
            }
        }
        console.log("There is no composition called: " + name);
    };
    Compositions.prototype.start = function (compositionName, payload) {
        var _this = this;
        var composition = this.get(compositionName);
        /**
         * if no composition, abort
         */
        if (!composition)
            return;
        /**
         * Setup The scene
         */
        composition.setup.apply(composition, [this.app].concat(payload));
        var objects = {}, objectList = composition.objects(), callback = function () {
            composition.stage(_this.app.scene, _this.app.camera, objects);
            /**
             * Set Active Composition after Loading every object
             * @type {any}
             */
            _this.active = {
                objects: objects,
                composition: composition
            };
        };
        if (!objectList)
            return callback();
        var counter = 0;
        objectList.forEach(function (name) {
            _this.app.objects.get(name).then(function (object) {
                objects[name] = object;
                counter++;
                if (objectList.length === counter) {
                    callback();
                }
            });
        });
    };
    Compositions.prototype.update = function (time, delta) {
        if (!this.active)
            return;
        this.active.composition.update(this.app.scene, this.app.camera, this.active.objects, time, delta);
    };
    return Compositions;
}(Components_1.Components));
exports.Compositions = Compositions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9zaXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29tcG9zaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUF5Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ2xELHdCQUF5QixrQkFBa0IsQ0FBQyxDQUFBO0FBRTVDOztHQUVHO0FBQ0g7SUFBa0MsZ0NBQVU7SUFBNUM7UUFBa0MsOEJBQVU7UUFFaEMsaUJBQVksR0FBRyxvQkFBVSxDQUM3QixPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FDcEQsQ0FBQztRQUVGLDJCQUEyQjtRQUMzQiw2Q0FBNkM7UUFDN0Msa0RBQWtEO1FBQ2xELEtBQUs7UUFFRyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixXQUFNLEdBQUcsSUFBSSxDQUFDO0lBZ0cxQixDQUFDO0lBOUZHLDJCQUFJLEdBQUosVUFBSyxHQUFHO1FBRUosTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FDekIsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUN0QyxDQUFBO0lBRUwsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwwQkFBRyxHQUFILFVBQUksSUFBSTtRQUVKLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQW1DLElBQU0sQ0FBQyxDQUFDO0lBRTNELENBQUM7SUFFRCw0QkFBSyxHQUFMLFVBQU0sZUFBc0IsRUFBRSxPQUFPO1FBQXJDLGlCQXdEQztRQXRERyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUN0QixlQUFlLENBQ2xCLENBQUE7UUFFRDs7V0FFRztRQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ2IsTUFBTSxDQUFDO1FBRVg7O1dBRUc7UUFDSCxXQUFXLENBQUMsS0FBSyxPQUFqQixXQUFXLEdBQU8sSUFBSSxDQUFDLEdBQUcsU0FBSyxPQUFPLEVBQUMsQ0FBQztRQUV4QyxJQUFJLE9BQU8sR0FBRyxFQUFFLEVBQ1osVUFBVSxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFDbEMsUUFBUSxHQUFHO1lBRVAsV0FBVyxDQUFDLEtBQUssQ0FDYixLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQzNDLENBQUM7WUFFRjs7O2VBR0c7WUFDSCxLQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixXQUFXLEVBQUUsV0FBVzthQUMzQixDQUFDO1FBRU4sQ0FBQyxDQUFDO1FBRU4sRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDWixNQUFNLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFckIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBRW5CLEtBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUVsQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQztnQkFFVixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLFFBQVEsRUFBRSxDQUFBO2dCQUNkLENBQUM7WUFFTCxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBTyxJQUFJLEVBQUUsS0FBSztRQUVkLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNiLE1BQU0sQ0FBQztRQUVYLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FDcEUsQ0FBQztJQUVOLENBQUM7SUFFTCxtQkFBQztBQUFELENBQUMsQUE1R0QsQ0FBa0MsdUJBQVUsR0E0RzNDO0FBNUdZLG9CQUFZLGVBNEd4QixDQUFBIn0=