/// <reference path="interfaces/Initializable.ts" />
/// <reference path="interfaces/Tweenable.ts" />
/// <reference path="interfaces/Loadable.ts" />
/// <reference path="interfaces/Composable.ts" />
/// <reference path="interfaces/Configurable.ts" />
/// <reference path="typings/three.d.ts" />
/// <reference path="typings/parallax.d.ts" />
/// <reference path="typings/three.OBJLoader.d.ts" />
/// <reference path="Helpers.ts" />

/// <reference path="elements/EnterPage.ts" />
/// <reference path="elements/ChaosParticles.ts" />
/// <reference path="elements/Ripple.ts" />
/// <reference path="elements/Tunnel.ts" />
/// <reference path="elements/Skybox.ts" />
/// <reference path="elements/Plexus.ts" />
/// <reference path="elements/Particles.ts" />
/// <reference path="elements/HexParticles.ts" />
/// <reference path="elements/Background.ts" />
/// <reference path="elements/Logo.ts" />
/// <reference path="elements/TunnelFX.ts" />
/// <reference path="elements/LogoFX.ts" />
/// <reference path="elements/Ren.ts" />
/// <reference path="elements/Asteroid.ts" />
/// <reference path="elements/Galaxy.ts" />
/// <reference path="elements/Overlay1.ts" />
/// <reference path="elements/Overlay2.ts" />
/// <reference path="elements/Cube.ts" />
/// <reference path="elements/SecondaryLogo.ts" />

/// <reference path="modules/Browser.ts" />
/// <reference path="modules/Raycaster.ts" />
/// <reference path="modules/Checker.ts" />
/// <reference path="modules/Animator.ts" />
/// <reference path="modules/Loader.ts" />
/// <reference path="modules/Mouse.ts" />
/// <reference path="modules/Camera.ts" />
/// <reference path="modules/Scene.ts" />
/// <reference path="modules/Renderer.ts" />

/// <reference path="compositions/Landing.ts" />
/// <reference path="compositions/Loading.ts" />
/// <reference path="compositions/Universe.ts" />

module DreamsArk {

    import is = DreamsArk.Helpers.is;
    import query = DreamsArk.Helpers.query;
    import init = DreamsArk.Helpers.init;
    import Mouse = DreamsArk.Modules.Mouse;
    import Loader = DreamsArk.Modules.Loader;
    import Renderer = THREE.Renderer;
    import Scene = THREE.Scene;
    import Camera = THREE.PerspectiveCamera;
    import Checker = DreamsArk.Modules.Checker;

    /**
     * Debug Mode
     */
    export var debug: boolean = false;

    /**
     * Stores all elements that has been loaded on the application
     */
    export var elementsBag: any = {};

    /**
     * Stores some trivial variables to be checked on render loop
     */
    export var core: any = {

        /**
         * List of active objects
         * @todo inset components such as Camera, Scene, Renderer
         */
        active: {

            /**
             * Active Composition
             */
            composition: null
        }
    };

    /**
     * Defines the main application CORE
     */
    export class App {

        /**
         * Initialize the main APP
         */
        constructor() {

            var mouse = <Mouse>module('Mouse');

            /**
             * start Loading the basic scene
             */
            load();

            mouse.click('#start', function () {

                start();

                return true;

            });

            mouse.click('.skipper', function () {

                query('form').submit();

                return true;

            });

            mouse.click('#skip', function () {

                query('form').submit();

                return true;

            });

            mouse.click('.reseter', function () {

                location.reload();

                return true;

            });

        }

    }

    /**
     * Start the Application
     */
    export var start = function () {

        /**
         * Remove logo
         */
            //query('.container-fluid').classList.add('--fade-to-black');
            //query('.enter-page').classList.add('--exit');

        var composition = new Composition('Loading');

        render();

    };

    /**
     * Start the Application
     */
    export var load = function () {

        /**
         * Parallax
         */
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene, {
            limitX: 30
        });

        new Composition('Landing');

        render();

    };

    /**
     * Render Loop Logic
     * @param elapsedTime Time elapsed since the last call
     */
    export var render = function (elapsedTime?: number) {

        requestAnimationFrame(render);

        var renderer = <Renderer>module('Renderer'),
            scene = <Scene>module('Scene'),
            camera = <Camera>module('Camera'),
            checker = <Checker>module('Checker');

        if (!is.Null(core.active.composition))
            if (core.active.composition.update)
                core.active.composition.update(scene, camera, core.active.composition.elementsBag, elapsedTime)

        checker.update();

        renderer.render(scene, camera);

    };

    /**
     * Get Initializable and initialize it if is not initialized before
     * @param module - a module to be initialized
     * @returns {*}
     */
    export var module = function (module) {

        /**
         * Return Null if doesn't exist
         */
        if (is.Null(Modules[module]))
            return console.log('module ' + module + ' couldn\'t be found');

        /**
         * if Module is not initialized then init it
         */
        if (is.Null(Modules[module].instance))
            init([Modules[module]]);

        return <any>Modules[module].instance;

    };

    /**
     * Get an element by it's name
     * @param name - name of the element to be retrieven
     * @returns {*}
     */
    export var element = function (name) {

        if (is.Null(elementsBag[name])) {

            console.log('Element ' + name + ' doesn\'t exist or it wasn\'t loaded.');
            return;

        }

        return elementsBag[name];

    };

    /**
     * An Element composed of several components to compose a Scene
     */
    export class Composition {

        /**
         * Initiate the process of starting a new composition
         * @param name - Composition name to be started
         */
        constructor(public name: string) {

            if (is.Null(Compositions[name])) {
                console.log('Composition: ' + name + ' not found.');
                return;
            }

            var loader = new Loader,
                scene = module('Scene'),
                camera = module('Camera'),
                composition = new Compositions[name],
                ready = function (elements) {
                    composition.setup(scene, camera, elements);
                    /**  should merge the elements here */
                    composition.elementsBag = elements;
                    core.active.composition = composition;
                };

            if (!is.Null(composition.elements))
                loader.Load(composition.elements(), ready);

        }

    }

}

/**
 * Start App
 */
new DreamsArk.App();

//document.querySelector('body').style.backgroundColor: #000;
