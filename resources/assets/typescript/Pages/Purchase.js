"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractPage_1 = require("../Abstract/AbstractPage");
var Helpers_1 = require("../Helpers");
/**
 * Profile
 */
var Purchase = (function (_super) {
    __extends(Purchase, _super);
    function Purchase() {
        _super.apply(this, arguments);
        this.routes = [
            'user.purchase.index'
        ];
    }
    Purchase.prototype.boot = function () {
        var app = this.app;
        app.vue({
            plugins: [
                require('vue-resource')
            ],
            methods: {
                alipay: function (response) {
                    this.submitForm(response);
                },
                unionPay: function (response) {
                    this.submitForm(response);
                },
                weChat: function (response) {
                },
                /**
                 * Handlers
                 * @param r
                 */
                success: function (r) {
                    var response = r.json();
                    app.logger.group("Gateway: " + response.gateway, function (logger) {
                        logger.dir(response, response, response);
                    });
                    this[response.gateway](response);
                },
                error: function (response) {
                    console.dir(response);
                },
                /**
                 * Submit form to the vendor
                 * @param response
                 */
                submitForm: function (response) {
                    var form = document.createElement('form');
                    /**
                     * Build Data
                     */
                    for (var name_1 in response.data) {
                        var input = document.createElement('input');
                        input.name = name_1;
                        input.setAttribute('value', response.data[name_1]);
                        form.appendChild(input);
                    }
                    form.action = response.target;
                    form.method = response.method;
                    Helpers_1.submitForm(form);
                }
            },
            ready: function () {
                var _this = this;
                var form = document.querySelector('form');
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    var response = _this.$http.post(form.action, new FormData(form));
                    response.then(_this.success, _this.error);
                });
            }
        });
    };
    return Purchase;
}(AbstractPage_1.AbstractPage));
exports.Purchase = Purchase;
//# sourceMappingURL=Purchase.js.map