import {AbstractPage} from "../Abstract/AbstractPage";
import {AlipayInterface, PaymentInterface, UnionPayInterface, WechatInterface} from "../Interfaces/PaymentInterface";

/**
 * Profile
 */
export class Purchase extends AbstractPage {

    public routes = [
        'user.purchase.index'
    ]

    boot(app) {

        app.vue({
            plugins: [
                require('vue-resource')
            ],
            methods: {
                alipay: function (response:AlipayInterface) {
                    this.submitForm(response)
                },
                unionPay: function (response:UnionPayInterface) {
                    this.submitForm(response)
                },
                weChat: function (response:WechatInterface) {
                },

                /**
                 * Handlers
                 * @param r
                 */
                success: function (r) {

                    let response = <PaymentInterface>r.json();

                    app.logger.group(`Gateway: ${response.gateway}`, logger => {
                        logger.dir(response, response, response)
                    })

                    this[response.gateway](response);

                },
                error: function (response) {
                    console.dir(response)
                },

                /**
                 * Submit form to the vendor
                 * @param response
                 */
                submitForm: function (response:PaymentInterface) {

                    let form = document.createElement('form');

                    /**
                     * Build Data
                     */
                    for (let name in response.data) {

                        let input = document.createElement('input');
                            input.name = name;
                            input.setAttribute('value', response.data[name]);

                        form.appendChild(input);

                    }

                    /**
                     * Fix for Firefox
                     */
                    if (navigator.userAgent.includes('Firefox')){
                        document.body.appendChild(form);
                    }

                    form.action = response.target;
                    form.method = response.method;
                    form.submit();

                }
            },

            ready(){

                let form = <HTMLFormElement>document.querySelector('form');
                    form.addEventListener('submit', (event:Event) => {

                        event.preventDefault();

                        let response = this.$http.post(
                            form.action, new FormData(form)
                        )

                        response.then(this.success, this.error);

                    })

            }
        })

    }

}
