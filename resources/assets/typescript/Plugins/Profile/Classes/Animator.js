"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
/**
 * Animator Class
 */
var Animator = (function (_super) {
    __extends(Animator, _super);
    function Animator() {
        _super.apply(this, arguments);
        this.animations = [];
    }
    /**
     * Create a new Animation
     *
     * @param mesh
     * @returns {THREE.AnimationMixer}
     */
    Animator.prototype.create = function (mesh) {
        var mixer = new THREE.AnimationMixer(mesh);
        this.animations.push(mixer);
        return mixer;
    };
    Animator.prototype.push = function (name, mixer) {
        this.animations.push({
            name: name,
            mixer: mixer
        });
    };
    /**
     * Update Animations
     * @param time
     * @param delta
     */
    Animator.prototype.update = function (time, delta) {
        if (this.animations.length > 0) {
            for (var i = 0; i < this.animations.length; i++) {
                this.animations[i].update(delta);
            }
        }
    };
    return Animator;
}(Components_1.Components));
exports.Animator = Animator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBbmltYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQkFBeUIsd0JBQXdCLENBQUMsQ0FBQTtBQUVsRDs7R0FFRztBQUNIO0lBQThCLDRCQUFVO0lBQXhDO1FBQThCLDhCQUFVO1FBRTVCLGVBQVUsR0FBRyxFQUFFLENBQUM7SUEwQzVCLENBQUM7SUF4Q0c7Ozs7O09BS0c7SUFDSSx5QkFBTSxHQUFiLFVBQWMsSUFBZTtRQUV6QixJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ2hCLEtBQUssQ0FDUixDQUFDO1FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUVqQixDQUFDO0lBRU0sdUJBQUksR0FBWCxVQUFZLElBQVcsRUFBRSxLQUFLO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHlCQUFNLEdBQWIsVUFBYyxJQUFJLEVBQUUsS0FBSztRQUVyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsQ0FBQztRQUNMLENBQUM7SUFFTCxDQUFDO0lBRUwsZUFBQztBQUFELENBQUMsQUE1Q0QsQ0FBOEIsdUJBQVUsR0E0Q3ZDO0FBNUNZLGdCQUFRLFdBNENwQixDQUFBIn0=