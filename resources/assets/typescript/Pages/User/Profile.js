"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractPage_1 = require("../../Abstract/AbstractPage");
/**
 * Profile Class
 */
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        _super.apply(this, arguments);
        this.routes = [
            'user.profile.create'
        ];
    }
    Profile.prototype.boot = function (profileRoute) {
        this.initProfileSelection(profileRoute);
        this.initThreeJs();
        /**
         * initialize the position with the first element
         */
        this.app.on('animation.started', function (id, position) {
            this.$set('position', document.querySelector("[data-profile-name=\"" + position + "\"]").dataset['localizedName']);
        });
        this.app.vue({
            data: {
                position: null
            }
        });
    };
    Profile.prototype.initProfileSelection = function (profileRoute) {
        var _this = this;
        /**
         * Handle The Display of The Profile Selection
         *
         * @type {Element}
         */
        var button = document.querySelector('#selectProfile');
        button.addEventListener('click', function (e) {
            var request = _this.app.vueInstance.$http.get('http:' + profileRoute, {
                params: {
                    profile: _this.app.vueInstance.position
                }
            });
            request.then(function (response) {
                var form = document.querySelector('form'), container = document.querySelector('#wrapper'), formContainer = form.querySelector('#form-container'), header = document.querySelector('.profile-page__header');
                header.classList.add('--extended');
                form.classList.remove('+hidden');
                var profile_input = document.createElement('input');
                profile_input.setAttribute('name', 'profile_id');
                profile_input.setAttribute('type', 'hidden');
                response.json().forEach(function (item, index) {
                    var h3 = document.createElement('h3');
                    h3.classList.add('small-12', 'columns', 'form__step');
                    h3.innerHTML = "<span>" + (index + 1) + "</span>" + item.question;
                    var field = document.createElement('div');
                    field.classList.add('small-12', 'columns', 'form__field');
                    var input = document.createElement('input');
                    input.setAttribute('type', item.type.name);
                    input.setAttribute('name', 'question_' + item.id);
                    input.setAttribute('placeholder', item.question);
                    profile_input.setAttribute('value', item.pivot.profile_id);
                    field.appendChild(input);
                    formContainer.appendChild(h3);
                    formContainer.appendChild(field);
                });
                formContainer.appendChild(profile_input);
                for (var i = 1; i < container.childElementCount; i++) {
                    var child = container.children.item(i);
                    child.style.display = 'none';
                }
            });
        });
    };
    Profile.prototype.initThreeJs = function () {
        // let animation = this.app.plugin('profile', '#canvas');
        //     animation.start('project');
        /**
         * Binding Vue
         */
        // this.app.vue({
        //     el: '#vueRoot',
        //     data: function () {
        //         return {
        //             position: 'Designer'
        //         }
        //     },
        //     methods: {
        //         selectProfile: function (e:MouseEvent) {
        //
        //             let element = <HTMLElement>e.toElement;
        //
        //             if (element.className === 'project-page__palette__item') {
        //
        //                 console.log(`Selected Character: ${element.dataset['position']}`);
        //                 this.position = element.dataset['position'];
        //
        //             }
        //
        //         }
        //     }
        // });
    };
    return Profile;
}(AbstractPage_1.AbstractPage));
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map