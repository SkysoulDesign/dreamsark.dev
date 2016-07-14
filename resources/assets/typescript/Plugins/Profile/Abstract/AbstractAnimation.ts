import {BootableInterface} from "../../../Interfaces/BootableInterface";

/**
 * Abstract Material
 */
export abstract class AbstractAnimation implements BootableInterface {

    public app;

    boot(app:any) {
        this.app = app
    };

    abstract loaded(material, textures);
    abstract material();
    abstract textures();

}
