import Object3D = THREE.Object3D;
import {Intro} from "../Intro";

export interface ObjectInstanceInterface {
    loaded: Boolean,
    instance: Object3D,
    constructor(app: Intro): void
}

export interface ObjectInterface {
    models?: {};
    materials?: {};
    animations?: {};
    constructor?(app: Intro): void;
    create(models, materials): Object3D;
    animate?(animations): Object3D;
    configAnimation?(actions): void;
}
