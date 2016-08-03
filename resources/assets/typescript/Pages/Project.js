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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb2plY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNkJBQTJCLDBCQUEwQixDQUFDLENBQUE7QUFFdEQ7O0dBRUc7QUFDSDtJQUE2QiwyQkFBWTtJQUF6QztRQUE2Qiw4QkFBWTtRQUU5QixXQUFNLEdBQUc7WUFDWixjQUFjO1lBQ2QscUJBQXFCO1NBQ3hCLENBQUE7SUFzREwsQ0FBQztJQXBERyxzQkFBSSxHQUFKLFVBQUssS0FBSztRQUVOLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBRWxCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkMsQ0FBQztJQUVMLENBQUM7SUFFRCxzQkFBSSxHQUFKO1FBQ0ksb0JBQW9CO0lBQ3hCLENBQUM7SUFFRCx5QkFBTyxHQUFQO1FBQ0ksb0JBQW9CO0lBQ3hCLENBQUM7SUFFRCx3QkFBTSxHQUFOO1FBQ0ksb0JBQW9CO0lBQ3hCLENBQUM7SUFFRCx3QkFBTSxHQUFOO1FBQ0ksb0JBQW9CO0lBQ3hCLENBQUM7SUFFRCw4QkFBWSxHQUFaO0lBRUEsQ0FBQztJQUVELHNCQUFJLEdBQUo7UUFDSSxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0lBRUQsMEJBQVEsR0FBUixVQUFTLENBQVksRUFBRSxPQUFtQjtRQUN0Qyx5QkFBeUI7SUFDN0IsQ0FBQztJQUVELDJCQUFTLEdBQVQ7UUFFSSxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9DLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNmLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFVBQVUsRUFBRSxTQUFTO1NBQ3hCLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FBQyxBQTNERCxDQUE2QiwyQkFBWSxHQTJEeEM7QUEzRFksZUFBTyxVQTJEbkIsQ0FBQSJ9