"use strict";
var pather = require('path');
var Image = (function () {
    function Image(_a) {
        var path = _a.path, width = _a.width, height = _a.height, type = _a.type, margin = _a.margin;
        this.margin = 0;
        this.width = width + (margin * 2);
        this.height = height + (margin * 2);
        this.margin = margin;
        this.type = type;
        this.path = path;
        this.name = pather.basename(path, pather.extname(path));
        this.area = this.width * height;
    }
    Image.prototype.pack = function (bin, data) {
        this.data = data;
        this.bin = bin;
    };
    Image.prototype.setPacking = function (bin, _a) {
        var x = _a.x, y = _a.y;
        this.x = x;
        this.y = y;
        this.bin = bin;
    };
    Image.prototype.export = function () {
        return {
            name: this.name,
            width: this.width,
            height: this.height,
            sprite: {
                name: "sprite-" + this.bin + ".png",
                width: this.x + this.width,
                height: this.x + this.width,
            },
            x: this.x,
            y: this.y,
        };
    };
    return Image;
}());
exports.Image = Image;
//# sourceMappingURL=Image.js.map