"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Aplication_1 = require("../Abstract/Aplication");
var Helpers_1 = require("../Helpers");
/**
 * Components
 */
var Component = (function (_super) {
    __extends(Component, _super);
    /**
     * Register Components
     */
    function Component(app) {
        var _this = this;
        _super.call(this, app);
        /**
         * @type {{}}
         */
        this.initialized = {};
        this.components = Helpers_1.requireAll(require.context("../Components", false, /\.js$/));
        this.components.forEach(function (component) {
            for (var name_1 in component) {
                if (component.hasOwnProperty(name_1)) {
                    var instance = new component[name_1];
                    instance.register(require("vue"), app);
                    _this.initialized[name_1] = instance;
                }
            }
        });
    }
    /**
     * Components list
     * @type ComponentInterface[]
     */
    Component.prototype.requireAll = function (requireContext) {
        return requireContext.keys().map(function (item) {
            return 'hora';
        });
    };
    return Component;
}(Aplication_1.Application));
exports.Component = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUEwQix3QkFBd0IsQ0FBQyxDQUFBO0FBQ25ELHdCQUF5QixZQUFZLENBQUMsQ0FBQTtBQUV0Qzs7R0FFRztBQUNIO0lBQStCLDZCQUFXO0lBcUJ0Qzs7T0FFRztJQUNILG1CQUFZLEdBQUc7UUF4Qm5CLGlCQTRDQztRQWxCTyxrQkFBTSxHQUFHLENBQUMsQ0FBQztRQXhCZjs7V0FFRztRQUNJLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBWWhCLGVBQVUsR0FBRyxvQkFBVSxDQUMzQixPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQ25ELENBQUM7UUFTRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7WUFFN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFJLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFFekIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLElBQUksUUFBUSxHQUFHLElBQUksU0FBUyxDQUFDLE1BQUksQ0FBQyxDQUFDO29CQUNuQyxRQUFRLENBQUMsUUFBUSxDQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQ3RCLENBQUM7b0JBQ0YsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7Z0JBQ3RDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBbkNEOzs7T0FHRztJQUNILDhCQUFVLEdBQVYsVUFBVyxjQUFjO1FBQ3JCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSTtZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTZCTCxnQkFBQztBQUFELENBQUMsQUE1Q0QsQ0FBK0Isd0JBQVcsR0E0Q3pDO0FBNUNZLGlCQUFTLFlBNENyQixDQUFBIn0=