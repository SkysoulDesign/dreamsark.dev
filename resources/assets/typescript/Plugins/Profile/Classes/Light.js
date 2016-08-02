"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
/**
 * Class Light
 */
var Light = (function (_super) {
    __extends(Light, _super);
    function Light() {
        _super.apply(this, arguments);
    }
    Light.prototype.boot = function (app) {
        this.scene = app.scene;
        this.camera = app.camera;
        var light = new THREE.AmbientLight(0xffffff);
        light.intensity = .9;
        var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 1);
        var ambientLight = new THREE.AmbientLight(0xf0ecf6, 1);
        // let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9),
        //     ambientLight = new THREE.AmbientLight(0xffffff, .3),
        var shadowLight = new THREE.DirectionalLight(0xffffff, 1);
        shadowLight.name = 'shadowLight';
        shadowLight.position.set(0, 100, -350);
        shadowLight.castShadow = true;
        // hemisphereLight.position.setZ(-300)
        // hemisphereLight.position.setZ(-300)
        var shadow = new THREE.LightShadow(this.camera);
        shadowLight.position.set(100, 100, -300);
        var left = shadowLight.clone();
        left.intensity = 2.5;
        left.position.set(100, 0, 100);
        left.color.setHex(0xafe1fe);
        var right = shadowLight.clone();
        right.intensity = 3;
        right.position.set(-100, 0, -100);
        right.color.setHex(0xfef1af);
        this.scene.add(ambientLight, shadowLight, left, right);
    };
    Light.prototype.update = function (time, delta) {
    };
    return Light;
}(Components_1.Components));
exports.Light = Light;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlnaHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJMaWdodC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQkFBeUIsd0JBQXdCLENBQUMsQ0FBQTtBQUVsRDs7R0FFRztBQUNIO0lBQTJCLHlCQUFVO0lBQXJDO1FBQTJCLDhCQUFVO0lBbURyQyxDQUFDO0lBOUNHLG9CQUFJLEdBQUosVUFBSyxHQUFHO1FBRUosSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUV6QixJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7UUFFcEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDdEUsSUFBSSxZQUFZLEdBQUcsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV2RCwyRUFBMkU7UUFDM0UsMkRBQTJEO1FBQzNELElBQUksV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUxRCxXQUFXLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQTtRQUNoQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsV0FBVyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFOUIsc0NBQXNDO1FBQ3RDLHNDQUFzQztRQUV0QyxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWhELFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUV4QyxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUUzQixJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ1YsWUFBWSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUN6QyxDQUFDO0lBRU4sQ0FBQztJQUVNLHNCQUFNLEdBQWIsVUFBYyxJQUFXLEVBQUUsS0FBWTtJQUV2QyxDQUFDO0lBRUwsWUFBQztBQUFELENBQUMsQUFuREQsQ0FBMkIsdUJBQVUsR0FtRHBDO0FBbkRZLGFBQUssUUFtRGpCLENBQUEifQ==