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
        this.languageSwitcher();
    };
    Common.prototype.languageSwitcher = function () {
        if (this.is('login'))
            return;
        document.querySelector('#language-switcher')
            .addEventListener('change', function (e) {
            var form = document.createElement('form'), element = e.target;
            form.method = 'post';
            form.action = element.dataset['action'];
            form.appendChild(element);
            form.submit();
        });
    };
    /**
     * Initialize Dropdown
     */
    Common.prototype.dropdown = function () {
        var dropdown = document.querySelectorAll('.dropdown');
        for (var i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener('click', function (event) {
                this.classList.toggle('--show');
            });
        }
        window.onclick = function (event) {
            if (!event.target.matches('.dropdown__trigger')) {
                for (var i = 0; i < dropdown.length; i++) {
                    if (dropdown[i].classList.contains('--show')) {
                        dropdown[i].classList.remove('--show');
                    }
                }
            }
        };
    };
    return Common;
}(AbstractPage_1.AbstractPage));
exports.Common = Common;
//# sourceMappingURL=Common.js.map