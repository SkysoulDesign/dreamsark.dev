module DreamsArk.Elements {

    import deg2rad = DreamsArk.Helpers.deg2rad;

    export class LogoFX implements Loadable {

        public instance:THREE.Object3D;

        maps() {
            return {
                fx: 'intro/elements/LogoFX.png'
            }
        }

        create(maps, objs, data) {

            var clock = new THREE.Clock();
            var delta = clock.getDelta();

            data.animation = new TextureAnimator(maps.fx, 12, 12, 144, 60); // texture, #horiz, #vert, #total, duration.

            function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
                // note: texture passed by reference, will be updated by the update function.

                this.tilesHorizontal = tilesHoriz;
                this.tilesVertical = tilesVert;
                // how many images does this spritesheet contain?
                //  usually equals tilesHoriz * tilesVert, but not necessarily,
                //  if there at blank tiles at the bottom of the spritesheet.
                this.numberOfTiles = numTiles;
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

                // how long should each image be displayed?
                this.tileDisplayDuration = tileDispDuration;

                // how long has the current image been displayed?
                this.currentDisplayTime = 0;

                // which image is currently being displayed?
                this.currentTile = 0;

                this.update = function () {

                    var delta = clock.getDelta();

                    this.currentDisplayTime += 1000 * delta;

                    while (this.currentDisplayTime > this.tileDisplayDuration) {
                        this.currentDisplayTime -= this.tileDisplayDuration;
                        this.currentTile++;
                        if (this.currentTile == this.numberOfTiles)
                            this.currentTile = 0;
                        var currentColumn = this.currentTile % this.tilesHorizontal;
                        texture.offset.x = currentColumn / this.tilesHorizontal;
                        var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
                        texture.offset.y = currentRow / this.tilesVertical;
                    }
                };
            }

            var material = new THREE.MeshBasicMaterial({
                map: maps.fx,
                blending: THREE.AdditiveBlending,
                //alphaTest: 0.1
            });
            var geometry = new THREE.PlaneGeometry(25, 25, 1, 1);
            return new THREE.Mesh(geometry, material);

        }

    }

}
