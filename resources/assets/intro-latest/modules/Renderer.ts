module DreamsArk.Modules {

    /**
     * Creates an instance of THREE.js Renderer
     */
    export class Renderer implements Initializable {

        public instance:THREE.WebGLRenderer;

        constructor() {
            this.instance = new THREE.WebGLRenderer({
                alpha: true
            });
        }

        configure():void {

            var domElement = this.instance.domElement;

            domElement.style.position = 'absolute';
            domElement.style.zIndex = '2';

            Helpers.appendTo('#container', domElement);

            /**
             * Get Global Browser settings
             */
            var browser = module('Browser');

            //this.setClearColor(scene.a.fog.color);
            this.instance.setPixelRatio(browser.devicePixelRatio);
            this.instance.setSize(browser.innerWidth, browser.innerHeight);

        }

    }

}