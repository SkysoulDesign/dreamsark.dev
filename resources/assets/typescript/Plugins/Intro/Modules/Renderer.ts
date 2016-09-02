import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {ModulesInterface} from "../Interfaces/ModulesInterface";

/**
 * Class Renderer
 */
export class Renderer extends THREE.WebGLRenderer implements BootableInterface, ModulesInterface {

    private scene;
    private camera;
    private browser;

    constructor({canvas}) {

        super({
            antialias: true,
            alpha: true,
        })

        canvas.appendChild(
            this.domElement
        );

    }

    public boot({scene, camera, browser, canvas}) {

        this.scene = scene;
        this.camera = camera;
        this.browser = browser;

        this.setSize(
            canvas.offsetWidth, canvas.offsetHeight
        );

        this.setPixelRatio(
            this.browser.pixelRatio
        );
    }

    update(time: number, delta: number) {
        this.render(
            this.scene, this.camera
        );
    }

}
