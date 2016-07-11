"use strict";
var Character = (function () {
    function Character(app) {
        this.animator = app.animator;
    }
    Character.prototype.init = function (name, models, materials) {
        var character = this.create(models, materials);
        character.name = name;
        return character;
    };
    return Character;
}());
exports.Character = Character;
//# sourceMappingURL=Character.js.map