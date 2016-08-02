"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character_1 = require("../Abstract/Character");
/**
 * Character: Base
 */
var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        _super.apply(this, arguments);
    }
    Base.prototype.models = function () {
        return {
            base: '/models/Base.json',
        };
    };
    Base.prototype.create = function (models) {
        var material = this.material.get('baseMaterial').clone();
        material.skinning = false;
        return new THREE.Mesh(models.base, material);
    };
    return Base;
}(Character_1.Character));
exports.Base = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMEJBQXdCLHVCQUF1QixDQUFDLENBQUE7QUFFaEQ7O0dBRUc7QUFDSDtJQUEwQix3QkFBUztJQUFuQztRQUEwQiw4QkFBUztJQWtCbkMsQ0FBQztJQWhCRyxxQkFBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsSUFBSSxFQUFFLG1CQUFtQjtTQUM1QixDQUFBO0lBQ0wsQ0FBQztJQUVELHFCQUFNLEdBQU4sVUFBTyxNQUFNO1FBRVQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekQsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FDakIsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQ3hCLENBQUE7SUFDTCxDQUFDO0lBRUwsV0FBQztBQUFELENBQUMsQUFsQkQsQ0FBMEIscUJBQVMsR0FrQmxDO0FBbEJZLFlBQUksT0FrQmhCLENBQUEifQ==