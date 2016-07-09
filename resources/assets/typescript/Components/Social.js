"use strict";
/**
 * Form Component
 */
var Social = (function () {
    function Social() {
    }
    Social.prototype.register = function (vue, app) {
        app.vue({
            plugins: [
                require('vue-resource')
            ]
        });
        vue.component('ark-social', {
            template: require('../templates/social-login/social-login.html'),
            props: {
                url: {
                    type: String,
                    required: true,
                }
            },
            methods: {
                redirect: function (provider) {
                    var response = this.$http.post(this.url, {
                        login_through: provider
                    });
                    response.then(function (response) { return window.location = response.json().url; }, function (response) {
                        app.logger.error(response);
                    });
                }
            }
        });
        vue.component('ark-wechat', {
            template: require('../templates/social-login/wechat.html'),
            methods: {
                login: function () {
                    this.$parent.redirect('weixin');
                }
            }
        });
        vue.component('ark-qq', {
            template: require('../templates/social-login/qq.html'),
            methods: {
                login: function () {
                    this.$parent.redirect('qq');
                }
            }
        });
        vue.component('ark-weibo', {
            template: require('../templates/social-login/weibo.html'),
            methods: {
                login: function () {
                    this.$parent.redirect('weibo');
                }
            }
        });
    };
    return Social;
}());
exports.Social = Social;
//# sourceMappingURL=Social.js.map