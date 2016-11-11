"use strict";
var Promisse = require('bluebird'), gm = require('gm').subClass({ imageMagick: true });
var GraphicsMagick = (function () {
    function GraphicsMagick() {
    }
    GraphicsMagick.prototype.create = function (images, _a) {
        var width = _a.width, height = _a.height, path = _a.path, format = _a.format;
        var frame = gm(width, height, 'transparent');
        return new Promisse(function (accept, reject) {
            for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                var _a = images_1[_i], x = _a.x, y = _a.y, path_1 = _a.path, margin = _a.margin;
                frame.out('-page');
                frame.out("+" + (x + margin) + "+" + (y + margin));
                frame.out(path_1);
                frame.gravity('center');
            }
            frame
                .mosaic()
                .background('transparent');
            frame.write(path, function (err) {
                accept();
            });
        });
    };
    return GraphicsMagick;
}());
exports.GraphicsMagick = GraphicsMagick;
//# sourceMappingURL=GraphicsMagick.js.map