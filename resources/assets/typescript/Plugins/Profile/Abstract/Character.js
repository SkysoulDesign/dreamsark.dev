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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcmFjdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hhcmFjdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTs7R0FFRztBQUNIO0lBUUksbUJBQVksR0FBRztRQUZSLFVBQUssR0FBVyxJQUFJLENBQUM7UUFHeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQTtRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFBO0lBQ3BDLENBQUM7SUFFTSx3QkFBSSxHQUFYLFVBQVksSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUztRQUV6QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckQsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFMUIsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUVyQixDQUFDO0lBSUwsZ0JBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJxQixpQkFBUyxZQTBCOUIsQ0FBQSJ9