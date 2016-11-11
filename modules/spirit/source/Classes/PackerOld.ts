import { BasicImageInterface } from './../Interfaces/BasicImageInterface';
import { Image } from './../Image';
import { Sort } from './../Sort';
import Promise = require('bluebird');

export class PackerOld {

    private bin: BasicImageInterface;

    constructor(public width: number, public height: number) {
        this.createBin(width, height);
    }

    createBin(width: number, height: number): BasicImageInterface {
        return this.bin = {
            x: 0, y: 0, width, height
        };
    }

    resetBin(): BasicImageInterface {
        return this.createBin(this.width, this.height);
    }

    public pack(images: Image[], sortAlgorithm: string, auto: boolean) {

        let sorted = (new Sort(images, sortAlgorithm)).sort(),
            bin = 0;

        while (sorted.length) {

            sorted = sorted
                .map(image => this.fit(image, bin + 1))
                .filter(result => result instanceof Image)

            bin += 1;
            this.resetBin();

        }

        return images;

    }

    private fit(image: Image, bin: number = 1) {

        let node = this.findNode(this.bin, image);

        if (node) {
            return image.setPacking(bin, this.splitNode(node, image.width, image.height));
        }

        return image;





        return images.map(image => {

            if (image.packed) {
                return image;
            }

            let node = this.findNode(this.bin, image);

            if (node && !image.packed) {

                image.setPacking(
                    bin, this.splitNode(node, image.width, image.height)
                );

                image.packed = true;

                return image;

            }

            this.resetBin();

            return this.fit(images, auto, bin + 1);

        }).reduce((a, b) => a.concat(b), []);

        for (let i = index; i < images.length; i++) {

            let image = images[i],
                node = this.findNode(this.bin, image);

            if (node) {
                image.setPacking(
                    bin, this.splitNode(node, image.width, image.height)
                );
                continue;
            } else if (auto) {
                image.setPacking(
                    bin, this.growNode(image.width, image.height)
                );
            } else {

                this.resetBin();

                return this.fit(images, auto, bin + 1, i);

            }

        }

        return images;

        // accept(images);

        // });

    }

    fita(blocks: any[], page: number = 1, index: number = 0) {

        for (let i = index; i < blocks.length; i++) {

            let block = blocks[i],
                node = this.findNode(this.bin, block.width, block.height);

            if (node) {
                blocks[i].pack(page, this.splitNode(node, block.width, block.height));
                continue;
            }

            this.root = { x: 0, y: 0, width: this.root.width, height: this.bin.height };

            return this.fit(blocks, page + 1, i);

        }

        return blocks;
    }

    growNode(width: number, height: number) {

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
    }

    growRight(width: number, height: number) {

        this.bin = {
            used: true,
            x: 0,
            y: 0,
            width: this.bin.width + width,
            height: this.bin.height,
            down: this.bin,
            right: { x: this.bin.width, y: 0, width: width, height: this.bin.width }
        };

        let node = this.findNode(this.bin, { width, height });

        if (node)
            return this.splitNode(node, width, height);
        else
            return null;

    }

    growDown(width: number, height: number) {
        this.bin = {
            used: true,
            x: 0,
            y: 0,
            width: this.bin.width,
            height: this.bin.height + height,
            down: { x: 0, y: this.bin.height, width: this.bin.width, height: height },
            right: this.bin
        };

        let node = this.findNode(this.bin, { width, height });
        if (node)
            return this.splitNode(node, width, height);
        else
            return null;
    }

    findNode(root, image: Image) {

        if (root.used)
            return this.findNode(root.right, image) || this.findNode(root.down, image);
        else if ((image.width <= root.width) && (image.height <= root.height))
            return root;

        return null;

    }

    splitNode(node, width, height) {
        node.used = true;
        node.down = { x: node.x, y: node.y + height, width: node.width, height: node.height - height };
        node.right = { x: node.x + width, y: node.y, width: node.width - width, height };
        return node;
    }

}