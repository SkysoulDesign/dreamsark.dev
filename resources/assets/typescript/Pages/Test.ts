import {AbstractPage} from "../Abstract/AbstractPage";

/**
 * Profile
 */
export class Test extends AbstractPage {

    public routes = [
        'user.inventory',
    ]
    animation
    setItems
    setMergedResult
    boot() {

        let dropZones = document.querySelectorAll("[dropable=true]"),
            items = document.querySelectorAll("[draggable=true]"),
            button = document.querySelector('#merger-button'),
            onDragOver = function handleDragOver(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                return false;
            },
            onDragEnd = function (e:DragEvent) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', this.innerHTML);
            },
            onDrop = function (e) {
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

            let items = [];

            [].forEach.call(dropZones, function (dropZone:HTMLElement) {

                items.push(
                    dropZone.children.item(1).dataset.id
                )

            });

            let renderer = <HTMLElement>document.querySelector("#ABC");

            renderer.style.zIndex = 10;

            alert(`Merging items: ${items[0]} and ${items[1]}`)

        })

    }

}
