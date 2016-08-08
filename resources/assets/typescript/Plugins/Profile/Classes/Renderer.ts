import {BootableInterface} from "../../../Interfaces/BootableInterface";

/**
 * Class Renderer
 */
export class Renderer extends THREE.WebGLRenderer implements BootableInterface {

    private scene;
    private camera;
    private browser;

    public boot(app) {

        this.scene = app.scene;
        this.camera = app.camera;
        this.browser = app.browser;

        this.setSize(
            app.canvas.offsetWidth, app.canvas.offsetHeight
        );

        this.setPixelRatio(
            this.browser.pixelRatio
        );
        
    }

    constructor(app) {

        super({
            antialias: true,
            alpha: false,
        })

        app.canvas.appendChild(
            this.domElement
        );

    }

    update(time, delta) {
        this.render(
            this.scene, this.camera
        );
    }

}
