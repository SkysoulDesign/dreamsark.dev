import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {App} from "../../../App";
import {Intro} from "../Intro";
import {Scene} from "../Modules/Scene";
import {Camera} from "../Modules/Camera";
import {Renderer} from "../Modules/Renderer";

/**
 * Composition
 */
export abstract class Composition implements BootableInterface {

    public app: Intro;
    public scene: Scene;
    public camera: Camera;
    public renderer: Renderer;

    /**
     * This Method is no need to be implemented
     * but it can be override if needed
     * @param app
     */
    public boot(app: Intro) {
        this.app = app;
        this.scene = app.scene;
        this.camera = app.camera;
        this.renderer = app.renderer;
    };

    /**
     * List of objects to be loaded
     * @returns {Array}
     */
    abstract get objects(): string[];

    /**
     * First method to be called, it like the constructor for this class
     * it receives data sent from the view as the payload
     *
     * @param app
     * @param payload
     */
    abstract setup(app: App, ...payload: any[]);

    /**
     * Its called after all objects are resolved
     *
     * @param objects
     */
    abstract stage(objects);

    abstract update(objects: {}, time: number, delta: number)

}
