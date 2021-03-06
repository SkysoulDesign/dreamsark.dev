"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Class Manager
 */
var Manager = (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        _super.call(this);
        this.onLoad = function () {
            // console.log('start Loading');
        };
        this.onError = function () {
            // console.log('failed loading');
        };
        this.onProgress = function () {
            // console.log('finished loading');
        };
    }
    Manager.prototype.boot = function (app) {
    };
    Manager.prototype.update = function (time, delta) {
    };
    return Manager;
}(THREE.LoadingManager));
exports.Manager = Manager;
//# sourceMappingURL=Manager.js.map