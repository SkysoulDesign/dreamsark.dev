"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Class Renderer
 */
var Renderer = (function (_super) {
    __extends(Renderer, _super);
    function Renderer(app) {
        _super.call(this, {
            antialias: true,
            alpha: true
        });
        app.canvas.appendChild(this.domElement);
    }
    Renderer.prototype.boot = function (app) {
        this.scene = app.scene;
        this.camera = app.camera;
        this.browser = app.browser;
        this.setSize(app.canvas.offsetWidth, app.canvas.offsetHeight);
        this.setPixelRatio(this.browser.pixelRatio);
    };
    Renderer.prototype.update = function (time, delta) {
        this.render(this.scene, this.camera);
    };
    return Renderer;
}(THREE.WebGLRenderer));
exports.Renderer = Renderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7R0FFRztBQUNIO0lBQThCLDRCQUFtQjtJQXNCN0Msa0JBQVksR0FBRztRQUVYLGtCQUFNO1lBQ0YsU0FBUyxFQUFFLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQTtRQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUNsQixJQUFJLENBQUMsVUFBVSxDQUNsQixDQUFDO0lBRU4sQ0FBQztJQTNCTSx1QkFBSSxHQUFYLFVBQVksR0FBRztRQUVYLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQ2xELENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUMxQixDQUFDO0lBRU4sQ0FBQztJQWVELHlCQUFNLEdBQU4sVUFBTyxJQUFJLEVBQUUsS0FBSztRQUNkLElBQUksQ0FBQyxNQUFNLENBQ1AsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUMxQixDQUFDO0lBQ04sQ0FBQztJQUVMLGVBQUM7QUFBRCxDQUFDLEFBekNELENBQThCLEtBQUssQ0FBQyxhQUFhLEdBeUNoRDtBQXpDWSxnQkFBUSxXQXlDcEIsQ0FBQSJ9