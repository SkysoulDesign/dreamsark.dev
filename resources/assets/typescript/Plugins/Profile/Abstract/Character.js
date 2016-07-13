"use strict";
/**
 * Character Class
 */
var Character = (function () {
    function Character(app) {
        this.animator = app.animator;
        this.material = app.material;
    }
    Character.prototype.init = function (name, models, textures, materials) {
        var character = this.create(models, textures, materials);
        character.name = name;
        return character;
    };
    return Character;
}());
exports.Character = Character;
//# sourceMappingURL=Character.js.map