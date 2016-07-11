import {Components} from "../Abstract/Components";

export class Browser extends Components {

    private camera;
    private renderer;
    private canvas;
    public width = window.innerWidth;
    public height = window.innerHeight;
    public aspect = this.width / this.height;
    public pixelRatio = window.devicePixelRatio;

    constructor() {
        super();
        window.addEventListener('resize', this.resize.bind(this), false);
    }

    public boot(app) {

        this.camera = app.camera;
        this.renderer = app.renderer;
        this.canvas = app.canvas;

        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight

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
    private updateHalf(x:number = (this.width / 2), y:number = (this.height / 2)) {
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
        this.renderer.setSize(this.width , this.height);

    }

}
