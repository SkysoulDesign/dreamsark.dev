"use strict";
var Sort_1 = require('./../Sort');
var Rect = (function () {
    function Rect(x, y, width, height) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rect;
}());
exports.Rect = Rect;
var Packer = (function () {
    function Packer(width, height) {
        if (width === void 0) { width = null; }
        if (height === void 0) { height = null; }
        this.width = width;
        this.height = height;
        this.left = null;
        this.right = null;
        this.rect = null;
        this.filled = false;
        this.createBin(width, height);
    }
    Packer.prototype.createBin = function (width, height) {
        return this.rect = {
            x: 0, y: 0, width: width, height: height
        };
    };
    Packer.prototype.resetBin = function () {
        this.right = null;
        this.left = null;
        return this.createBin(this.width, this.height);
    };
    Packer.prototype.pack = function (images, sortAlgorithm, auto) {
        return this.fit((new Sort_1.Sort(images, sortAlgorithm)).sort());
    };
    Packer.prototype.fit = function (images, bin, index) {
        if (bin === void 0) { bin = 1; }
        if (index === void 0) { index = 0; }
        for (var i = index; i < images.length; i++) {
            var image = images[i], node = this.add(image);
            if (node) {
                image.setPacking(bin, node.rect);
                continue;
            }
            this.resetBin();
            return this.fit(images, bin + 1, i);
        }
        return images;
    };
    Packer.prototype.fits = function (rect) {
        return this.rect.width >= rect.width && this.rect.height >= rect.height;
    };
    ;
    Packer.prototype.equal = function (rect) {
        return rect.width === this.rect.width && this.rect.height === rect.height;
    };
    ;
    Packer.prototype.add = function (rect) {
        if (this.left != null)
            return this.left.add(rect) || this.right.add(rect);
        if (this.filled)
            return null;
        if (!this.fits(rect))
            return null;
        if (this.equal(rect)) {
            this.filled = true;
            return this;
        }
        this.left = new Packer();
        this.right = new Packer();
        var width_diff = this.rect.width - rect.width;
        var height_diff = this.rect.height - rect.height;
        var me = this.rect;
        if (width_diff > height_diff) {
            this.left.rect = new Rect(me.x, me.y, rect.width, me.height);
            this.right.rect = new Rect(me.x + rect.width, me.y, me.width - rect.width, me.height);
        }
        else {
            this.left.rect = new Rect(me.x, me.y, me.width, rect.height);
            this.right.rect = new Rect(me.x, me.y + rect.height, me.width, me.height - rect.height);
        }
        return this.left.add(rect);
    };
    ;
    return Packer;
}());
exports.Packer = Packer;
//# sourceMappingURL=Packer.js.map