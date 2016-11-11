"use strict";
var Image_1 = require('./../Image');
var Sort_1 = require('./../Sort');
var PackerOld = (function () {
    function PackerOld(width, height) {
        this.width = width;
        this.height = height;
        this.createBin(width, height);
    }
    PackerOld.prototype.createBin = function (width, height) {
        return this.bin = {
            x: 0, y: 0, width: width, height: height
        };
    };
    PackerOld.prototype.resetBin = function () {
        return this.createBin(this.width, this.height);
    };
    PackerOld.prototype.pack = function (images, sortAlgorithm, auto) {
        var _this = this;
        var sorted = (new Sort_1.Sort(images, sortAlgorithm)).sort(), bin = 0;
        while (sorted.length) {
            sorted = sorted
                .map(function (image) { return _this.fit(image, bin + 1); })
                .filter(function (result) { return result instanceof Image_1.Image; });
            bin += 1;
            this.resetBin();
        }
        return images;
    };
    PackerOld.prototype.fit = function (image, bin) {
        var _this = this;
        if (bin === void 0) { bin = 1; }
        var node = this.findNode(this.bin, image);
        if (node) {
            return image.setPacking(bin, this.splitNode(node, image.width, image.height));
        }
        return image;
        return images.map(function (image) {
            if (image.packed) {
                return image;
            }
            var node = _this.findNode(_this.bin, image);
            if (node && !image.packed) {
                image.setPacking(bin, _this.splitNode(node, image.width, image.height));
                image.packed = true;
                return image;
            }
            _this.resetBin();
            return _this.fit(images, auto, bin + 1);
        }).reduce(function (a, b) { return a.concat(b); }, []);
        for (var i = index; i < images.length; i++) {
            var image_1 = images[i], node_1 = this.findNode(this.bin, image_1);
            if (node_1) {
                image_1.setPacking(bin, this.splitNode(node_1, image_1.width, image_1.height));
                continue;
            }
            else if (auto) {
                image_1.setPacking(bin, this.growNode(image_1.width, image_1.height));
            }
            else {
                this.resetBin();
                return this.fit(images, auto, bin + 1, i);
            }
        }
        return images;
        // accept(images);
        // });
    };
    PackerOld.prototype.fita = function (blocks, page, index) {
        if (page === void 0) { page = 1; }
        if (index === void 0) { index = 0; }
        for (var i = index; i < blocks.length; i++) {
            var block = blocks[i], node = this.findNode(this.bin, block.width, block.height);
            if (node) {
                blocks[i].pack(page, this.splitNode(node, block.width, block.height));
                continue;
            }
            this.root = { x: 0, y: 0, width: this.root.width, height: this.bin.height };
            return this.fit(blocks, page + 1, i);
        }
        return blocks;
    };
    PackerOld.prototype.growNode = function (width, height) {
        var canGrowDown = (width <= this.bin.width);
        var canGrowRight = (height <= this.bin.height);
        var shouldGrowRight = canGrowRight && (this.bin.height >= (this.bin.width + width)); // attempt to keep square-ish by growing right when height is much greater than width
        var shouldGrowDown = canGrowDown && (this.bin.width >= (this.bin.height + height)); // attempt to keep square-ish by growing down  when width  is much greater than height
        if (shouldGrowRight)
            return this.growRight(width, height);
        else if (shouldGrowDown)
            return this.growDown(width, height);
        else if (canGrowRight)
            return this.growRight(width, height);
        else if (canGrowDown)
            return this.growDown(width, height);
        else
            return null; // need to ensure sensible root starting size to avoid this happening
    };
    PackerOld.prototype.growRight = function (width, height) {
        this.bin = {
            used: true,
            x: 0,
            y: 0,
            width: this.bin.width + width,
            height: this.bin.height,
            down: this.bin,
            right: { x: this.bin.width, y: 0, width: width, height: this.bin.width }
        };
        var node = this.findNode(this.bin, { width: width, height: height });
        if (node)
            return this.splitNode(node, width, height);
        else
            return null;
    };
    PackerOld.prototype.growDown = function (width, height) {
        this.bin = {
            used: true,
            x: 0,
            y: 0,
            width: this.bin.width,
            height: this.bin.height + height,
            down: { x: 0, y: this.bin.height, width: this.bin.width, height: height },
            right: this.bin
        };
        var node = this.findNode(this.bin, { width: width, height: height });
        if (node)
            return this.splitNode(node, width, height);
        else
            return null;
    };
    PackerOld.prototype.findNode = function (root, image) {
        if (root.used)
            return this.findNode(root.right, image) || this.findNode(root.down, image);
        else if ((image.width <= root.width) && (image.height <= root.height))
            return root;
        return null;
    };
    PackerOld.prototype.splitNode = function (node, width, height) {
        node.used = true;
        node.down = { x: node.x, y: node.y + height, width: node.width, height: node.height - height };
        node.right = { x: node.x + width, y: node.y, width: node.width - width, height: height };
        return node;
    };
    return PackerOld;
}());
exports.PackerOld = PackerOld;
//# sourceMappingURL=PackerOld.js.map