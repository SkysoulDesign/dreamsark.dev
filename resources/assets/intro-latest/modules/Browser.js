var DreamsArk;
(function (DreamsArk) {
    var Modules;
    (function (Modules) {
        var Browser = (function () {
            function Browser() {
                _super.call(this);
                this.instance = this;
                this.innerWidth = window.innerWidth;
                this.innerHeight = window.innerHeight;
                this.devicePixelRatio = window.devicePixelRatio;
            }
            Browser.prototype.configure = function () {
            };
            return Browser;
        })();
        Modules.Browser = Browser;
    })(Modules = DreamsArk.Modules || (DreamsArk.Modules = {}));
})(DreamsArk || (DreamsArk = {}));
//# sourceMappingURL=Browser.js.map