module.exports = (function (e) {

    /**
     * Append Browser to Engine
     */
    return e.browser = {

        browser: null,

        width: null,
        height: null,
        innerWidth: null,
        innerHeight: null,

        devicePixelRatio: 1,

        init: function () {

            this.browser = this;

            this.width  = window.width;
            this.height = window.height;

            this.innerWidth       = window.innerWidth;
            this.innerHeight      = window.innerHeight;
            this.devicePixelRatio = window.devicePixelRatio;

        }

    }

})(Engine);