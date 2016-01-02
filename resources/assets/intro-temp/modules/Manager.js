module.exports = function (e) {

    /**
     * Append Renderer to Engine
     * @type {THREE.LoadingManager}
     */
    var manager = new THREE.LoadingManager();

    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    manager.onComplete = function (item, loaded, total) {
        e.loading = false;
        console.log('completou');
    };

    return e.manager = manager;

};