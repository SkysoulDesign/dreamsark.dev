"use strict";
/**
 * Steps Component
 */
var Steps = (function () {
    function Steps() {
    }
    Steps.prototype.register = function (vue, app) {
        vue.component('ark-steps', {
            template: require('html!../templates/steps/steps.html'),
            data: function () {
                return {
                    steps: 1
                };
            },
            ready: function () {
                this.$children.every(function (child) {
                    if (!child.active)
                        child.setDone();
                    return !child.active;
                });
            }
        });
        vue.component('ark-step', {
            template: require('html!../templates/steps/step.html'),
            data: function () {
                return {
                    step: this.$parent.steps++,
                    done: false
                };
            },
            props: {
                description: {
                    type: String
                },
                active: {
                    type: Boolean
                }
            },
            methods: {
                setDone: function () {
                    this.done = true;
                    this.$el.classList.add('--done');
                }
            }
        });
    };
    return Steps;
}());
exports.Steps = Steps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RlcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTdGVwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7O0dBRUc7QUFDSDtJQUFBO0lBb0RBLENBQUM7SUFsREcsd0JBQVEsR0FBUixVQUFTLEdBQUcsRUFBRSxHQUFHO1FBRWIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDbkIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQztZQUN2RCxJQUFJLEVBQUU7Z0JBQ0YsTUFBTSxDQUFDO29CQUNILEtBQUssRUFBRSxDQUFDO2lCQUNYLENBQUE7WUFDTCxDQUFDO1lBQ0QsS0FBSztnQkFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUs7b0JBRWhDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDZCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7b0JBRW5CLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBRXpCLENBQUMsQ0FBQyxDQUFBO1lBRU4sQ0FBQztTQUNKLENBQ0osQ0FBQztRQUVGLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQ2xCLFFBQVEsRUFBRSxPQUFPLENBQUMsbUNBQW1DLENBQUM7WUFDdEQsSUFBSSxFQUFFO2dCQUNGLE1BQU0sQ0FBQztvQkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQzFCLElBQUksRUFBRSxLQUFLO2lCQUNkLENBQUE7WUFDTCxDQUFDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRTtvQkFDVCxJQUFJLEVBQUUsTUFBTTtpQkFDZjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osSUFBSSxFQUFFLE9BQU87aUJBQ2hCO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsT0FBTztvQkFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNwQyxDQUFDO2FBQ0o7U0FDSixDQUNKLENBQUM7SUFFTixDQUFDO0lBRUwsWUFBQztBQUFELENBQUMsQUFwREQsSUFvREM7QUFwRFksYUFBSyxRQW9EakIsQ0FBQSJ9