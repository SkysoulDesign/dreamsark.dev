module DreamsArk.Modules {

    import random = DreamsArk.Helpers.random;
    import is = DreamsArk.Helpers.is;
    import query = DreamsArk.Helpers.query;
    import where = DreamsArk.Helpers.where;
    import removeById = DreamsArk.Helpers.removeById;
    import each = DreamsArk.Helpers.each;
    import timeout = DreamsArk.Helpers.timeout;

    /**
     * Track every interaction with mouse
     */
    export class Mouse implements Initializable {

        //public instance:this = this;
        public x:number;
        public y:number;
        public ratio:THREE.Vector2;
        public normalized:THREE.Vector2;
        public screen:THREE.Vector2;
        public enabled:boolean = true;
        public clicked:boolean = false;

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

            var clickCallback = function (event):void {
                this.clicked = true;
            };

            /**
             * Manually Create Mouse Movement
             */
            Events.add('window', 'click', clickCallback, this, false);

            /**
             * Start Raycaster
             */
            var checker = <Checker>module('Checker');

            checker.add(function () {
                Events.update();
                return false;
            })

        }

        public click(element:string|THREE.Object3D, callback, context:any = this, useCapture:boolean = false):void {
            Events.add(element, 'click', callback, context, useCapture)
        }

        public move(element:string, callback, context:any = this, useCapture:boolean = false):void {
            Events.add(element, 'mousemove', callback, context, useCapture)
        }

    }

    /**
     * Responsible to handle events
     */
    class Event {

        constructor(public id:string, public event:string, public domElement:any, public callback:Function, public useCapture:boolean) {

        }

    }

    /**
     * Handle Interactions within mouse and 3D objects on the scene
     */
    class Raycaster {

        constructor(public id:string, public event:string, public element:THREE.Object3D, public callback:Function) {

        }

    }

    /**
     * Append events to a collection where get checked on every update
     */
    export class Events implements Initializable {

        public instance:any = this;
        public static collection:any[] = [];

        public static add(element:string|THREE.Object3D, event:string, callback:(event:any) => void, context:any = DreamsArk, useCapture:boolean = false):void {
            this.assign(event, element, callback, context, useCapture)
        }

        protected static assign(event:string, element:string|THREE.Object3D, callback:(event:any) => void, context:any = DreamsArk, useCapture:boolean = false):void {

            /**
             * if Element is an three obj then start raycaster instead
             */
            if (element instanceof THREE.Object3D) {

                this.collection.push(
                    new Raycaster(random.id(), event, element, callback)
                );

                return;
            }

            var domElement = (element === 'window') ? window : query(<string>element),
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

        public static update() {

            var raycaster = module('Raycaster'),
                mouse = module('Mouse'),
                camera = module('Camera');

            raycaster.setFromCamera(mouse.normalized, camera);

            each(this.collection, function (element) {

                if (element instanceof Raycaster) {

                    /**
                     * Only Dispatches if it's an click event
                     */
                    if (element.event === 'click' && mouse.clicked === true) {

                        var intersects = raycaster.intersectObject(element.element);

                        if (intersects.length > 0)
                            element.callback()

                    }

                }

            });

            /**
             * Set mouse Clicked As False on every update but open doors to processing before it's set
             */
            mouse.clicked = false;

        }

    }
}