"use strict";
/**
 * Accordion Component
 */
var Accordion = (function () {
    function Accordion() {
    }
    Accordion.prototype.register = function (vue, app) {
        vue.component('ark-accordion-item', {
            template: require('html!../templates/accordion/accordion-item.html'),
            props: {
                show: Boolean
            },
            methods: {
                toggle: function () {
                    this.show = !this.show;
                    this.$dispatch('item-show', this);
                }
            }
        });
        vue.component('ark-accordion', {
            template: require('html!../templates/accordion/accordion.html'),
            data: function () {
                return {
                    active: null
                };
            },
            events: {
                'item-show': function (active) {
                    this.$children.forEach(function (accordion) {
                        if (accordion !== active)
                            accordion.show = false;
                    });
                },
            }
        });
    };
    return Accordion;
}());
exports.Accordion = Accordion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQWNjb3JkaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTs7R0FFRztBQUNIO0lBQUE7SUFvQ0EsQ0FBQztJQWxDRyw0QkFBUSxHQUFSLFVBQVMsR0FBRyxFQUFFLEdBQUc7UUFFYixHQUFHLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFO1lBQ2hDLFFBQVEsRUFBRSxPQUFPLENBQUMsaURBQWlELENBQUM7WUFDcEUsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxPQUFPO2FBQ2hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLE1BQU07b0JBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRTtZQUMzQixRQUFRLEVBQUUsT0FBTyxDQUFDLDRDQUE0QyxDQUFDO1lBQy9ELElBQUksRUFBRTtnQkFDRixNQUFNLENBQUM7b0JBQ0gsTUFBTSxFQUFFLElBQUk7aUJBQ2YsQ0FBQTtZQUNMLENBQUM7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLFVBQVUsTUFBTTtvQkFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxTQUFTO3dCQUN0QyxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDOzRCQUNyQixTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztvQkFDL0IsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQzthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQztBQXBDWSxpQkFBUyxZQW9DckIsQ0FBQSJ9