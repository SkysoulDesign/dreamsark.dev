var DreamsArk;
(function (DreamsArk) {
    var Compositions;
    (function (Compositions) {
        var each = DreamsArk.Helpers.each;
        var random = DreamsArk.Helpers.random;
        /**
         * Landing Page Composition
         */
        var Landing = (function () {
            function Landing() {
            }
            Landing.prototype.elements = function () {
                return ['Logo', 'EnterPage', 'SecondaryLogo', 'ChaosParticles'];
            };
            Landing.prototype.setup = function (scene, camera, elements) {
                var logo = elements.Logo, enterPage = elements.EnterPage, secondaryLogo = elements.SecondaryLogo, ChaosParticles = elements.ChaosParticles;
                enterPage.userData.start = function () {
                    new Composition('Loading');
                };
                scene.add(logo, enterPage, secondaryLogo, ChaosParticles);
                camera.position.z = 30;
            };
            Landing.prototype.update = function (scene, camera, elements, elapsed) {
                var logo = elements.Logo, enterPage = elements.EnterPage, secondaryLogo = elements.SecondaryLogo, ChaosParticles = elements.ChaosParticles;
                enterPage.userData.parallex(logo);
                secondaryLogo.userData.animation.update(elapsed);
                ChaosParticles.userData.update();
                each(secondaryLogo.children, function (element, i) {
                    if (element.position.y >= 160)
                        element.position.set(random.between(-200, 200), -160, 0);
                    element.position.y += secondaryLogo.userData.velocity[i];
                });
            };
            return Landing;
        }());
        Compositions.Landing = Landing;
    })(Compositions = DreamsArk.Compositions || (DreamsArk.Compositions = {}));
})(DreamsArk || (DreamsArk = {}));
