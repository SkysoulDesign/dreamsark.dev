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
            template: require('html!../templates/social-login/social-login.html'),
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
            template: require('html!../templates/social-login/wechat.html'),
            methods: {
                login: function () {
                    this.$parent.redirect('weixin');
                }
            }
        });
        vue.component('ark-qq', {
            template: require('html!../templates/social-login/qq.html'),
            methods: {
                login: function () {
                    this.$parent.redirect('qq');
                }
            }
        });
        vue.component('ark-weibo', {
            template: require('html!../templates/social-login/weibo.html'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29jaWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU29jaWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTs7R0FFRztBQUNIO0lBQUE7SUFrRUEsQ0FBQztJQWhFRyx5QkFBUSxHQUFSLFVBQVMsR0FBRyxFQUFFLEdBQUc7UUFFYixHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ0osT0FBTyxFQUFFO2dCQUNMLE9BQU8sQ0FBQyxjQUFjLENBQUM7YUFDMUI7U0FDSixDQUFDLENBQUE7UUFFRixHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTtZQUV4QixRQUFRLEVBQUUsT0FBTyxDQUFDLGtEQUFrRCxDQUFDO1lBRXJFLEtBQUssRUFBRTtnQkFDSCxHQUFHLEVBQUU7b0JBQ0QsSUFBSSxFQUFFLE1BQU07b0JBQ1osUUFBUSxFQUFFLElBQUk7aUJBQ2pCO2FBQ0o7WUFFRCxPQUFPLEVBQUU7Z0JBQ0wsUUFBUSxZQUFDLFFBQVE7b0JBRWIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDckMsYUFBYSxFQUFFLFFBQVE7cUJBQzFCLENBQUMsQ0FBQTtvQkFFRixRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFyQyxDQUFxQyxFQUFFLFVBQUEsUUFBUTt3QkFDckUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7b0JBQzlCLENBQUMsQ0FBQyxDQUFBO2dCQUVOLENBQUM7YUFDSjtTQUVKLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQ3hCLFFBQVEsRUFBRSxPQUFPLENBQUMsNENBQTRDLENBQUM7WUFDL0QsT0FBTyxFQUFFO2dCQUNMLEtBQUs7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7YUFDSjtTQUNKLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsd0NBQXdDLENBQUM7WUFDM0QsT0FBTyxFQUFFO2dCQUNMLEtBQUs7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7YUFDSjtTQUNKLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQ3ZCLFFBQVEsRUFBRSxPQUFPLENBQUMsMkNBQTJDLENBQUM7WUFDOUQsT0FBTyxFQUFFO2dCQUNMLEtBQUs7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTCxhQUFDO0FBQUQsQ0FBQyxBQWxFRCxJQWtFQztBQWxFWSxjQUFNLFNBa0VsQixDQUFBIn0=