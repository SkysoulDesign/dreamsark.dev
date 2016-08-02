"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Helpers_1 = require("../../Helpers");
/**
 * Material Class
 */
var Material = (function (_super) {
    __extends(Material, _super);
    function Material() {
        _super.apply(this, arguments);
        /**
         * List of Initialized Materials
         */
        this.initialized = {};
        this.materials = {
            baseMaterial: require('../Materials/BaseMaterial')
        };
    }
    Material.prototype.boot = function (app) {
        this.loader = app.loader;
    };
    /**
     * Get Material
     * @param name
     * @returns {any}
     */
    Material.prototype.get = function (name) {
        if (!this.materials.hasOwnProperty(name))
            return window['dreamsark'].logger.error("No material found with the name: " + name);
        if (this.initialized.hasOwnProperty(name))
            return this.initialized[name];
        return this.load(name, this.materials[name]);
    };
    Material.prototype.load = function (name, object) {
        var material;
        var _loop_1 = function(i) {
            var instance = new object[i];
            instance.boot(this_1.app);
            material = instance.material();
            var textures = instance.textures(), counter = 1, max = Helpers_1.countKeys(textures);
            var _loop_2 = function(name_1) {
                this_1.loader.load(textures[name_1], function (texture) {
                    texture.name = name_1;
                    textures[name_1] = texture;
                    if (counter !== max)
                        return ++counter;
                    instance.loaded(material, textures);
                });
            };
            for (var name_1 in textures) {
                _loop_2(name_1);
            }
        };
        var this_1 = this;
        for (var i in object) {
            _loop_1(i);
        }
        return this.initialized[name] = material;
    };
    return Material;
}(Components_1.Components));
exports.Material = Material;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0ZXJpYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNYXRlcmlhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQkFBeUIsd0JBQXdCLENBQUMsQ0FBQTtBQUNsRCx3QkFBd0IsZUFBZSxDQUFDLENBQUE7QUFFeEM7O0dBRUc7QUFDSDtJQUE4Qiw0QkFBVTtJQUF4QztRQUE4Qiw4QkFBVTtRQUVwQzs7V0FFRztRQUNLLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR2pCLGNBQVMsR0FBRztZQUNoQixZQUFZLEVBQUUsT0FBTyxDQUFDLDJCQUEyQixDQUFDO1NBQ3JELENBQUE7SUE0REwsQ0FBQztJQTFERyx1QkFBSSxHQUFKLFVBQUssR0FBRztRQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHNCQUFHLEdBQUgsVUFBSSxJQUFXO1FBRVgsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0NBQW9DLElBQU0sQ0FBQyxDQUFDO1FBRXhGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFakQsQ0FBQztJQUVPLHVCQUFJLEdBQVosVUFBYSxJQUFJLEVBQUUsTUFBTTtRQUVyQixJQUFJLFFBQVEsQ0FBQztRQUViO1lBRUksSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUUvQixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQzlCLE9BQU8sR0FBRyxDQUFDLEVBQ1gsR0FBRyxHQUFHLG1CQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFOUI7Z0JBRUksTUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQUksQ0FBQyxFQUFFLFVBQUEsT0FBTztvQkFFcEMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFJLENBQUM7b0JBQ3BCLFFBQVEsQ0FBQyxNQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7b0JBRXpCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxHQUFHLENBQUM7d0JBQ2hCLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQztvQkFFckIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7Z0JBRXZDLENBQUMsQ0FBQyxDQUFBOztZQVpOLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBSSxJQUFJLFFBQVEsQ0FBQzs7YUFjekI7OztRQXpCTCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUM7O1NBMkJwQjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUU3QyxDQUFDO0lBRUwsZUFBQztBQUFELENBQUMsQUF0RUQsQ0FBOEIsdUJBQVUsR0FzRXZDO0FBdEVZLGdCQUFRLFdBc0VwQixDQUFBIn0=