"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractPage_1 = require("../Abstract/AbstractPage");
/**
 * Common Page
 */
var Common = (function (_super) {
    __extends(Common, _super);
    function Common() {
        _super.apply(this, arguments);
        this.routes = ['*'];
    }
    Common.prototype.boot = function () {
        this.app.logger.info('This class {Common} will run on every request');
        this.dropdown();
        // this.languageSwitcher();
    };
    Common.prototype.languageSwitcher = function () {
        if (this.is(['login', 'register', 'admin.*', 'committee.*'])) {
            return;
        }
        // document.querySelector('#language-switcher')
        //     .addEventListener('change', (e:MouseEvent) => {
        //
        //         let form = document.createElement('form'),
        //             element = <HTMLSelectElement>e.target;
        //
        //         form.method = 'post';
        //         form.action = element.dataset['action'];
        //         form.appendChild(element);
        //
        //         submitForm(form)
        // })
    };
    /**
     * Initialize Dropdown
     */
    Common.prototype.dropdown = function () {
    };
    return Common;
}(AbstractPage_1.AbstractPage));
exports.Common = Common;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDZCQUEyQiwwQkFBMEIsQ0FBQyxDQUFBO0FBR3REOztHQUVHO0FBQ0g7SUFBNEIsMEJBQVk7SUFBeEM7UUFBNEIsOEJBQVk7UUFFN0IsV0FBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUF5QzFCLENBQUM7SUF2Q0cscUJBQUksR0FBSjtRQUVJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQiwyQkFBMkI7SUFFL0IsQ0FBQztJQUVELGlDQUFnQixHQUFoQjtRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUE7UUFDVixDQUFDO1FBRUQsK0NBQStDO1FBQy9DLHNEQUFzRDtRQUN0RCxFQUFFO1FBQ0YscURBQXFEO1FBQ3JELHFEQUFxRDtRQUNyRCxFQUFFO1FBQ0YsZ0NBQWdDO1FBQ2hDLG1EQUFtRDtRQUNuRCxxQ0FBcUM7UUFDckMsRUFBRTtRQUNGLDJCQUEyQjtRQUV2QixLQUFLO0lBR2IsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUJBQVEsR0FBUjtJQUVBLENBQUM7SUFFTCxhQUFDO0FBQUQsQ0FBQyxBQTNDRCxDQUE0QiwyQkFBWSxHQTJDdkM7QUEzQ1ksY0FBTSxTQTJDbEIsQ0FBQSJ9