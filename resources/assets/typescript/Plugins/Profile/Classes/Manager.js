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
    function Manager(app) {
        _super.call(this, app);
        console.log(this);
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
    return Manager;
}(THREE.LoadingManager));
exports.Manager = Manager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0dBRUc7QUFDSDtJQUE2QiwyQkFBb0I7SUFLN0MsaUJBQVksR0FBRztRQUVYLGtCQUFNLEdBQUcsQ0FBQyxDQUFBO1FBRVYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsQixJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsZ0NBQWdDO1FBQ3BDLENBQUMsQ0FBQTtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxpQ0FBaUM7UUFDckMsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNkLG1DQUFtQztRQUN2QyxDQUFDLENBQUE7SUFFTCxDQUFDO0lBckJELHNCQUFJLEdBQUosVUFBSyxHQUFHO0lBQ1IsQ0FBQztJQXNCTCxjQUFDO0FBQUQsQ0FBQyxBQXpCRCxDQUE2QixLQUFLLENBQUMsY0FBYyxHQXlCaEQ7QUF6QlksZUFBTyxVQXlCbkIsQ0FBQSJ9