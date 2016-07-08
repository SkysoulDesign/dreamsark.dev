"use strict";
var Character = (function () {
    function Character() {
    }
    Character.prototype.init = function (name) {
        var character = this.create();
        character.name = name;
        return character;
    };
    return Character;
}());
exports.Character = Character;
//# sourceMappingURL=Character.js.map