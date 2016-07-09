import {ComponentInterface} from "../Interfaces/ComponentInterface";

/**
 * Form Component
 */
export class Social implements ComponentInterface {

    register(vue, app) {

        app.vue({
            plugins: [
                require('vue-resource')
            ]
        })

        vue.component('ark-social', {

            template: require('../templates/social-login/social-login.html'),

            props: {
                url: {
                    type: String,
                    required: true,
                }
            },

            methods: {
                redirect(provider){

                    let response = this.$http.post(this.url, {
                        login_through: provider
                    })

                    response.then(response => window.location = response.json().url, response => {
                        app.logger.error(response)
                    })

                }
            }

        });

        vue.component('ark-wechat', {
            template: require('../templates/social-login/wechat.html'),
            methods: {
                login(){
                    this.$parent.redirect('weixin');
                }
            }
        });

        vue.component('ark-qq', {
            template: require('../templates/social-login/qq.html'),
            methods: {
                login(){
                    this.$parent.redirect('qq');
                }
            }
        });

        vue.component('ark-weibo', {
            template: require('../templates/social-login/weibo.html'),
            methods: {
                login(){
                    this.$parent.redirect('weibo');
                }
            }
        });

    }

}

