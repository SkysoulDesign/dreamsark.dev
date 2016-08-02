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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVyY2hhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQdXJjaGFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2QkFBMkIsMEJBQTBCLENBQUMsQ0FBQTtBQUV0RCx3QkFBeUIsWUFBWSxDQUFDLENBQUE7QUFFdEM7O0dBRUc7QUFDSDtJQUE4Qiw0QkFBWTtJQUExQztRQUE4Qiw4QkFBWTtRQUUvQixXQUFNLEdBQUc7WUFDWixxQkFBcUI7U0FDeEIsQ0FBQTtJQXdGTCxDQUFDO0lBdEZHLHVCQUFJLEdBQUo7UUFFSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBRW5CLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDSixPQUFPLEVBQUU7Z0JBQ0wsT0FBTyxDQUFDLGNBQWMsQ0FBQzthQUMxQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxNQUFNLEVBQUUsVUFBVSxRQUF3QjtvQkFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDN0IsQ0FBQztnQkFDRCxRQUFRLEVBQUUsVUFBVSxRQUEwQjtvQkFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDN0IsQ0FBQztnQkFDRCxNQUFNLEVBQUUsVUFBVSxRQUF3QjtnQkFDMUMsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNILE9BQU8sRUFBRSxVQUFVLENBQUM7b0JBRWhCLElBQUksUUFBUSxHQUFxQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBRTFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQVksUUFBUSxDQUFDLE9BQVMsRUFBRSxVQUFBLE1BQU07d0JBQ25ELE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtvQkFDNUMsQ0FBQyxDQUFDLENBQUE7b0JBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFckMsQ0FBQztnQkFDRCxLQUFLLEVBQUUsVUFBVSxRQUFRO29CQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUN6QixDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ0gsVUFBVSxFQUFFLFVBQVUsUUFBeUI7b0JBRTNDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRTFDOzt1QkFFRztvQkFDSCxHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFFN0IsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDNUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFJLENBQUM7d0JBQ2xCLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFFakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFNUIsQ0FBQztvQkFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7b0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztvQkFFOUIsb0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFckIsQ0FBQzthQUNKO1lBRUQsS0FBSztnQkFBTCxpQkFlQztnQkFiRyxJQUFJLElBQUksR0FBb0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQVc7b0JBRXhDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFFdkIsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQ2xDLENBQUE7b0JBRUQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFNUMsQ0FBQyxDQUFDLENBQUE7WUFFVixDQUFDO1NBQ0osQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVMLGVBQUM7QUFBRCxDQUFDLEFBNUZELENBQThCLDJCQUFZLEdBNEZ6QztBQTVGWSxnQkFBUSxXQTRGcEIsQ0FBQSJ9