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
            var request = _this.app.vueInstance.$http.get(profileRoute, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkJBQTJCLDZCQUE2QixDQUFDLENBQUE7QUFFekQ7O0dBRUc7QUFDSDtJQUE2QiwyQkFBWTtJQUF6QztRQUE2Qiw4QkFBWTtRQUU5QixXQUFNLEdBQUc7WUFDWixxQkFBcUI7U0FDeEIsQ0FBQTtJQThITCxDQUFDO0lBNUhHLHNCQUFJLEdBQUosVUFBSyxZQUFZO1FBRWIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQjs7V0FFRztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxFQUFFLFFBQVE7WUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQ2hCLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQXVCLFFBQVEsUUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUN2RixDQUFBO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNULElBQUksRUFBRTtnQkFDRixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRCxzQ0FBb0IsR0FBcEIsVUFBcUIsWUFBWTtRQUFqQyxpQkFpRUM7UUEvREc7Ozs7V0FJRztRQUNILElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV0RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUEsQ0FBQztZQUU5QixJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTtnQkFDdkQsTUFBTSxF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