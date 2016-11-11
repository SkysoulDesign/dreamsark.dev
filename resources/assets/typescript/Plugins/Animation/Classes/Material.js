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
            baseMaterial: require('../Materials/BaseMaterial'),
            itemMaterial: require('../Materials/ItemMaterial')
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
//# sourceMappingURL=Material.js.map