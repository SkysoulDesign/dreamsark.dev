"use strict";
/**
 * Quote Component
 */
var Quote = (function () {
    function Quote() {
    }
    Quote.prototype.register = function (vue, app) {
        /**
         * @todo bug. when tab is not active, the quote will be display none then when try to get offsetHeight will return 0
         */
        vue.component('ark-quote', {
            template: require('html!../templates/quote/quote.html'),
            props: {
                expandable: {
                    type: Boolean,
                    default: true
                },
                maxHeight: {
                    type: Number,
                    default: 300
                },
                expandText: {
                    type: String,
                    default: 'expand'
                }
            },
            methods: {
                expand: function () {
                    this.$el.classList.remove('--collapsed');
                    this.$el.style.removeProperty('max-height');
                }
            },
            ready: function () {
                if (this.expandable &&
                    this.$el.offsetHeight > this.maxHeight) {
                    this.$el.classList.add('--collapsed');
                    this.$el.style.maxHeight = this.maxHeight + 'px';
                }
            }
        });
    };
    return Quote;
}());
exports.Quote = Quote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVvdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJRdW90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7O0dBRUc7QUFDSDtJQUFBO0lBMkNBLENBQUM7SUF6Q0csd0JBQVEsR0FBUixVQUFTLEdBQUcsRUFBRSxHQUFHO1FBRWI7O1dBRUc7UUFDSCxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUNuQixRQUFRLEVBQUUsT0FBTyxDQUFDLG9DQUFvQyxDQUFDO1lBQ3ZELEtBQUssRUFBRTtnQkFDSCxVQUFVLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE9BQU87b0JBQ2IsT0FBTyxFQUFFLElBQUk7aUJBQ2hCO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsR0FBRztpQkFDZjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE1BQU07b0JBQ1osT0FBTyxFQUFFLFFBQVE7aUJBQ3BCO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFO29CQUNKLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO2FBQ0o7WUFDRCxLQUFLO2dCQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVO29CQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDckQsQ0FBQztZQUVMLENBQUM7U0FDSixDQUNKLENBQUM7SUFFTixDQUFDO0lBRUwsWUFBQztBQUFELENBQUMsQUEzQ0QsSUEyQ0M7QUEzQ1ksYUFBSyxRQTJDakIsQ0FBQSJ9