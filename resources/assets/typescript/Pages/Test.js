"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractPage_1 = require("../Abstract/AbstractPage");
/**
 * Profile
 */
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.routes = [
            'user.inventory',
        ];
    }
    Test.prototype.boot = function () {
        var dropZones = document.querySelectorAll("[dropable=true]"), items = document.querySelectorAll("[draggable=true]"), button = document.querySelector('#merger-button'), onDragOver = function handleDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            return false;
        }, onDragEnd = function (e) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }, onDrop = function (e) {
            e.stopPropagation();
            this.innerHTML = e.dataTransfer.getData('text/html');
            this.classList.add('inventory-page__drop-zone__item');
            return false;
        };
        [].forEach.call(dropZones, function (dropZone) {
            dropZone.addEventListener('drop', onDrop, false);
            dropZone.addEventListener('dragover', onDragOver, false);
        });
        [].forEach.call(items, function (col) {
            col.addEventListener('dragend', onDragEnd, false);
            col.addEventListener('drop', onDrop, false);
        });
        button.addEventListener('click', function () {
            var items = [];
            [].forEach.call(dropZones, function (dropZone) {
                items.push(dropZone.children.item(1).dataset.id);
            });
            var renderer = document.querySelector("#ABC");
            renderer.style.zIndex = 10;
            alert("Merging items: " + items[0] + " and " + items[1]);
        });
    };
    return Test;
}(AbstractPage_1.AbstractPage));
exports.Test = Test;
//# sourceMappingURL=Test.js.map