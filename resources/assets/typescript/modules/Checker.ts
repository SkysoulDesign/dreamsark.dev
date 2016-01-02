module DreamsArk.Modules {

    import length = DreamsArk.Helpers.length;
    import each = DreamsArk.Helpers.each;
    import reverse = DreamsArk.Helpers.reverse;

    export class Checker implements Initializable {

        public collection:any[] = [];

        add(callback:(elapsed_time?:number, time?:number) => boolean, context:any = DreamsArk):void {

            this.collection.push({callback: callback.bind(context), time: +new Date()})

        }

        update():void {

            if (length(this.collection) > 0) {

                var removeBag = [];

                each(this.collection, function (el, index) {
                    if (el.callback((+new Date()) - el.time, el.time))
                        removeBag.push(index);

                });

                if (length(this.collection) > 0)
                    this.remove(removeBag);

            }

        }

        remove(items:number[]):void {

            each(reverse(items), function (item) {
                this.collection.splice(item, 1);
            }, this);
        }

    }

}