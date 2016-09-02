export class Iterator {

    private components = [];
    private pointer = 0;

    constructor(...components: any[]) {

        components.forEach(component => {

            for (let key in component) {
                this.components.push({
                    key: key,
                    value: component[key]
                })
            }

        })

        console.log(this.components)

    }

    public next(): IteratorResult<Component> {

        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            }
        } else {
            return {
                done: true
            }
        }

    }

    [Symbol.iterator](): IterableIterator<Component> {
        return this;
    }

}
