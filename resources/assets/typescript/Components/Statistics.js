"use strict";
/**
 * Statistics Component
 */
var Statistics = (function () {
    function Statistics() {
    }
    Statistics.prototype.register = function (Vue) {
        /**
         * Statistics
         */
        var item = Vue.component('statistic-item', {
            template: require('html!../templates/statistics/item.html'),
            props: {
                icon: String,
                data: {
                    type: String,
                    required: true
                }
            }
        });
        Vue.component('ark-statistics', {
            template: require('html!../templates/statistics/statistics.html'),
            props: {
                size: {
                    type: String,
                    default: 'small'
                }
            }
        });
    };
    return Statistics;
}());
exports.Statistics = Statistics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGlzdGljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlN0YXRpc3RpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBOztHQUVHO0FBQ0g7SUFBQTtJQThCQSxDQUFDO0lBNUJHLDZCQUFRLEdBQVIsVUFBUyxHQUFHO1FBRVI7O1dBRUc7UUFDSCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZDLFFBQVEsRUFBRSxPQUFPLENBQUMsd0NBQXdDLENBQUM7WUFDM0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxNQUFNO2dCQUNaLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsTUFBTTtvQkFDWixRQUFRLEVBQUUsSUFBSTtpQkFDakI7YUFDSjtTQUNKLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUU7WUFDNUIsUUFBUSxFQUFFLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQztZQUNqRSxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxNQUFNO29CQUNaLE9BQU8sRUFBRSxPQUFPO2lCQUNuQjthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FBQyxBQTlCRCxJQThCQztBQTlCWSxrQkFBVSxhQThCdEIsQ0FBQSJ9