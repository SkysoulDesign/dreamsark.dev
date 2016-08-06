module DreamsArk.Elements {

    import For = DreamsArk.Helpers.For;
    import random = DreamsArk.Helpers.random;
    import Browser = DreamsArk.Modules.Browser;

    export class SecondaryLogo implements Loadable {

        public instance:THREE.Object3D;

        maps():{} {
            return {
                beam: 'intro/fxs/up-beam.png'
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

                        var currentRow = Math.abs(Math.floor(this.currentTile / this.tilesHorizontal) - (this.tilesHorizontal - 1));

                        texture.offset.y = currentRow / this.tilesVertical;

                    }
                };
            }

            var geometry = new THREE.PlaneGeometry(11 / 8, 128 / 3, 1),
                material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    side: THREE.DoubleSide,
                    alphaTest: 0.1,
                    blending: THREE.AdditiveBlending
                }),
                beam = data.beam = new THREE.Mesh(geometry.clone(), material);

            For(10, function (i) {

                var container = new THREE.Group(),
                    logo = DreamsArk.elementsBag.Logo.clone(),
                    vector = new THREE.Vector3(),
                    fx = beam.clone();

                vector.setX(random.between(-100, 100));
                vector.setY(random.between(0, 20));
                vector.setZ(random.between(-10, -199));

                logo.position.copy(vector);
                logo.position.y += 10;

                fx.position.copy(vector);

                container.add(logo);
                container.add(fx);

                //var scale = random.between(10, 50) * 0.01;
                //gro.scale.set(scale, scale, scale);

                group.add(container);

                data.velocity.push(
                    random.between(10, 50) * 0.01
                );

            });

            return group;

        }

    }

}
