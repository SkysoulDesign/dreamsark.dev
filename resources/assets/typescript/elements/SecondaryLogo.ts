module DreamsArk.Elements {

    import For = DreamsArk.Helpers.For;
    import random = DreamsArk.Helpers.random;
    import Browser = DreamsArk.Modules.Browser;

    export class SecondaryLogo implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                beam: 'final/fxs/up-beam.png'
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

            var group = new THREE.Group(),
                texture = maps.beam;

            var clock = new THREE.Clock();

            data.animation = new TextureAnimator(maps.beam, 2, 4, 6, 60); // texture, #horiz, #vert, #total, duration.

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

            var geometry = new THREE.PlaneGeometry(11 / 8, 128 / 8, 1),
                material = new THREE.MeshBasicMaterial({map: texture, transparent: true});

            For(10, function (i) {

                var gro = new THREE.Group(),
                    logo = DreamsArk.elementsBag.Logo.clone(),
                    vector = new THREE.Vector3();
                vector.setX(random.between(-100, 100));
                vector.setY(random.between(0, 20));
                vector.setZ(random.between(-10, -199));

                logo.position.copy(vector);
                logo.position.y += 5;

                var fx = new THREE.Mesh(geometry.clone(), material);
                fx.position.copy(vector);

                gro.add(logo);
                gro.add(fx);

                var scale = random.between(10, 50) * 0.01;
                //gro.scale.set(scale, scale, scale);

                group.add(gro);

                data.velocity.push(
                    random.between(10, 50) * 0.01
                );

            });

            return group;

        }

    }

}