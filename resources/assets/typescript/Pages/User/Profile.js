"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractPage_1 = require("../../Abstract/AbstractPage");
/**
 * Profile
 */
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        _super.apply(this, arguments);
        this.routes = [
            'user.profile.create'
        ];
    }
    Profile.prototype.boot = function () {
        this.noIdeaWhatsIsIt();
        this.initThreeJs();
    };
    Profile.prototype.noIdeaWhatsIsIt = function () {
        /**
         * Handle The Display of The Profile Selection
         *
         * @type {Element}
         */
        var button = document.querySelector('#selectProfile');
        button.addEventListener('click', function () {
            var container = document.querySelector('#wrapper');
            for (var i = 1; i < container.childElementCount; i++) {
                var child = container.children.item(i);
                child.style.display = 'none';
            }
            var form = document.querySelector('form');
            form.classList.remove('+hidden');
        });
    };
    Profile.prototype.initThreeJs = function () {
        var animation = this.app.plugin('profile');
        /**
         * Binding Vue
         */
        this.app.ready().then(function (app) {
            animation.composition('main');
            animation.start();
            app.vue({
                el: '.--profile-pick',
                data: function () {
                    return {
                        position: 'Designer'
                    };
                },
                methods: {
                    selectProfile: function (e) {
                        var element = e.toElement;
                        if (element.className === 'project-page__palette__item') {
                            console.log("Selected Character: " + element.dataset['position']);
                            this.position = element.dataset['position'];
                        }
                    }
                }
            });
        });
    };
    return Profile;
}(AbstractPage_1.AbstractPage));
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map