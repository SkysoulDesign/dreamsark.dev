"use strict";
/**
 * Nav Component
 */
var Progress = (function () {
    function Progress() {
    }
    Progress.prototype.register = function (Vue) {
        Vue.component('ark-progress', {
            template: require('html!../templates/progress.html'),
            props: {
                data: {
                    type: Number,
                    default: 100
                },
                label: String,
                class: String,
                live: {
                    type: Array,
                },
                size: {
                    type: String,
                    default: 'normal' //normal, medium, large
                },
                max: {
                    type: Number,
                    default: 100
                },
                color: {
                    type: String,
                    default: 'success'
                },
                symbol: {
                    type: String,
                    default: '%'
                },
                flat: Boolean,
                animated: Boolean,
                mini: Boolean,
                mode: {
                    type: String,
                    default: 'normal'
                }
            },
            computed: {
                percentage: function () {
                    var percentage = Math.round((this.data / this.max) * 100);
                    return percentage > 100 ? 100 : percentage;
                }
            },
            ready: function () {
                var _this = this;
                if (this.live) {
                    var start_1 = Date.parse(this.live[0]), end_1 = Date.parse(this.live[1]), interval_1 = setInterval(function () {
                        var now = (new Date).getTime(), q = Math.abs(now - start_1), d = Math.abs(end_1 - start_1), percentage = (q / d) * 100;
                        if (percentage > 100) {
                            _this.data = 100;
                            return clearInterval(interval_1);
                        }
                        _this.data = Math.round(percentage);
                    }, 1000);
                }
            }
        });
    };
    return Progress;
}());
exports.Progress = Progress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9ncmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7O0dBRUc7QUFDSDtJQUFBO0lBMEVBLENBQUM7SUF4RUcsMkJBQVEsR0FBUixVQUFTLEdBQUc7UUFFUixHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRTtZQUMxQixRQUFRLEVBQUUsT0FBTyxDQUFDLGlDQUFpQyxDQUFDO1lBQ3BELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLE1BQU07b0JBQ1osT0FBTyxFQUFFLEdBQUc7aUJBQ2Y7Z0JBQ0QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxLQUFLO2lCQUNkO2dCQUNELElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsUUFBUSxDQUFDLHVCQUF1QjtpQkFDNUM7Z0JBQ0QsR0FBRyxFQUFFO29CQUNELElBQUksRUFBRSxNQUFNO29CQUNaLE9BQU8sRUFBRSxHQUFHO2lCQUNmO2dCQUNELEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsU0FBUztpQkFDckI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxNQUFNO29CQUNaLE9BQU8sRUFBRSxHQUFHO2lCQUNmO2dCQUNELElBQUksRUFBRSxPQUFPO2dCQUNiLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixJQUFJLEVBQUUsT0FBTztnQkFDYixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLE1BQU07b0JBQ1osT0FBTyxFQUFFLFFBQVE7aUJBQ3BCO2FBQ0o7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sVUFBVSxFQUFFO29CQUNSLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDMUQsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQztnQkFDL0MsQ0FBQzthQUNKO1lBQ0QsS0FBSztnQkFBTCxpQkF1QkM7Z0JBckJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUVaLElBQUksT0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNoQyxLQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzlCLFVBQVEsR0FBRyxXQUFXLENBQUM7d0JBRW5CLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDMUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE9BQUssQ0FBQyxFQUN6QixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFHLEdBQUcsT0FBSyxDQUFDLEVBQ3pCLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7d0JBRS9CLEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUNuQixLQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQzs0QkFDaEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFRLENBQUMsQ0FBQTt3QkFDbEMsQ0FBQzt3QkFFRCxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRXZDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFakIsQ0FBQztZQUNMLENBQUM7U0FDSixDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUwsZUFBQztBQUFELENBQUMsQUExRUQsSUEwRUM7QUExRVksZ0JBQVEsV0EwRXBCLENBQUEifQ==