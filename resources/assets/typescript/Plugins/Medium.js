"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plugins_1 = require("./Plugins");
var Helpers_1 = require("../Helpers");
window['dreamsark'].exposes({
    MediumEditor: require("medium-editor")
});
var MediumEditorTables = require("medium-editor-tables");
var Medium = (function (_super) {
    __extends(Medium, _super);
    function Medium(app, element, options) {
        _super.call(this);
        this.defaults = {
            disableExtraSpaces: true,
            buttonLabels: 'fontawesome',
            toolbar: {
                buttons: [
                    'bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'table'
                ]
            },
            extensions: {
                table: new MediumEditorTables()
            }
        };
        this.instance = new MediumEditor(element, Helpers_1.extend(this.defaults, options));
    }
    return Medium;
}(Plugins_1.Plugins));
exports.Medium = Medium;
/**
 * Auto install itself
 */
window['dreamsark'].install({
    Medium: Medium
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVkaXVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWVkaXVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdCQUFzQixXQUFXLENBQUMsQ0FBQTtBQUNsQyx3QkFBcUIsWUFBWSxDQUFDLENBQUE7QUFFbEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN4QixZQUFZLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQztDQUN6QyxDQUFDLENBQUM7QUFFSCxJQUFPLGtCQUFrQixXQUFXLHNCQUFzQixDQUFDLENBQUE7QUFFM0Q7SUFBNEIsMEJBQU87SUFpQi9CLGdCQUFZLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTztRQUU3QixpQkFBTyxDQUFDO1FBZkosYUFBUSxHQUFHO1lBQ2Ysa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixZQUFZLEVBQUUsYUFBYTtZQUMzQixPQUFPLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFO29CQUNMLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPO2lCQUN4RTthQUNKO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLEtBQUssRUFBRSxJQUFJLGtCQUFrQixFQUFFO2FBQ2xDO1NBQ0osQ0FBQztRQU1FLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQzVCLE9BQU8sRUFBRSxnQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQzFDLENBQUM7SUFFTixDQUFDO0lBRUwsYUFBQztBQUFELENBQUMsQUEzQkQsQ0FBNEIsaUJBQU8sR0EyQmxDO0FBM0JZLGNBQU0sU0EyQmxCLENBQUE7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDeEIsUUFBQSxNQUFNO0NBQ1QsQ0FBQyxDQUFDIn0=