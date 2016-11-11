var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var Mouse = (function () {
            function Mouse() {
                this.x = 0;
                this.y = 0;
                this.ratio = new THREE.Vector2(0, 0);
                this.normalized = new THREE.Vector2(0, 0);
                this.enabled = true;
            }
            Mouse.prototype.configure = function () {
                var callback = ;
                any: void {
                    /**
                     * if not enabled then destroy it
                     */
                    if: function () { } };
                !this.enabled;
                return this.destroy();
                var browser = module('Browser');
                this.x = event.clientX;
                this.y = event.clientY;
                /**
                 * Normalized
                 * @type {number}
                 */
                var x = (event.clientX / browser.innerWidth) * 2 - 1, y = -(event.clientY / browser.innerHeight) * 2 + 1;
                this.normalized.set(x, y);
                this.ratio.x = event.clientX / browser.innerWidth;
                this.ratio.y = event.clientY / browser.innerHeight;
            };
            ;
            Mouse.prototype.add = ;
            return Mouse;
        })();
        Modules.Mouse = Mouse;
        null, false;
        ;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
click(element, string, callback, context, any = this, useCapture, boolean = false);
void {
    Events: .add(element, 'click', callback, context, useCapture)
};
movePorra(element, string, callback, context, any = this, useCapture, boolean = false);
void {
    Events: .add(element, 'move', callback, context, useCapture)
};
var Event = (function () {
    function Event(id, event, domElement, callback, useCapture) {
        this.id = id;
        this.event = event;
        this.domElement = domElement;
        this.callback = callback;
        this.useCapture = useCapture;
    }
    return Event;
})();
var Events = (function () {
    function Events() {
        this.instance = this;
    }
    Events.add = function (element, event, callback, context, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        if (Helpers.is.Function(this[event]))
            this[event](element, callback, context, useCapture);
    };
    Events.click = function (element, callback, context, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        var domElement = Helpers.query(element), event = 'click', id = Helpers.random.id();
        //callback.bind(context);
        var caller = function (e) {
            if (callback())
                Events.remove(id);
        };
        domElement.addEventListener(event, caller, useCapture);
        /**
         * Store on collection for removal later
         */
        this.collection.push(new Event(id, event, domElement, caller, useCapture));
    };
    Events.remove = function (id) {
        var element = Helpers.where.id(this.collection, id);
        element.domElement.removeEventListener(element.event, element.callback, element.useCapture);
        /**
         * Remove From Collection
         */
        Helpers.removeById(this.collection, id);
    };
    Events.collection = [];
    return Events;
})();
exports.Events = Events;
//# sourceMappingURL=Mouse.js.map