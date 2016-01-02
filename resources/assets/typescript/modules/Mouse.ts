module DreamsArk.Modules {

    import random = DreamsArk.Helpers.random;
    import is = DreamsArk.Helpers.is;
    import query = DreamsArk.Helpers.query;
    import where = DreamsArk.Helpers.where;
    import removeById = DreamsArk.Helpers.removeById;

    export class Mouse implements Initializable {

        //public instance:this = this;
        public x:number;
        public y:number;
        public ratio:THREE.Vector2;
        public normalized:THREE.Vector2;
        public screen:THREE.Vector2;
        public enabled:boolean = true;

        constructor() {

            this.x = 0;
            this.y = 0;
            this.ratio = new THREE.Vector2(0, 0);

            this.normalized = new THREE.Vector2(0, 0);
            this.screen = new THREE.Vector2(0, 0);

            this.enabled = true;

        }

        configure() {

            var callback = function (event):void {

                /**
                 * if not enabled then destroy it
                 */
                if (!this.enabled)
                    return this.destroy();

                var browser = <Browser>module('Browser');

                this.x = event.clientX;
                this.y = event.clientY;

                /**
                 * Normalized
                 * @type {number}
                 */
                var x = ( event.clientX / browser.innerWidth ) * 2 - 1,
                    y = -( event.clientY / browser.innerHeight ) * 2 + 1;

                this.normalized.set(x, y);

                this.ratio.x = event.clientX / browser.innerWidth;
                this.ratio.y = event.clientY / browser.innerHeight;

                /**
                 * Screen
                 */
                this.screen.set(event.clientX - browser.innerWidth / 2, event.clientY - browser.innerHeight / 2);

            };

            /**
             * Manually Create Mouse Movement
             */
            Events.add('window', 'mousemove', callback, this, false);

        }

        public click(element:string, callback, context:any = this, useCapture:boolean = false):void {
            Events.add(element, 'click', callback, context, useCapture)
        }

        public move(element:string, callback, context:any = this, useCapture:boolean = false):void {
            Events.add(element, 'mousemove', callback, context, useCapture)
        }

    }

    class Event {

        constructor(public id:string, public event:string, public domElement:any, public callback:Function, public useCapture:boolean) {

        }

    }

    export class Events implements Initializable {

        public instance:this = this;
        public static collection:any[] = [];

        public static add(element:string, event:string, callback:(event:any) => void, context:any = DreamsArk, useCapture:boolean = false):void {
            this.assign(event, element, callback, context, useCapture)
        }

        protected static assign(event:string, element:string, callback:(event:any) => void, context:any = DreamsArk, useCapture:boolean = false):void {

            var domElement = (element === 'window') ? window : query(element),
                id = random.id();

            var caller:any = function (e) {
                if (callback.call(context, e))
                    Events.remove(id);
            };

            domElement.addEventListener(event, caller, false);

            /**
             * Store on collection for removal later
             */
            this.collection.push(
                new Event(id, event, domElement, caller, useCapture)
            );

        }

        protected static remove(id:string) {

            var element = where.id(this.collection, id);

            element.domElement.removeEventListener(element.event, element.callback, element.useCapture)

            /**
             * Remove From Collection
             */
            removeById(this.collection, id);

        }

    }
}