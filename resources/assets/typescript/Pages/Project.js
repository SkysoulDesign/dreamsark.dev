"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractPage_1 = require("../Abstract/AbstractPage");
/**
 * Project
 */
var Project = (function (_super) {
    __extends(Project, _super);
    function Project() {
        _super.apply(this, arguments);
        this.routes = [
            'project.show',
            'user.project.create'
        ];
    }
    Project.prototype.boot = function (stage) {
        if (stage)
            this[stage]();
        if (this.only('user.project.create')) {
        }
    };
    Project.prototype.idea = function () {
        // this.initChart();
    };
    Project.prototype.synapse = function () {
        // this.initChart();
    };
    Project.prototype.script = function () {
        // this.initChart();
    };
    Project.prototype.review = function () {
        // this.initChart();
    };
    Project.prototype.distribution = function () {
    };
    Project.prototype.fund = function () {
        // this.initChart();
        this.app.on('nav.tab-crew.click', this.initCrew.bind(this));
    };
    Project.prototype.initCrew = function (e, element) {
        // console.log(animation)
    };
    Project.prototype.initChart = function () {
        var element = document.querySelector('.chart');
        new Chart(element, {
            easing: 'easeOutBounce',
            barColor: '#5eb404',
            trackColor: '#e3e3e3',
        });
    };
    return Project;
}(AbstractPage_1.AbstractPage));
exports.Project = Project;
//# sourceMappingURL=Project.js.map