"use strict";
/**
 * Statistics Component
 */
var Pagination = (function () {
    function Pagination() {
    }
    Pagination.prototype.register = function (Vue) {
        /**
         * Pagination
         */
        Vue.component('ark-pagination', {
            template: require('html!../templates/pagination/pagination.html'),
            props: {
                data: Object
            },
            methods: {
                sayHi: function () {
                    console.log('hi');
                }
            }
        });
        Vue.component('ark-pagination-step', {
            template: require('html!../templates/pagination/step.html')
        });
    };
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlBhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBOztHQUVHO0FBQ0g7SUFBQTtJQXlCQSxDQUFDO0lBdkJHLDZCQUFRLEdBQVIsVUFBUyxHQUFHO1FBRVI7O1dBRUc7UUFDSCxHQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFO1lBQzVCLFFBQVEsRUFBRSxPQUFPLENBQUMsOENBQThDLENBQUM7WUFDakUsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxNQUFNO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSztvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixDQUFDO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFO1lBQ2pDLFFBQVEsRUFBRSxPQUFPLENBQUMsd0NBQXdDLENBQUM7U0FDOUQsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSxrQkFBVSxhQXlCdEIsQ0FBQSJ9