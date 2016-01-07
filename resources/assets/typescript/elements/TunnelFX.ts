module DreamsArk.Elements {

    import deg2rad = DreamsArk.Helpers.deg2rad;

    export class TunnelFX implements Loadable {

        public instance:THREE.Object3D;

        create(maps, objs, data) {

            var video = document.createElement('video')

            video.addEventListener('ended', loop, false);
            function loop(e) {
                video.play();
            };

            video.src = "assets/elements/EtherealAura.webmhd.webm";
            video.load(); // must call after setting/changing source
            video.play();

            var videoImage = document.createElement('canvas');
            videoImage.width = 1024;
            videoImage.height = 1024;

            var videoImageContext = videoImage.getContext('2d');
            // background color if no video present
            videoImageContext.fillStyle = '#000000';
            videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

            var videoTexture = new THREE.Texture(videoImage);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;

            var movieMaterial = new THREE.MeshBasicMaterial({
                map: videoTexture,
                blending: THREE.AdditiveBlending,
                alphaTest: 0.5

            });

            var movieGeometry = new THREE.PlaneGeometry(500, 500, 5, 5);

            data.update = function () {
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    videoImageContext.drawImage(video, 0, 0);
                    if (videoTexture)
                        videoTexture.needsUpdate = true;
                }
            };

            var fx = new THREE.Mesh(movieGeometry, movieMaterial);

            fx.rotation.x = deg2rad(90);
            fx.position.y = 50

            return fx;

        }

    }

}