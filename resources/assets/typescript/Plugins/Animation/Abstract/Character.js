"use strict";
/**
 * Character Class
 */
var Character = (function () {
    function Character(app) {
        this.defer = true;
        this.animator = app.animator;
        this.animation = app.animation;
        this.material = app.material;
        this.characters = app.characters;
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