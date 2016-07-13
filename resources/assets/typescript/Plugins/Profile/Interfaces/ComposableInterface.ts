import {BootableInterface} from "../../../Interfaces/BootableInterface";
import {Scene} from "../Classes/Scene";
import {Camera} from "../Classes/Camera";

export interface ComposableInterface extends BootableInterface {
    characters():string[]|Boolean;
    stage(scene:Scene, camera:Camera, characters:any);
}
