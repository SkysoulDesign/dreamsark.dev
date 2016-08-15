"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractPage_1 = require("../Abstract/AbstractPage");
/**
 * Common Page
 */
var Common = (function (_super) {
    __extends(Common, _super);
    function Common() {
        _super.apply(this, arguments);
        this.routes = ['*'];
    }
    Common.prototype.boot = function () {
        this.app.logger.info('This class {Common} will run on every request');
        this.dropdown();
        // this.languageSwitcher();
        var divs = document.querySelectorAll('.under-construction');
        [].forEach.call(divs, function (div) {
            div.addEventListener('click', function () {
                alert('功能即将开放敬请期待');
            });
        });
    };
    Common.prototype.languageSwitcher = function () {
        if (this.is(['login', 'register', 'admin.*', 'committee.*'])) {
            return;
        }
        // document.querySelector('#language-switcher')
        //     .addEventListener('change', (e:MouseEvent) => {
        //
        //         let form = document.createElement('form'),
        //             element = <HTMLSelectElement>e.target;
        //
        //         form.method = 'post';
        //         form.action = element.dataset['action'];
        //         form.appendChild(element);
        //
        //         submitForm(form)
        // })
    };
    /**
     * Initialize Dropdown
     */
    Common.prototype.dropdown = function () {
    };
    return Common;
}(AbstractPage_1.AbstractPage));
exports.Common = Common;
//# sourceMappingURL=Common.js.map