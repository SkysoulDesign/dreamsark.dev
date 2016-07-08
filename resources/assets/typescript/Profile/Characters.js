"use strict";
/**
 * Characters Class
 */
var Characters = (function () {
    function Characters() {
        var _this = this;
        /**
         * Characters Collection
         * @type {Character[]}
         */
        this.collection = [
            require('./Characters/Designer')
        ];
        /**
         * List of Initialized Object
         * @type {THREE.Object3D[]}
         */
        this.initialized = [];
        this.collection.forEach(function (character) {
            for (var name_1 in character) {
                console.log(name_1);
                console.dir(character[name_1]);
                if (character.hasOwnProperty(name_1)) {
                    _this.initialized.push(_this.init(name_1, character[name_1]));
                }
            }
        });
    }
    Characters.prototype.init = function (name, character) {
        return (new character()).init(name);
    };
    Characters.prototype.first = function () {
        return this.initialized[0];
    };
    return Characters;
}());
exports.Characters = Characters;
//# sourceMappingURL=Characters.js.map