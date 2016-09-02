"use strict";
var CharacterDefaultMaterial = (function () {
    function CharacterDefaultMaterial() {
    }
    Object.defineProperty(CharacterDefaultMaterial.prototype, "textures", {
        get: function () {
            return {
                texture: '/models/texture.png',
            };
        },
        enumerable: true,
        configurable: true
    });
    CharacterDefaultMaterial.prototype.create = function (_a) {
        var texture = _a.texture;
        return new THREE.MeshStandardMaterial({
            skinning: true,
            shading: THREE.FlatShading,
            roughness: 1,
            metalness: 1,
            map: texture
        });
    };
    return CharacterDefaultMaterial;
}());
exports.CharacterDefaultMaterial = CharacterDefaultMaterial;
//# sourceMappingURL=CharacterDefaultMaterial.js.map