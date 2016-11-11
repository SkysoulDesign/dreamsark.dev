module DreamsArk.Elements {

    import For = DreamsArk.Helpers.For;
    import random = DreamsArk.Helpers.random;
    import Browser = DreamsArk.Modules.Browser;

    export class Ripple implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                beam: 'intro/fxs/ripple.png'
            }
        }

        data() {
            return {
                velocity: [],
                speed: 0
            }
        }

        create(maps, objs, data) {

            var browser = <Browser>module('Browser');

            var clock = new THREE.Clock();

            data.animation = new TextureAnimator(maps.beam, 4, 4, 16, 60); // texture, #horiz, #vert, #total, duration.

            function TextureAnimator(texture:THREE.Texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {

                this.tilesHorizontal = tilesHoriz;
                this.tilesVertical = tilesVert;
                this.numberOfTiles = numTiles;

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
                texture.offset.set(0 / this.tilesHorizontal, (tilesVert - 1) / this.tilesVertical);

                this.tileDisplayDuration = tileDispDuration;
                this.currentDisplayTime = 0;
                this.currentTile = 0;
                this.finished = false;

                this.update = function () {

                    if (this.finished) {
                        texture.repeat.set(0.01, 0.01)
                        return;
                    }

                    var delta = clock.getDelta();

                    this.currentDisplayTime += 1000 * delta;

                    while (this.currentDisplayTime > this.tileDisplayDuration) {

                        this.currentDisplayTime -= this.tileDisplayDuration;
                        this.currentTile++;

                        if (this.currentTile == this.numberOfTiles) {
                            this.currentTile = 0;
                            this.finished = true;
                        }

                        var currentColumn = this.currentTile % this.tilesHorizontal;

                        texture.offset.x = currentColumn / this.tilesHorizontal;

                        var currentRow = Math.abs(Math.floor(this.currentTile / this.tilesHorizontal) - (this.tilesHorizontal - 1));

                        texture.offset.y = currentRow / this.tilesVertical;

                    }
                };
            }

            var geometry = new THREE.PlaneGeometry(512 / 8, 128 / 8, 1),
                material = new THREE.MeshBasicMaterial({
                    map: maps.beam,
                    transparent: true,
                    side: THREE.DoubleSide,
                    alphaTest: 0.1,
                    blending: THREE.AdditiveBlending,
                    opacity: 0.5
                });

            var ripple = new THREE.Mesh(geometry, material);
            ripple.scale.set(0.6, 0.6, 0.6);

            return ripple;

        }

    }

}
