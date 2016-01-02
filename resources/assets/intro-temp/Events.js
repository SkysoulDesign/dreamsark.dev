module.exports = (function (e) {

    /**
     * Mouse Move
     */
    var mouse = new THREE.Vector2(-1000,-10000);

    return e.events = {
        mouse: mouse,
        add: function (event, callback, object) {
            (object || e.renderer.domElement).addEventListener(event, callback.bind(this, mouse), false);
        }

    }

})(Engine);