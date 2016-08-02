"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character_1 = require("../Abstract/Character");
var BaseCharacter = (function (_super) {
    __extends(BaseCharacter, _super);
    function BaseCharacter() {
        _super.apply(this, arguments);
    }
    BaseCharacter.prototype.create = function (models) {
        var materials = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            materials[_i - 1] = arguments[_i];
        }
        var mesh = new THREE.SkinnedMesh(models.character, this.material.get('baseMaterial'));
        var actions = {}, mixer = this.animator.create(mesh);
        this.animation.get('baseAnimation', models.character.bones, mixer).then(function (animations) {
            animations.base.idle.play();
            animations.base.lookAround.play();
        });
        /**
         * Play All Animations
         */
        if (models.character.animations)
            models.character.animations.forEach(function (animation) {
                actions[animation.name] = mixer.clipAction(animation);
                actions[animation.name].play();
            });
        mesh.position.setY(-25);
        mesh.rotation.y = Math.PI;
        //         var text = document.createElement('div');
        //         text.style.position = 'absolute';
        //         text.style.color = 'black';
        //         text.innerHTML = 'Oh hai!';
        // //
        //         text.style.left = mesh.position.x + 'px';
        //         text.style.top = mesh.position.y + 'px';
        //
        //         document.body.appendChild(text)
        return mesh;
    };
    return BaseCharacter;
}(Character_1.Character));
exports.BaseCharacter = BaseCharacter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNoYXJhY3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJhc2VDaGFyYWN0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMEJBQXdCLHVCQUF1QixDQUFDLENBQUE7QUFFaEQ7SUFBNEMsaUNBQVM7SUFBckQ7UUFBNEMsOEJBQVM7SUEwQ3JELENBQUM7SUF4Q0csOEJBQU0sR0FBTixVQUFPLE1BQU07UUFBRSxtQkFBWTthQUFaLFdBQVksQ0FBWixzQkFBWSxDQUFaLElBQVk7WUFBWixrQ0FBWTs7UUFFdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUM1QixNQUFNLENBQUMsU0FBUyxFQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FDcEMsQ0FBQztRQUVGLElBQUksT0FBTyxHQUFHLEVBQUUsRUFDWixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFVBQVU7WUFDOUUsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUIsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUE7UUFFRjs7V0FFRztRQUNILEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLFNBQVM7Z0JBQ25ELE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQTtRQUVOLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQTtRQUVqQyxvREFBb0Q7UUFDcEQsNENBQTRDO1FBQzVDLHNDQUFzQztRQUN0QyxzQ0FBc0M7UUFDdEMsS0FBSztRQUNMLG9EQUFvRDtRQUNwRCxtREFBbUQ7UUFDbkQsRUFBRTtRQUNGLDBDQUEwQztRQUVsQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRWhCLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUExQ0QsQ0FBNEMscUJBQVMsR0EwQ3BEO0FBMUNxQixxQkFBYSxnQkEwQ2xDLENBQUEifQ==