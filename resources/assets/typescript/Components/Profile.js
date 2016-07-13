"use strict";
/**
 * Profiles Component
 */
var Profile = (function () {
    function Profile() {
    }
    Profile.prototype.register = function (vue, app) {
        vue.component('ark-profile', {
            template: require('../templates/profile/profile.html'),
            props: {
                character: String,
            }
        });
    };
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map