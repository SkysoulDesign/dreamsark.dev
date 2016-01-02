module.exports = (function (e) {

    /**
     * Require Tween
     */
    require('GSAP');

    return e.tween = {
        l: function (target, duration, vars) {
            return new TweenLite(target, duration, vars);
        }

    }

})(Engine);