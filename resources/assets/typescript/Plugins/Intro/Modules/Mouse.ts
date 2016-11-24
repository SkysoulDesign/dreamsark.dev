import { BootableInterface } from "../../../Interfaces/BootableInterface";
import { ModulesInterface } from "../Interfaces/ModulesInterface";
import { Browser } from "../../Animation/Classes/Browser";
import { Raycaster } from "./Raycaster";

/**
 * Browser Class
 */
export class Mouse implements BootableInterface, ModulesInterface {

    public x: number;
    public y: number;
    public ratio = new THREE.Vector2();
    public normalized = new THREE.Vector2();
    public browser: Browser;
    public raycaster: Raycaster;
    public screen = new THREE.Vector2();
    public queue = [];

    constructor(app) {
        window.addEventListener('mousemove', this.move.bind(this), false);
        window.addEventListener('dblclick', this.click.bind(this), false);
    }

    public boot({browser, raycaster}) {
        this.browser = browser;
        this.raycaster = raycaster;
    }

    /**
     * On Screen Resize
     */
    private move(event: MouseEvent) {

        this.x = event.clientX;
        this.y = event.clientY;

        /**
         * Normalized
         * @type {number}
         */
        var x = ( event.clientX / this.browser.width ) * 2 - 1,
            y = -( event.clientY / this.browser.height ) * 2 + 1;

        this.normalized.set(x, y);

        this.ratio.x = event.clientX / this.browser.width;
        this.ratio.y = event.clientY / this.browser.height;

        /**
         * Screen
         */
        this.screen.set(
            event.clientX - this.browser.window.half.x, event.clientY - this.browser.window.half.y
        );

    }

    private click() {
        this.queue.push({
            normalized: this.normalized.clone()
        });
    }

    public ray(object: THREE.Object3D, callback: Function) {
        this.raycaster.push(object, callback)
    }

    public update(time: number, delta: number): void {

        while (this.queue.length) {
            this.raycaster.process(
                this.queue.shift()
            );
        }

    }

}
