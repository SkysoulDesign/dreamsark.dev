import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {ModulesInterface} from "../Interfaces/ModulesInterface";

/**
 * Browser Class
 */
export class Browser implements BootableInterface, ModulesInterface {

    private camera;
    private renderer;
    private canvas;
    public width = window.innerWidth;
    public height = window.innerHeight;
    public aspect = this.width / this.height;
    public pixelRatio = window.devicePixelRatio;

    constructor(app) {
        window.addEventListener('resize', this.resize.bind(this), false);
    }

    public boot({camera, renderer, canvas}) {

        this.camera = camera;
        this.renderer = renderer;
        this.canvas = canvas;

        this.width = canvas.offsetWidth;
        this.height = canvas.offsetHeight

        this.resize();

    }

    public window = {
        half: {
            x: this.width / 2,
            y: this.height / 2,
        }
    }

    /**
     * Set Half of the Screen
     * @param x
     * @param y
     */
    private updateHalf(x: number = (this.width / 2), y: number = (this.height / 2)) {
        this.window.half.x = x;
        this.window.half.y = y;
    }

    /**
     * On Screen Resize
     */
    private resize() {

        this.updateHalf();

        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;

        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);

    }

    update(time: number, delta: number): void {
    }

}
